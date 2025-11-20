import React from 'react';
import { auth } from '../services/firebase';
import Button from '../components/Button';
import { Flame, Heart, Moon, Brain, BookOpen, Users, Trophy, UserCheck, MessageSquare } from 'lucide-react';

const Dashboard = () => {
    const user = auth.currentUser;
    const handleLogout = () => {
        auth.signOut();
    };

    return (
        <div className="min-h-screen bg-slate-50 p-4 sm:p-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
                    <div>
                        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
                            반가워요, {user?.displayName || '여행자'}님! 👋
                        </h1>
                        <p className="text-slate-500 mt-1">오늘도 마음을 돌보는 여정을 함께해요.</p>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="bg-orange-50 text-orange-600 px-4 py-2 rounded-full flex items-center font-bold border border-orange-100 shadow-sm">
                            <Flame className="w-5 h-5 mr-1 fill-orange-500" />
                            <span>3일 연속 기록 중</span>
                        </div>
                        <div className="flex gap-2">
                            <Button onClick={() => window.location.href = '/chat'}>
                                <MessageSquare className="w-4 h-4 mr-2" />
                                CoCo 상담
                            </Button>
                            <Button variant="outline" onClick={handleLogout}>로그아웃</Button>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* 1. Personal Care */}
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col">
                        <div className="flex items-center mb-4 text-rose-500">
                            <Heart className="w-6 h-6 mr-2" />
                            <h3 className="text-lg font-bold text-slate-900">나의 마음 돌봄</h3>
                        </div>
                        <p className="text-slate-500 mb-6 flex-grow">매일의 감정과 꿈을 기록하고 나를 이해해보세요.</p>
                        <div className="grid grid-cols-2 gap-3">
                            <Button onClick={() => window.location.href = '/record'} className="bg-rose-500 hover:bg-rose-600 border-transparent">
                                감정 기록
                            </Button>
                            <Button variant="outline" onClick={() => window.location.href = '/dream'}>
                                <Moon className="w-4 h-4 mr-2" />
                                꿈 기록
                            </Button>
                        </div>
                    </div>

                    {/* 2. Growth & Insight */}
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col">
                        <div className="flex items-center mb-4 text-indigo-500">
                            <Brain className="w-6 h-6 mr-2" />
                            <h3 className="text-lg font-bold text-slate-900">성장과 통찰</h3>
                        </div>
                        <p className="text-slate-500 mb-6 flex-grow">심리 DNA를 분석하고 치유 콘텐츠를 만나보세요.</p>
                        <div className="grid grid-cols-2 gap-3">
                            <Button variant="outline" onClick={() => window.location.href = '/mindmap'}>
                                마음 지도
                            </Button>
                            <Button variant="outline" onClick={() => window.location.href = '/content'}>
                                <BookOpen className="w-4 h-4 mr-2" />
                                도서관
                            </Button>
                        </div>
                        <Button variant="ghost" size="sm" className="mt-2 text-slate-400 hover:text-indigo-600" onClick={() => window.location.href = '/expert'}>
                            <UserCheck className="w-4 h-4 mr-1" />
                            전문가 도움이 필요하신가요?
                        </Button>
                    </div>

                    {/* 3. Relationship (Group) */}
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col">
                        <div className="flex items-center mb-4 text-teal-500">
                            <Users className="w-6 h-6 mr-2" />
                            <h3 className="text-lg font-bold text-slate-900">우리 관계</h3>
                        </div>
                        <p className="text-slate-500 mb-6 flex-grow">소중한 사람들과 함께 성장하는 기쁨을 누리세요.</p>
                        <div className="space-y-3">
                            <Button variant="secondary" className="w-full" onClick={() => window.location.href = '/group/create'}>
                                새 그룹 만들기
                            </Button>
                            <div className="grid grid-cols-2 gap-3">
                                <Button variant="outline" onClick={() => window.location.href = '/group/report'}>
                                    위클리 리포트
                                </Button>
                                <Button variant="outline" onClick={() => window.location.href = '/group/missions'}>
                                    <Trophy className="w-4 h-4 mr-2" />
                                    미션
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
