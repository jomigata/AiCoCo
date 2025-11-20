import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addDoc, collection, doc, updateDoc, arrayUnion } from 'firebase/firestore';
import { auth, db } from '../services/firebase';
import Button from '../components/Button';
import Input from '../components/Input';
import { Users, Heart, Briefcase, Home } from 'lucide-react';

const groupTypes = [
    { id: 'family', label: '가족', icon: Home, description: '서로를 더 깊이 이해하고 싶은 가족' },
    { id: 'couple', label: '연인/부부', icon: Heart, description: '사랑을 키워가는 커플' },
    { id: 'team', label: '팀/동료', icon: Briefcase, description: '함께 성장하는 팀' },
    { id: 'friends', label: '친구', icon: Users, description: '소중한 우정을 나누는 친구' },
];

const groupGoals = {
    family: ['소통 증진', '갈등 해결', '유대감 강화', '서로 이해하기'],
    couple: ['신뢰 쌓기', '대화법 개선', '미래 계획', '친밀감 증진'],
    team: ['협업 능력 향상', '팀워크 강화', '스트레스 관리', '목표 달성'],
    friends: ['추억 만들기', '고민 나누기', '서로 응원하기', '취미 공유'],
};

const GroupCreate = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        name: '',
        type: '',
        goals: [],
        inviteEmails: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleTypeSelect = (typeId) => {
        setFormData(prev => ({ ...prev, type: typeId, goals: [] }));
        setStep(2);
    };

    const handleGoalToggle = (goal) => {
        setFormData(prev => {
            const newGoals = prev.goals.includes(goal)
                ? prev.goals.filter(g => g !== goal)
                : [...prev.goals, goal];
            return { ...prev, goals: newGoals };
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.name) return alert('그룹 이름을 입력해주세요.');

        setIsSubmitting(true);
        try {
            const user = auth.currentUser;
            if (!user) throw new Error('로그인이 필요합니다.');

            // 1. Create Group Document
            const groupRef = await addDoc(collection(db, 'groups'), {
                name: formData.name,
                type: formData.type,
                goals: formData.goals,
                createdBy: user.uid,
                createdAt: new Date().toISOString(),
                members: [user.uid],
                inviteEmails: formData.inviteEmails.split(',').map(e => e.trim()).filter(e => e)
            });

            // 2. Update User Document with new Group ID
            await updateDoc(doc(db, 'users', user.uid), {
                groupIds: arrayUnion(groupRef.id)
            });

            navigate('/');
        } catch (error) {
            console.error(error);
            alert('그룹 생성 실패: ' + error.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 p-4 sm:p-8 flex items-center justify-center">
            <div className="max-w-2xl w-full bg-white rounded-2xl shadow-xl p-8">
                <h1 className="text-3xl font-bold text-slate-900 mb-2 text-center">새로운 그룹 만들기</h1>
                <p className="text-slate-500 text-center mb-8">함께 성장할 소중한 사람들을 초대하세요.</p>

                {step === 1 && (
                    <div className="space-y-6">
                        <h2 className="text-xl font-semibold text-slate-800">어떤 그룹을 만드나요?</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {groupTypes.map((type) => {
                                const Icon = type.icon;
                                return (
                                    <button
                                        key={type.id}
                                        onClick={() => handleTypeSelect(type.id)}
                                        className="flex flex-col items-center p-6 border-2 border-slate-100 rounded-xl hover:border-indigo-500 hover:bg-indigo-50 transition-all group text-center"
                                    >
                                        <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-white text-slate-600 group-hover:text-indigo-600">
                                            <Icon className="w-6 h-6" />
                                        </div>
                                        <h3 className="font-bold text-slate-900 mb-1">{type.label}</h3>
                                        <p className="text-sm text-slate-500">{type.description}</p>
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                )}

                {step === 2 && (
                    <form onSubmit={handleSubmit} className="space-y-8">
                        <div className="space-y-4">
                            <Input
                                label="그룹 이름"
                                placeholder="예: 우리 가족 사랑해, 최강 마케팅팀"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                required
                            />
                        </div>

                        <div className="space-y-4">
                            <label className="block text-sm font-medium text-slate-700">
                                우리 그룹의 목표 (복수 선택 가능)
                            </label>
                            <div className="flex flex-wrap gap-2">
                                {groupGoals[formData.type]?.map((goal) => (
                                    <button
                                        key={goal}
                                        type="button"
                                        onClick={() => handleGoalToggle(goal)}
                                        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${formData.goals.includes(goal)
                                                ? 'bg-indigo-600 text-white'
                                                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                                            }`}
                                    >
                                        {goal}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-4">
                            <Input
                                label="멤버 초대 (이메일)"
                                placeholder="쉼표(,)로 구분하여 입력 (예: mom@example.com, dad@example.com)"
                                value={formData.inviteEmails}
                                onChange={(e) => setFormData({ ...formData, inviteEmails: e.target.value })}
                            />
                        </div>

                        <div className="flex gap-4">
                            <Button type="button" variant="ghost" onClick={() => setStep(1)} className="flex-1">
                                이전
                            </Button>
                            <Button type="submit" className="flex-1" isLoading={isSubmitting}>
                                그룹 생성하기
                            </Button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
};

export default GroupCreate;
