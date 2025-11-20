import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addDoc, collection } from 'firebase/firestore';
import { auth, db } from '../services/firebase';
import Button from '../components/Button';
import { Smile, Frown, Meh, CloudRain, Sun, Zap } from 'lucide-react';

const emotions = [
    { id: 'happy', label: '행복', icon: Smile, color: 'text-yellow-500 bg-yellow-50 border-yellow-200' },
    { id: 'good', label: '좋음', icon: Sun, color: 'text-orange-500 bg-orange-50 border-orange-200' },
    { id: 'soso', label: '그저 그럼', icon: Meh, color: 'text-slate-500 bg-slate-50 border-slate-200' },
    { id: 'sad', label: '슬픔', icon: CloudRain, color: 'text-blue-500 bg-blue-50 border-blue-200' },
    { id: 'bad', label: '나쁨', icon: Frown, color: 'text-gray-500 bg-gray-50 border-gray-200' },
    { id: 'angry', label: '화남', icon: Zap, color: 'text-red-500 bg-red-50 border-red-200' },
];

const DailyRecord = () => {
    const navigate = useNavigate();
    const [selectedEmotion, setSelectedEmotion] = useState(null);
    const [note, setNote] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!selectedEmotion) {
            alert('오늘의 기분을 선택해주세요.');
            return;
        }

        setIsSubmitting(true);
        try {
            const user = auth.currentUser;
            if (!user) throw new Error('로그인이 필요합니다.');

            await addDoc(collection(db, 'records'), {
                userId: user.uid,
                emotion: selectedEmotion,
                note: note,
                createdAt: new Date().toISOString(),
                date: new Date().toLocaleDateString()
            });

            navigate('/');
        } catch (error) {
            console.error(error);
            alert('기록 저장 실패: ' + error.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 p-4 sm:p-8">
            <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-sm border border-slate-100 p-6 sm:p-10">
                <h1 className="text-2xl font-bold text-slate-900 mb-8 text-center">오늘의 마음 기록</h1>

                <form onSubmit={handleSubmit} className="space-y-8">
                    {/* Emotion Selector */}
                    <div className="space-y-4">
                        <label className="block text-sm font-medium text-slate-700 text-center">
                            지금 기분이 어떠신가요?
                        </label>
                        <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
                            {emotions.map((emotion) => {
                                const Icon = emotion.icon;
                                const isSelected = selectedEmotion === emotion.id;
                                return (
                                    <button
                                        key={emotion.id}
                                        type="button"
                                        onClick={() => setSelectedEmotion(emotion.id)}
                                        className={`
                      flex flex-col items-center justify-center p-3 rounded-xl border-2 transition-all duration-200
                      ${isSelected ? emotion.color + ' ring-2 ring-offset-2 ring-indigo-500' : 'border-slate-100 hover:bg-slate-50 text-slate-400'}
                    `}
                                    >
                                        <Icon className={`w-8 h-8 mb-2 ${isSelected ? 'opacity-100' : 'opacity-70'}`} />
                                        <span className={`text-xs font-medium ${isSelected ? 'opacity-100' : 'opacity-70'}`}>
                                            {emotion.label}
                                        </span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Note Area */}
                    <div className="space-y-4">
                        <label className="block text-sm font-medium text-slate-700">
                            오늘 하루는 어땠나요? (선택)
                        </label>
                        <textarea
                            value={note}
                            onChange={(e) => setNote(e.target.value)}
                            placeholder="짧은 일기나 감정을 자유롭게 적어주세요..."
                            className="w-full h-32 p-4 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none transition-all"
                        />
                    </div>

                    <Button type="submit" className="w-full" size="lg" isLoading={isSubmitting}>
                        기록 저장하기
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default DailyRecord;
