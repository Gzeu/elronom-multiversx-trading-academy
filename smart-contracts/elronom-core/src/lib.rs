#![no_std]

use multiversx_sc::imports::*;

/// Educational NFT structure for MiCA compliant utility tokens
#[derive(TopEncode, TopDecode, NestedEncode, NestedDecode, PartialEq, Debug, Clone)]
pub struct EducationalNFT {
    pub course_id: u64,
    pub completion_date: u64,
    pub skill_level: u8, // 1-5 scale
    pub issuing_authority: ManagedBuffer,
    pub verification_hash: ManagedBuffer,
    pub nft_type: EducationalNFTType,
}

#[derive(TopEncode, TopDecode, NestedEncode, NestedDecode, PartialEq, Debug, Clone)]
pub enum EducationalNFTType {
    Certificate,  // Learning certificates
    Achievement, // Achievement badges
    Quest,       // Quest completion tokens
}

/// Quest structure for gamified learning
#[derive(TopEncode, TopDecode, NestedEncode, NestedDecode, PartialEq, Debug, Clone)]
pub struct Quest {
    pub quest_id: u64,
    pub quest_type: QuestType,
    pub difficulty: u8, // 1-5 scale
    pub xp_reward: u32,
    pub egld_reward: BigUint,
    pub completion_criteria: ManagedBuffer,
    pub is_active: bool,
}

#[derive(TopEncode, TopDecode, NestedEncode, NestedDecode, PartialEq, Debug, Clone)]
pub enum QuestType {
    Daily,
    Weekly,
    Epic,
}

/// User progress tracking
#[derive(TopEncode, TopDecode, NestedEncode, NestedDecode, PartialEq, Debug, Clone)]
pub struct UserProgress {
    pub total_xp: u32,
    pub level: u8,
    pub completed_quests: u32,
    pub streak_days: u16,
    pub badges_earned: u16,
    pub prediction_accuracy: u8, // Percentage 0-100
    pub last_activity: u64,
}

#[multiversx_sc::contract]
pub trait ElronomContract {
    /// Initialize contract with basic parameters
    #[init]
    fn init(&self) {
        self.quest_counter().set(1u64);
        self.nft_counter().set(1u64);
        self.contract_paused().set(false);
    }

    /// Upgrade function for future contract updates
    #[upgrade]
    fn upgrade(&self) {}

    // ============ QUEST MANAGEMENT ============

    /// Create a new quest (only contract owner)
    #[only_owner]
    #[endpoint]
    fn create_quest(
        &self,
        quest_type: QuestType,
        difficulty: u8,
        xp_reward: u32,
        egld_reward: BigUint,
        completion_criteria: ManagedBuffer,
    ) {
        require!(!self.contract_paused().get(), "Contract is paused");
        require!(difficulty >= 1 && difficulty <= 5, "Difficulty must be 1-5");
        require!(xp_reward > 0, "XP reward must be positive");

        let quest_id = self.quest_counter().get();
        let quest = Quest {
            quest_id,
            quest_type,
            difficulty,
            xp_reward,
            egld_reward,
            completion_criteria,
            is_active: true,
        };

        self.quests(&quest_id).set(&quest);
        self.quest_counter().set(quest_id + 1);

        self.quest_created_event(&quest_id, &quest_type, &difficulty, &xp_reward);
    }

    /// Complete a quest and reward user
    #[endpoint]
    fn complete_quest(&self, quest_id: u64, accuracy_score: u8) {
        require!(!self.contract_paused().get(), "Contract is paused");
        require!(accuracy_score <= 100, "Accuracy score cannot exceed 100");
        
        let caller = self.blockchain().get_caller();
        let quest = self.quests(&quest_id).get();
        
        require!(quest.is_active, "Quest is not active");
        require!(!self.user_quest_completed(&caller, &quest_id).get(), "Quest already completed");

        // Mark quest as completed
        self.user_quest_completed(&caller, &quest_id).set(true);

        // Update user progress
        let mut progress = self.get_or_create_user_progress(&caller);
        progress.total_xp += quest.xp_reward;
        progress.completed_quests += 1;
        
        // Update accuracy if it's a prediction quest
        if accuracy_score > 0 {
            progress.prediction_accuracy = (progress.prediction_accuracy + accuracy_score) / 2;
        }

        // Level up calculation
        let new_level = self.calculate_level(progress.total_xp);
        if new_level > progress.level {
            progress.level = new_level;
            self.level_up_event(&caller, &new_level);
        }

        progress.last_activity = self.blockchain().get_block_timestamp();
        self.user_progress(&caller).set(&progress);

        // Send EGLD reward if quest has one
        if quest.egld_reward > 0 {
            self.send().direct_egld(&caller, &quest.egld_reward);
        }

        self.quest_completed_event(&caller, &quest_id, &quest.xp_reward, &accuracy_score);
    }

    // ============ EDUCATIONAL NFT MANAGEMENT ============

    /// Mint educational NFT for course completion (MiCA exempt utility)
    #[endpoint]
    fn mint_educational_badge(
        &self,
        user_address: &ManagedAddress,
        course_id: u64,
        skill_level: u8,
        nft_type: EducationalNFTType,
    ) {
        require!(!self.contract_paused().get(), "Contract is paused");
        require!(skill_level >= 1 && skill_level <= 5, "Skill level must be 1-5");
        
        let caller = self.blockchain().get_caller();
        require!(
            self.is_authorized_educator(&caller),
            "Only authorized educators can mint badges"
        );

        let nft_id = self.nft_counter().get();
        let current_timestamp = self.blockchain().get_block_timestamp();
        
        let educational_nft = EducationalNFT {
            course_id,
            completion_date: current_timestamp,
            skill_level,
            issuing_authority: ManagedBuffer::from(b"ELRONOM Academy"),
            verification_hash: self.generate_verification_hash(user_address, &course_id, &current_timestamp),
            nft_type: nft_type.clone(),
        };

        // Store NFT data
        self.educational_nfts(&nft_id).set(&educational_nft);
        self.user_nfts(user_address).update(|nfts| nfts.push(nft_id));
        self.nft_counter().set(nft_id + 1);

        // Update user progress badges count
        self.user_progress(user_address).update(|progress| {
            progress.badges_earned += 1;
        });

        self.nft_minted_event(user_address, &nft_id, &course_id, &nft_type);
    }

    /// Verify educational achievement authenticity
    #[view]
    fn verify_educational_achievement(&self, nft_id: u64) -> bool {
        if !self.educational_nfts(&nft_id).is_empty() {
            let nft = self.educational_nfts(&nft_id).get();
            // Additional verification logic can be added here
            return !nft.verification_hash.is_empty();
        }
        false
    }

    // ============ LEADERBOARD MANAGEMENT ============

    /// Update user leaderboard position
    #[endpoint]
    fn update_leaderboard(&self, user_id: u64, new_score: u32) {
        require!(!self.contract_paused().get(), "Contract is paused");
        
        let caller = self.blockchain().get_caller();
        require!(
            self.is_authorized_educator(&caller),
            "Only authorized educators can update leaderboard"
        );

        self.leaderboard_scores(&user_id).set(&new_score);
        self.leaderboard_updated_event(&user_id, &new_score);
    }

    // ============ UTILITY FUNCTIONS ============

    /// Calculate user level based on XP
    fn calculate_level(&self, total_xp: u32) -> u8 {
        // Level formula: level = floor(sqrt(xp / 100))
        let level_float = ((total_xp / 100) as f64).sqrt();
        core::cmp::min(level_float as u8, 100) // Cap at level 100
    }

    /// Generate verification hash for NFT authenticity
    fn generate_verification_hash(
        &self,
        user_address: &ManagedAddress,
        course_id: &u64,
        timestamp: &u64,
    ) -> ManagedBuffer {
        let mut hash_data = ManagedBuffer::new();
        hash_data.append(user_address.as_managed_buffer());
        hash_data.append(&course_id.to_be_bytes()[..]);
        hash_data.append(&timestamp.to_be_bytes()[..]);
        
        // Simple hash for demonstration - in production use proper cryptographic hash
        let hash = self.crypto().keccak256(&hash_data);
        ManagedBuffer::from(hash.as_managed_buffer())
    }

    /// Get or create user progress
    fn get_or_create_user_progress(&self, user: &ManagedAddress) -> UserProgress {
        if self.user_progress(user).is_empty() {
            UserProgress {
                total_xp: 0,
                level: 1,
                completed_quests: 0,
                streak_days: 0,
                badges_earned: 0,
                prediction_accuracy: 0,
                last_activity: self.blockchain().get_block_timestamp(),
            }
        } else {
            self.user_progress(user).get()
        }
    }

    // ============ VIEW FUNCTIONS ============

    #[view(getQuestDetails)]
    fn get_quest_details(&self, quest_id: u64) -> Quest {
        self.quests(&quest_id).get()
    }

    #[view(getUserProgress)]
    fn get_user_progress(&self, user: &ManagedAddress) -> UserProgress {
        self.get_or_create_user_progress(user)
    }

    #[view(getUserNFTs)]
    fn get_user_nfts(&self, user: &ManagedAddress) -> MultiValueEncoded<u64> {
        self.user_nfts(user).get().into()
    }

    #[view(getNFTDetails)]
    fn get_nft_details(&self, nft_id: u64) -> EducationalNFT {
        self.educational_nfts(&nft_id).get()
    }

    // ============ ADMIN FUNCTIONS ============

    #[only_owner]
    #[endpoint]
    fn pause_contract(&self) {
        self.contract_paused().set(true);
    }

    #[only_owner]
    #[endpoint]
    fn unpause_contract(&self) {
        self.contract_paused().set(false);
    }

    #[only_owner]
    #[endpoint]
    fn add_authorized_educator(&self, educator: ManagedAddress) {
        self.authorized_educators(&educator).set(true);
    }

    #[only_owner]
    #[endpoint]
    fn remove_authorized_educator(&self, educator: ManagedAddress) {
        self.authorized_educators(&educator).clear();
    }

    #[view]
    fn is_authorized_educator(&self, educator: &ManagedAddress) -> bool {
        self.authorized_educators(educator).get()
    }

    // ============ EVENTS ============

    #[event("questCreated")]
    fn quest_created_event(
        &self,
        #[indexed] quest_id: &u64,
        #[indexed] quest_type: &QuestType,
        #[indexed] difficulty: &u8,
        xp_reward: &u32,
    );

    #[event("questCompleted")]
    fn quest_completed_event(
        &self,
        #[indexed] user: &ManagedAddress,
        #[indexed] quest_id: &u64,
        xp_earned: &u32,
        accuracy_score: &u8,
    );

    #[event("levelUp")]
    fn level_up_event(
        &self,
        #[indexed] user: &ManagedAddress,
        #[indexed] new_level: &u8,
    );

    #[event("nftMinted")]
    fn nft_minted_event(
        &self,
        #[indexed] user: &ManagedAddress,
        #[indexed] nft_id: &u64,
        #[indexed] course_id: &u64,
        nft_type: &EducationalNFTType,
    );

    #[event("leaderboardUpdated")]
    fn leaderboard_updated_event(
        &self,
        #[indexed] user_id: &u64,
        #[indexed] new_score: &u32,
    );

    // ============ STORAGE ============

    // Quest storage
    #[storage_mapper("quests")]
    fn quests(&self, quest_id: &u64) -> SingleValueMapper<Quest>;

    #[storage_mapper("questCounter")]
    fn quest_counter(&self) -> SingleValueMapper<u64>;

    #[storage_mapper("userQuestCompleted")]
    fn user_quest_completed(
        &self,
        user: &ManagedAddress,
        quest_id: &u64,
    ) -> SingleValueMapper<bool>;

    // User progress storage
    #[storage_mapper("userProgress")]
    fn user_progress(&self, user: &ManagedAddress) -> SingleValueMapper<UserProgress>;

    // Educational NFT storage
    #[storage_mapper("educationalNFTs")]
    fn educational_nfts(&self, nft_id: &u64) -> SingleValueMapper<EducationalNFT>;

    #[storage_mapper("userNFTs")]
    fn user_nfts(&self, user: &ManagedAddress) -> SingleValueMapper<ManagedVec<u64>>;

    #[storage_mapper("nftCounter")]
    fn nft_counter(&self) -> SingleValueMapper<u64>;

    // Leaderboard storage
    #[storage_mapper("leaderboardScores")]
    fn leaderboard_scores(&self, user_id: &u64) -> SingleValueMapper<u32>;

    // Authorization storage
    #[storage_mapper("authorizedEducators")]
    fn authorized_educators(&self, educator: &ManagedAddress) -> SingleValueMapper<bool>;

    // Contract state
    #[storage_mapper("contractPaused")]
    fn contract_paused(&self) -> SingleValueMapper<bool>;
}