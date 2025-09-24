'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  BookOpenIcon, 
  TrophyIcon, 
  SparklesIcon, 
  RocketLaunchIcon,
  UserGroupIcon,
  ChartBarIcon
} from '@heroicons/react/24/outline'
import { WalletConnectButton } from '@/components/WalletConnectButton'
import { QuestCard } from '@/components/QuestCard'
import { StatsCard } from '@/components/StatsCard'
import { AIPersonaCard } from '@/components/AIPersonaCard'

// Mock data - replace with real API calls
const mockQuests = [
  {
    id: 1,
    title: 'Predict EGLD Price',
    description: 'Guess the EGLD price in the next 4 hours (±5% accuracy)',
    type: 'daily',
    difficulty: 3,
    xpReward: 150,
    egldReward: 0.001,
    icon: ChartBarIcon,
    timeLeft: '3h 45m'
  },
  {
    id: 2,
    title: 'Technical Analysis Challenge',
    description: 'Identify patterns on real trading charts',
    type: 'daily',
    difficulty: 4,
    xpReward: 200,
    egldReward: 0.002,
    icon: TrophyIcon,
    timeLeft: '5h 12m'
  },
  {
    id: 3,
    title: 'MultiversX Ecosystem Quiz',
    description: 'Test your knowledge about MultiversX projects and technology',
    type: 'weekly',
    difficulty: 2,
    xpReward: 500,
    egldReward: 0.01,
    icon: BookOpenIcon,
    timeLeft: '2d 8h'
  }
]

const aiPersonas = [
  {
    name: 'Sage Scholar',
    description: 'Master of fundamentals and technical analysis',
    specialty: 'Long-term investment strategies',
    personality: 'Calm, educational, thorough',
    avatar: '/images/sage-scholar.png',
    color: 'from-blue-500 to-indigo-600'
  },
  {
    name: 'Crypto Gladiator',
    description: 'Expert in timing and market opportunities',
    specialty: 'Day trading & scalping techniques',
    personality: 'Aggressive, fast-paced, direct',
    avatar: '/images/crypto-gladiator.png',
    color: 'from-red-500 to-orange-600'
  },
  {
    name: 'Tech Oracle',
    description: 'Blockchain technology and DeFi specialist',
    specialty: 'Protocol analysis & project evaluation',
    personality: 'Technical, innovative, forward-thinking',
    avatar: '/images/tech-oracle.png',
    color: 'from-purple-500 to-pink-600'
  }
]

export default function HomePage() {
  const [isWalletConnected, setIsWalletConnected] = useState(false)
  const [userStats, setUserStats] = useState({
    level: 1,
    xp: 0,
    completedQuests: 0,
    badges: 0,
    streak: 0,
    accuracy: 0
  })

  useEffect(() => {
    // Check if wallet is connected on mount
    // This would integrate with MultiversX SDK
    const checkWalletConnection = async () => {
      try {
        // Placeholder for MultiversX wallet check
        // const isConnected = await checkMultiversXWallet()
        // setIsWalletConnected(isConnected)
      } catch (error) {
        console.error('Error checking wallet connection:', error)
      }
    }

    checkWalletConnection()
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6 }
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* Header */}
      <header className="relative z-10 px-4 py-6 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <motion.div 
              className="flex items-center space-x-3"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                <SparklesIcon className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">ELRONOM</h1>
                <p className="text-sm text-blue-200">MultiversX Trading Academy</p>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <WalletConnectButton 
                isConnected={isWalletConnected}
                onConnectionChange={setIsWalletConnected}
              />
            </motion.div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 px-4 py-8 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-12"
          >
            {/* Hero Section */}
            <motion.section variants={itemVariants} className="text-center">
              <motion.div
                className="inline-flex items-center space-x-2 bg-blue-900/30 border border-blue-500/30 rounded-full px-4 py-2 mb-6"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <RocketLaunchIcon className="w-5 h-5 text-blue-400" />
                <span className="text-blue-200 text-sm font-medium">Ready for Legal Foundation Phase</span>
              </motion.div>
              
              <h2 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6">
                Learn Trading
                <span className="block bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                  Through Adventure
                </span>
              </h2>
              
              <p className="text-xl text-slate-300 mb-8 max-w-3xl mx-auto leading-relaxed">
                Join the first gamified educational platform on MultiversX. Complete quests, 
                earn educational NFTs, and master crypto trading with AI mentorship in a 
                safe, interactive environment.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <motion.button
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-2"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={!isWalletConnected}
                >
                  <SparklesIcon className="w-5 h-5" />
                  <span>{isWalletConnected ? 'Start Your Journey' : 'Connect Wallet First'}</span>
                </motion.button>
                
                <motion.button
                  className="border border-slate-600 hover:border-slate-500 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 flex items-center space-x-2"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <BookOpenIcon className="w-5 h-5" />
                  <span>Learn More</span>
                </motion.button>
              </div>
            </motion.section>

            {/* Stats Overview */}
            {isWalletConnected && (
              <motion.section variants={itemVariants}>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                  <StatsCard title="Level" value={userStats.level} icon="🎯" />
                  <StatsCard title="Total XP" value={userStats.xp.toLocaleString()} icon="⚡" />
                  <StatsCard title="Quests" value={userStats.completedQuests} icon="🗡️" />
                  <StatsCard title="Badges" value={userStats.badges} icon="🏅" />
                  <StatsCard title="Streak" value={`${userStats.streak}d`} icon="🔥" />
                  <StatsCard title="Accuracy" value={`${userStats.accuracy}%`} icon="🎯" />
                </div>
              </motion.section>
            )}

            {/* Active Quests */}
            <motion.section variants={itemVariants}>
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-3xl font-bold text-white">Active Quests</h3>
                <div className="flex items-center space-x-2 text-blue-400">
                  <TrophyIcon className="w-5 h-5" />
                  <span className="font-medium">Earn XP & EGLD Rewards</span>
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {mockQuests.map((quest, index) => (
                  <motion.div
                    key={quest.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <QuestCard
                      quest={quest}
                      isWalletConnected={isWalletConnected}
                      onStart={() => console.log(`Starting quest ${quest.id}`)}
                    />
                  </motion.div>
                ))}
              </div>
            </motion.section>

            {/* AI Mentors */}
            <motion.section variants={itemVariants}>
              <div className="text-center mb-12">
                <h3 className="text-3xl font-bold text-white mb-4">Meet Your AI Mentors</h3>
                <p className="text-xl text-slate-300 max-w-3xl mx-auto">
                  Choose your learning companion from three unique AI personalities, 
                  each specialized in different aspects of crypto trading and blockchain technology.
                </p>
              </div>
              
              <div className="grid md:grid-cols-3 gap-8">
                {aiPersonas.map((persona, index) => (
                  <motion.div
                    key={persona.name}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: index * 0.2 }}
                  >
                    <AIPersonaCard persona={persona} />
                  </motion.div>
                ))}
              </div>
            </motion.section>

            {/* Features Grid */}
            <motion.section variants={itemVariants}>
              <div className="text-center mb-12">
                <h3 className="text-3xl font-bold text-white mb-4">Why Choose ELRONOM?</h3>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                <FeatureCard
                  icon={BookOpenIcon}
                  title="Interactive Learning"
                  description="Learn through hands-on quests and real-world scenarios, not boring lectures."
                />
                <FeatureCard
                  icon={TrophyIcon}
                  title="Real NFT Rewards"
                  description="Earn educational NFT certificates with real utility and achievement recognition."
                />
                <FeatureCard
                  icon={UserGroupIcon}
                  title="Community Driven"
                  description="Join study groups, compete in tournaments, and learn from fellow traders."
                />
                <FeatureCard
                  icon={SparklesIcon}
                  title="AI Mentorship"
                  description="Get personalized guidance from three unique AI mentors with different specialties."
                />
                <FeatureCard
                  icon={ChartBarIcon}
                  title="Real Market Data"
                  description="Practice with live MultiversX and EGLD market data in a safe environment."
                />
                <FeatureCard
                  icon={RocketLaunchIcon}
                  title="Progressive Advancement"
                  description="Unlock advanced courses and features as you level up your trading skills."
                />
              </div>
            </motion.section>

            {/* CTA Section */}
            <motion.section variants={itemVariants} className="text-center py-16">
              <div className="bg-gradient-to-r from-blue-900/50 to-purple-900/50 border border-blue-500/20 rounded-3xl p-12">
                <h3 className="text-4xl font-bold text-white mb-6">
                  Ready to Start Your Trading Adventure?
                </h3>
                <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
                  Join thousands of learners mastering crypto trading through gamification, 
                  AI mentorship, and real MultiversX blockchain technology.
                </p>
                
                {!isWalletConnected ? (
                  <div className="space-y-4">
                    <WalletConnectButton 
                      isConnected={isWalletConnected}
                      onConnectionChange={setIsWalletConnected}
                      size="large"
                    />
                    <p className="text-sm text-slate-400">
                      Connect your MultiversX wallet to begin your educational journey
                    </p>
                  </div>
                ) : (
                  <motion.button
                    className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white px-12 py-4 rounded-xl font-bold text-xl shadow-lg hover:shadow-xl transition-all duration-300"
                    whileHover={{ scale: 1.05, y: -3 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Enter Academy
                  </motion.button>
                )}
              </div>
            </motion.section>
          </motion.div>
        </div>
      </main>

      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-400/5 rounded-full blur-3xl" />
      </div>
    </div>
  )
}

// Feature Card Component
interface FeatureCardProps {
  icon: React.ComponentType<{ className?: string }>
  title: string
  description: string
}

function FeatureCard({ icon: Icon, title, description }: FeatureCardProps) {
  return (
    <motion.div
      className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-6 hover:bg-slate-800/70 transition-all duration-300"
      whileHover={{ y: -5, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center mb-4">
        <Icon className="w-6 h-6 text-white" />
      </div>
      <h4 className="text-xl font-bold text-white mb-3">{title}</h4>
      <p className="text-slate-300 leading-relaxed">{description}</p>
    </motion.div>
  )
}