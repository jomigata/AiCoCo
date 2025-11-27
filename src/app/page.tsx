'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Heart, Brain, Users, Sparkles, ArrowRight, CheckCircle } from 'lucide-react'

export default function HomePage() {
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) return null

    return (
        <div className="relative overflow-hidden">
            {/* Hero Section */}
            <section className="relative min-h-screen flex items-center justify-center px-4 py-20">
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute -top-1/2 -right-1/2 w-full h-full bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl"></div>
                    <div className="absolute -bottom-1/2 -left-1/2 w-full h-full bg-gradient-to-tr from-purple-400/20 to-pink-400/20 rounded-full blur-3xl"></div>
                </div>

                <div className="relative z-10 max-w-6xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="space-y-8"
                    >
                        {/* Logo/Badge */}
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 0.2, duration: 0.6 }}
                            className="inline-flex items-center gap-2 px-6 py-3 bg-white/80 backdrop-blur-sm rounded-full shadow-lg border border-blue-100"
                        >
                            <Sparkles className="w-5 h-5 text-blue-500" />
                            <span className="text-sm font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                AI 기반 심리상담 플랫폼
                            </span>
                        </motion.div>

                        {/* Main Heading */}
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3, duration: 0.8 }}
                            className="text-5xl md:text-7xl font-bold leading-tight"
                        >
                            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                                AiCoCo
                            </span>
                            <br />
                            <span className="text-gray-800">
                                마음의 치유를 시작하세요
                            </span>
                        </motion.h1>

                        {/* Description */}
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4, duration: 0.8 }}
                            className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
                        >
                            30년 이상 경력의 전문 심리상담가와 최신 AI 기술이 만나
                            <br />
                            당신의 마음 건강을 함께 돌봅니다
                        </motion.p>

                        {/* CTA Buttons */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5, duration: 0.8 }}
                            className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8"
                        >
                            <button className="group px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-semibold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 flex items-center gap-2">
                                상담 시작하기
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </button>
                            <button className="px-8 py-4 bg-white/80 backdrop-blur-sm text-gray-700 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border border-gray-200">
                                자세히 알아보기
                            </button>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-24 px-4 bg-white/50 backdrop-blur-sm">
                <div className="max-w-6xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
                            전문가 팀과 함께하는
                            <br />
                            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                혁신적인 상담 경험
                            </span>
                        </h2>
                    </motion.div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                icon: Heart,
                                title: '전문 심리상담가',
                                description: '30년 이상 경력의 전문가 2명과 현직 심리학자 9명이 함께합니다',
                                color: 'from-pink-500 to-rose-500'
                            },
                            {
                                icon: Brain,
                                title: 'AI 기반 분석',
                                description: '최신 AI 기술로 심리 상태를 정확하게 분석하고 맞춤 솔루션을 제공합니다',
                                color: 'from-blue-500 to-cyan-500'
                            },
                            {
                                icon: Users,
                                title: '다양한 전문 분야',
                                description: '개인상담, 학생상담, 산업상담 등 모든 분야를 전문적으로 지원합니다',
                                color: 'from-purple-500 to-indigo-500'
                            },
                        ].map((feature, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.2, duration: 0.6 }}
                                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                                className="group relative p-8 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300"
                            >
                                <div className={`inline-flex p-4 bg-gradient-to-br ${feature.color} rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300`}>
                                    <feature.icon className="w-8 h-8 text-white" />
                                </div>
                                <h3 className="text-2xl font-bold text-gray-800 mb-4">{feature.title}</h3>
                                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Team Section */}
            <section className="py-24 px-4">
                <div className="max-w-6xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
                            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                전문가 팀 구성
                            </span>
                        </h2>
                        <p className="text-xl text-gray-600">
                            풀스택 개발자, 디자이너, 심리상담가가 함께하는 통합 팀
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[
                            { role: '전문 심리상담가', count: 2, experience: '30년 이상 경력' },
                            { role: '대학생 심리학도', count: 4, experience: '최신 심리학 연구' },
                            { role: '학생회 상담관', count: 3, experience: '학생 전문 상담' },
                            { role: '심리상담센터', count: 6, experience: '일반 종합 상담' },
                            { role: '산업 전문 상담사', count: 3, experience: '기업 컨설팅' },
                            { role: '풀스택 개발자', count: 2, experience: '기술 구현' },
                        ].map((team, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1, duration: 0.5 }}
                                className="p-6 bg-white/80 backdrop-blur-sm rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100"
                            >
                                <div className="flex items-start gap-4">
                                    <div className="flex-shrink-0">
                                        <CheckCircle className="w-6 h-6 text-green-500" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-gray-800 mb-1">{team.role}</h3>
                                        <p className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                                            {team.count}명
                                        </p>
                                        <p className="text-sm text-gray-600">{team.experience}</p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-12 px-4 bg-gray-900 text-white">
                <div className="max-w-6xl mx-auto text-center">
                    <h3 className="text-2xl font-bold mb-4">AiCoCo</h3>
                    <p className="text-gray-400 mb-6">
                        AI 기반 심리상담 플랫폼 | Firebase Project: aicoco-5f8e6
                    </p>
                    <p className="text-sm text-gray-500">
                        © 2025 AiCoCo. All rights reserved.
                    </p>
                </div>
            </footer>
        </div>
    )
}
