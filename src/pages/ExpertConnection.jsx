import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import { ArrowLeft, UserCheck, Star, Calendar, MessageSquare } from 'lucide-react';

const ExpertConnection = () => {
    const navigate = useNavigate();

    const experts = [
        {
            id: 1,
            name: '김지혜 상담사',
            specialty: '부부/커플 상담 전문',
            rating: 4.9,
            reviews: 128,
            image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix',
            status: 'available'
        },
        {
            id: 2,
            name: '박민수 상담사',
            specialty: '직무 스트레스 및 번아웃',
            rating: 4.8,
            reviews: 95,
            image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Aneka',
            status: 'busy'
        },
        {
            id: 3,
            name: '이수진 상담사',
            specialty: '청소년 및 가족 갈등',
            rating: 5.0,
            reviews: 210,
            image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Willow',
            status: 'available'
        }
    ];

    return (
        <div className="min-h-screen bg-slate-50 p-4 sm:p-8">
            <div className="max-w-4xl mx-auto">
                <div className="flex items-center mb-8">
                    <button onClick={() => navigate(-1)} className="mr-4 p-2 hover:bg-slate-200 rounded-full transition-colors">
                        <ArrowLeft className="w-6 h-6 text-slate-600" />
                    </button>
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900">전문가 상담 연결</h1>
                        <p className="text-slate-500">AI 분석 결과를 바탕으로 더 깊은 도움이 필요하다면 전문가를 만나보세요.</p>
                    </div>
                </div>

                <div className="grid gap-6">
                    {experts.map((expert) => (
                        <div key={expert.id} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col sm:flex-row items-center sm:items-start gap-6">
                            <img src={expert.image} alt={expert.name} className="w-24 h-24 rounded-full bg-slate-100" />

                            <div className="flex-1 text-center sm:text-left">
                                <div className="flex flex-col sm:flex-row items-center sm:items-baseline gap-2 mb-2">
                                    <h3 className="text-xl font-bold text-slate-900">{expert.name}</h3>
                                    <span className="text-sm text-indigo-600 font-medium bg-indigo-50 px-2 py-1 rounded-full">
                                        {expert.specialty}
                                    </span>
                                </div>

                                <div className="flex items-center justify-center sm:justify-start gap-4 text-sm text-slate-500 mb-4">
                                    <div className="flex items-center">
                                        <Star className="w-4 h-4 text-yellow-400 fill-yellow-400 mr-1" />
                                        <span className="font-bold text-slate-700">{expert.rating}</span>
                                        <span className="mx-1">·</span>
                                        <span>후기 {expert.reviews}개</span>
                                    </div>
                                    <div className="flex items-center">
                                        <UserCheck className="w-4 h-4 mr-1" />
                                        <span>공인 임상심리사</span>
                                    </div>
                                </div>

                                <div className="flex gap-3 justify-center sm:justify-start">
                                    <Button size="sm" variant="outline">
                                        <MessageSquare className="w-4 h-4 mr-2" />
                                        문의하기
                                    </Button>
                                    <Button size="sm" disabled={expert.status === 'busy'}>
                                        <Calendar className="w-4 h-4 mr-2" />
                                        {expert.status === 'available' ? '상담 예약하기' : '예약 마감'}
                                    </Button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ExpertConnection;
