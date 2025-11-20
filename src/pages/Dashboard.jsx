import React from 'react';
import { auth } from '../services/firebase';
import Button from '../components/Button';
import { Flame, Heart, Moon, Brain, BookOpen, Users, Trophy, UserCheck, MessageSquare, Sparkles, ArrowRight } from 'lucide-react';

const Dashboard = () => {
    const user = auth.currentUser;
    const handleLogout = () => {
        auth.signOut();
    };

    return (
        <div className="min-h-screen bg-surface-50 relative overflow-hidden">
            {/* Background Decor */}
            <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-primary-50 to-transparent -z-10"></div>
            <div className="absolute -top-20 -right-20 w-96 h-96 bg-secondary-100 rounded-full blur-3xl opacity-50 -z-10"></div>
            <div className="absolute top-40 -left-20 w-72 h-72 bg-primary-100 rounded-full blur-3xl opacity-50 -z-10"></div>

            <div className="max-w-7xl mx-auto p-6 sm:p-8">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6 animate-fade-in">
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <span className="bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-primary-600 border border-primary-100 shadow-sm">
                                Premium Care
                            </span>
                            <span className="text-slate-400 text-xs">|</span>
                            <span className="text-slate-500 text-xs">{new Date().toLocaleDateString()}</span>
                        </div>
                        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">
                            반가워요, <span className="text-gradient">{user?.displayName || '여행자'}</span>님!
                        </h1>
                        <p className="text-slate-500 mt-2 text-lg">오늘도 당신의 마음 정원을 함께 가꾸어 볼까요?</p>
                    </div>

                    <div className="flex flex-wrap items-center gap-3">
                        <div className="glass-panel px-4 py-2 rounded-full flex items-center font-bold text-orange-500 animate-float">
                            <Flame className="w-5 h-5 mr-1 fill-orange-500" />
                            <span>3일 연속 기록 중</span>
                        </div>
                        <Button onClick={() => window.location.href = '/chat'} className="shadow-glow">
                            <MessageSquare className="w-4 h-4 mr-2" />
                            CoCo 상담하기
                        </Button>
                        <Button variant="ghost" onClick={handleLogout}>로그아웃</Button>
                    </div>
                </div>

                {/* Main Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

                    {/* Card 1: Personal Care */}
                    <div className="glass-panel p-8 rounded-3xl card-hover flex flex-col relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-rose-50 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-110"></div>
                        <div className="relative z-10">
                            <div className="w-12 h-12 bg-rose-100 rounded-2xl flex items-center justify-center mb-6 text-rose-500">
                                <Heart className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-2">나의 마음 돌봄</h3>
                            <p className="text-slate-500 mb-8 leading-relaxed">
                                매일의 감정을 기록하고, 꿈이 보내는 무의식의 메시지를 확인하세요.
                            </p>
                            <div className="mt-auto space-y-3">
                                <Button onClick={() => window.location.href = '/record'} className="w-full justify-between group-hover:bg-rose-500 group-hover:text-white transition-colors bg-rose-50 text-rose-600 hover:bg-rose-100 border-none">
                                    <span>감정 기록하기</span>
                                    <ArrowRight className="w-4 h-4" />
                                </Button>
                                <Button variant="ghost" onClick={() => window.location.href = '/dream'} className="w-full justify-start text-slate-500 hover:text-rose-600">
                                    <Moon className="w-4 h-4 mr-2" />
                                    꿈 기록장
                                </Button>
                            </div>
                        </div>
                    </div>

                    {/* Card 2: Insight */}
                    <div className="glass-panel p-8 rounded-3xl card-hover flex flex-col relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-110"></div>
                        <div className="relative z-10">
                            <div className="w-12 h-12 bg-indigo-100 rounded-2xl flex items-center justify-center mb-6 text-indigo-500">
                                <Brain className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-2">성장과 통찰</h3>
                            <p className="text-slate-500 mb-8 leading-relaxed">
                                나의 심리 DNA를 시각적으로 탐구하고, 치유를 위한 지혜를 얻으세요.
                            </p>
                            <div className="mt-auto space-y-3">
                                <Button onClick={() => window.location.href = '/mindmap'} className="w-full justify-between group-hover:bg-indigo-500 group-hover:text-white transition-colors bg-indigo-50 text-indigo-600 hover:bg-indigo-100 border-none">
                                    <span>마음 지도 보기</span>
                                    <ArrowRight className="w-4 h-4" />
                                </Button>
                                <div className="flex gap-2">
                                    <Button variant="ghost" onClick={() => window.location.href = '/content'} className="flex-1 justify-start text-slate-500 hover:text-indigo-600">
                                        <BookOpen className="w-4 h-4 mr-2" />
                                        도서관
                                    </Button>
                                    <Button variant="ghost" onClick={() => window.location.href = '/expert'} className="flex-1 justify-start text-slate-500 hover:text-indigo-600">
                                        <UserCheck className="w-4 h-4 mr-2" />
                                        전문가
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Card 3: Relationship */}
                    <div className="glass-panel p-8 rounded-3xl card-hover flex flex-col relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-teal-50 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-110"></div>
                        <div className="relative z-10">
                            <div className="w-12 h-12 bg-teal-100 rounded-2xl flex items-center justify-center mb-6 text-teal-500">
                                <Users className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-2">우리 관계</h3>
                            <p className="text-slate-500 mb-8 leading-relaxed">
                                소중한 사람들과 함께 성장하며, 더 깊은 연결감을 경험하세요.
                            </p>
                            <div className="mt-auto space-y-3">
                                <Button onClick={() => window.location.href = '/group/report'} className="w-full justify-between group-hover:bg-teal-500 group-hover:text-white transition-colors bg-teal-50 text-teal-600 hover:bg-teal-100 border-none">
                                    <span>위클리 리포트</span>
                                    <ArrowRight className="w-4 h-4" />
                                </Button>
                                <div className="flex gap-2">
                                    <Button variant="ghost" onClick={() => window.location.href = '/group/create'} className="flex-1 justify-start text-slate-500 hover:text-teal-600">
                                        <Sparkles className="w-4 h-4 mr-2" />
                                        새 그룹
                                    </Button>
                                    <Button variant="ghost" onClick={() => window.location.href = '/group/missions'} className="flex-1 justify-start text-slate-500 hover:text-teal-600">
                                        <Trophy className="w-4 h-4 mr-2" />
                                        미션
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Dashboard;
