import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import { ArrowLeft, Trophy, Star, CheckCircle } from 'lucide-react';

const GroupMissions = () => {
    const navigate = useNavigate();

    const missions = [
        {
            id: 1,
            title: '서로 칭찬 3가지 하기',
            description: '오늘 하루 동안 상대방의 장점이나 고마운 점 3가지를 찾아 말해주세요.',
            reward: '칭찬 요정 뱃지',
            difficulty: 'Easy',
            completed: false
        },
        {
            id: 2,
            title: '함께 저녁 산책하기',
            description: '30분 이상 함께 걸으며 스마트폰 없이 대화하는 시간을 가져보세요.',
            reward: '산책 마스터 뱃지',
            difficulty: 'Medium',
            completed: true
        },
        {
            id: 3,
            title: '추억의 장소 방문하기',
            description: '우리에게 특별한 의미가 있는 장소를 다시 방문하여 사진을 남겨보세요.',
            reward: '추억 수집가 뱃지',
            difficulty: 'Hard',
            completed: false
        }
    ];

    return (
        <div className="min-h-screen bg-slate-50 p-4 sm:p-8">
            <div className="max-w-3xl mx-auto">
                <div className="flex items-center mb-8">
                    <button onClick={() => navigate(-1)} className="mr-4 p-2 hover:bg-slate-200 rounded-full transition-colors">
                        <ArrowLeft className="w-6 h-6 text-slate-600" />
                    </button>
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900">그룹 미션 & 챌린지</h1>
                        <p className="text-slate-500">함께 도전하며 관계를 더욱 단단하게 만들어보세요.</p>
                    </div>
                </div>

                <div className="grid gap-6">
                    {missions.map((mission) => (
                        <div key={mission.id} className={`bg-white p-6 rounded-2xl shadow-sm border-2 transition-all ${mission.completed ? 'border-green-500 bg-green-50' : 'border-slate-100'}`}>
                            <div className="flex justify-between items-start">
                                <div className="flex-1">
                                    <div className="flex items-center mb-2">
                                        <span className={`text-xs font-bold px-2 py-1 rounded-full mr-2 ${mission.difficulty === 'Easy' ? 'bg-blue-100 text-blue-600' :
                                                mission.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-600' :
                                                    'bg-red-100 text-red-600'
                                            }`}>
                                            {mission.difficulty}
                                        </span>
                                        <h3 className="text-lg font-bold text-slate-900">{mission.title}</h3>
                                    </div>
                                    <p className="text-slate-600 mb-4">{mission.description}</p>
                                    <div className="flex items-center text-sm text-indigo-600 font-medium">
                                        <Trophy className="w-4 h-4 mr-1" />
                                        보상: {mission.reward}
                                    </div>
                                </div>
                                <div className="ml-4">
                                    {mission.completed ? (
                                        <div className="flex flex-col items-center text-green-600">
                                            <CheckCircle className="w-8 h-8 mb-1" />
                                            <span className="text-xs font-bold">완료됨</span>
                                        </div>
                                    ) : (
                                        <Button size="sm" variant="outline">도전하기</Button>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default GroupMissions;
