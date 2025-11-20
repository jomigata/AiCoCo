import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../services/firebase';
import { collection, addDoc } from 'firebase/firestore';
import Button from '../components/Button';
import Input from '../components/Input';
import { ArrowLeft, Users, Heart, Briefcase, UserPlus, Target } from 'lucide-react';

const GroupCreate = () => {
    const navigate = useNavigate();
    const user = auth.currentUser;
    const [groupName, setGroupName] = useState('');
    const [groupType, setGroupType] = useState('');
    const [goal, setGoal] = useState('');
    const [inviteEmails, setInviteEmails] = useState('');

    const groupTypes = [
        { value: 'family', label: '가족', icon: Heart, color: 'from-rose-500 to-pink-500', desc: '가족 간의 이해와 소통' },
        { value: 'couple', label: '연인/부부', icon: Heart, color: 'from-red-500 to-rose-500', desc: '더 깊은 관계를 위해' },
        { value: 'team', label: '회사 팀', icon: Briefcase, color: 'from-blue-500 to-indigo-500', desc: '팀워크 향상' },
        { value: 'friends', label: '친구', icon: Users, color: 'from-green-500 to-teal-500', desc: '우정을 더욱 단단하게' },
    ];

    const handleCreate = async () => {
        try {
            const newGroup = await addDoc(collection(db, 'groups'), {
                name: groupName,
                type: groupType,
                goal: goal,
                members: [user.uid],
                createdBy: user.uid,
                createdAt: new Date(),
            });
            navigate('/');
        } catch (error) {
            console.error('Error creating group:', error);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 relative overflow-hidden">
            <div className="absolute -top-40 -left-40 w-96 h-96 bg-primary-100 rounded-full blur-3xl opacity-30"></div>
            <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-secondary-100 rounded-full blur-3xl opacity-30"></div>

            <div className="relative z-10 max-w-3xl mx-auto p-6 sm:p-12">
                {/* Header */}
                <div className="flex items-center mb-8">
                    <button onClick={() => navigate(-1)} className="mr-4 p-2 hover:bg-white/50 rounded-full transition-colors">
                        <ArrowLeft className="w-6 h-6 text-slate-600" />
                    </button>
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900">그룹 만들기</h1>
                        <p className="text-slate-500 mt-1">소중한 사람들과 함께 성장하는 여정을 시작하세요</p>
                    </div>
                </div>

                {/* Group Type Selection */}
                <div className="glass-panel p-8 rounded-3xl mb-6 animate-fade-in">
                    <div className="flex items-center gap-2 mb-6">
                        <Users className="w-5 h-5 text-primary-500" />
                        <h3 className="text-lg font-bold text-slate-900">그룹 유형을 선택하세요</h3>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {groupTypes.map((type) => {
                            const Icon = type.icon;
                            return (
                                <button
                                    key={type.value}
                                    onClick={() => setGroupType(type.value)}
                                    className={`p-6 rounded-2xl border-2 transition-all duration-200 text-left ${groupType === type.value
                                            ? 'border-primary-500 bg-primary-50 shadow-lg transform scale-[1.02]'
                                            : 'border-slate-200 bg-white hover:border-slate-300'
                                        }`}
                                >
                                    <div className={`w-14 h-14 bg-gradient-to-br ${type.color} rounded-2xl flex items-center justify-center mb-4 shadow-md`}>
                                        <Icon className="w-7 h-7 text-white" />
                                    </div>
                                    <h4 className="font-bold text-slate-900 mb-1">{type.label}</h4>
                                    <p className="text-sm text-slate-500">{type.desc}</p>
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Group Details */}
                <div className="glass-panel p-8 rounded-3xl mb-6 animate-fade-in space-y-6">
                    <div>
                        <label className="flex items-center gap-2 mb-3 font-medium text-slate-700">
                            <Users className="w-4 h-4 text-primary-500" />
                            그룹 이름
                        </label>
                        <Input
                            type="text"
                            value={groupName}
                            onChange={(e) => setGroupName(e.target.value)}
                            placeholder="예: 우리 가족, 행복한 부부, A팀"
                        />
                    </div>

                    <div>
                        <label className="flex items-center gap-2 mb-3 font-medium text-slate-700">
                            <Target className="w-4 h-4 text-primary-500" />
                            그룹 목표
                        </label>
                        <textarea
                            value={goal}
                            onChange={(e) => setGoal(e.target.value)}
                            placeholder="이 그룹을 통해 이루고 싶은 목표를 적어주세요..."
                            className="w-full h-32 p-4 bg-white border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none text-slate-800 placeholder-slate-400"
                        />
                    </div>

                    <div>
                        <label className="flex items-center gap-2 mb-3 font-medium text-slate-700">
                            <UserPlus className="w-4 h-4 text-primary-500" />
                            멤버 초대 (이메일)
                        </label>
                        <Input
                            type="text"
                            value={inviteEmails}
                            onChange={(e) => setInviteEmails(e.target.value)}
                            placeholder="example@email.com, member@email.com (쉼표로 구분)"
                        />
                        <p className="text-xs text-slate-500 mt-2">💡 나중에도 멤버를 초대할 수 있습니다</p>
                    </div>
                </div>

                {/* Create Button */}
                <Button
                    onClick={handleCreate}
                    disabled={!groupName || !groupType}
                    className="w-full py-4 text-lg shadow-lg shadow-primary-500/20"
                >
                    그룹 생성하기
                </Button>
            </div>
        </div>
    );
};

export default GroupCreate;
