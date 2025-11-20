import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../services/firebase';
import { collection, addDoc } from 'firebase/firestore';
import Button from '../components/Button';
import { ArrowLeft, Save, Sparkles } from 'lucide-react';

const DailyRecord = () => {
    const navigate = useNavigate();
    const user = auth.currentUser;
    const [selectedEmotion, setSelectedEmotion] = useState('');
    const [diary, setDiary] = useState('');
    const [isSaving, setIsSaving] = useState(false);

    const emotions = [
        { emoji: '😊', label: '기쁨', value: 'happy', color: 'bg-yellow-50 hover:bg-yellow-100 border-yellow-300' },
        { emoji: '😢', label: '슬픔', value: 'sad', color: 'bg-blue-50 hover:bg-blue-100 border-blue-300' },
        { emoji: '😠', label: '화남', value: 'angry', color: 'bg-red-50 hover:bg-red-100 border-red-300' },
        { emoji: '😰', label: '불안', value: 'anxious', color: 'bg-purple-50 hover:bg-purple-100 border-purple-300' },
        { emoji: '😌', label: '평온', value: 'calm', color: 'bg-green-50 hover:bg-green-100 border-green-300' },
        { emoji: '🤔', label: '복잡함', value: 'confused', color: 'bg-slate-50 hover:bg-slate-100 border-slate-300' },
    ];

    const handleSave = async () => {
        if (!selectedEmotion || !diary.trim()) return;

        setIsSaving(true);
        try {
            await addDoc(collection(db, 'records'), {
                userId: user.uid,
                emotion: selectedEmotion,
                diary: diary,
                timestamp: new Date(),
            });
            navigate('/');
        } catch (error) {
            console.error('Error saving record:', error);
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-primary-50 to-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-72 h-72 bg-secondary-100 rounded-full blur-3xl opacity-50 -z-10"></div>

            <div className="max-w-3xl mx-auto p-6 sm:p-12">
                {/* Header */}
                <div className="flex items-center mb-8">
                    <button onClick={() => navigate(-1)} className="mr-4 p-2 hover:bg-white/50 rounded-full transition-colors">
                        <ArrowLeft className="w-6 h-6 text-slate-600" />
                    </button>
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <span className="bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-primary-600 border border-primary-100 shadow-sm">
                                {new Date().toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' })}
                            </span>
                        </div>
                        <h1 className="text-3xl font-bold text-slate-900">오늘의 마음 기록</h1>
                        <p className="text-slate-500 mt-1">지금 이 순간, 당신의 감정을 솔직하게 기록해보세요</p>
                    </div>
                </div>

                {/* Emotion Selector */}
                <div className="glass-panel p-8 rounded-3xl mb-6">
                    <div className="flex items-center gap-2 mb-6">
                        <Sparkles className="w-5 h-5 text-primary-500" />
                        <h3 className="text-lg font-bold text-slate-900">지금 기분이 어떠신가요?</h3>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                        {emotions.map((emotion) => (
                            <button
                                key={emotion.value}
                                onClick={() => setSelectedEmotion(emotion.value)}
                                className={`p-6 rounded-2xl border-2 transition-all duration-200 ${selectedEmotion === emotion.value
                                        ? `${emotion.color} transform scale-105 shadow-lg`
                                        : 'bg-white border-slate-200 hover:border-slate-300'
                                    }`}
                            >
                                <div className="text-5xl mb-2">{emotion.emoji}</div>
                                <div className="text-sm font-medium text-slate-700">{emotion.label}</div>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Diary */}
                <div className="glass-panel p-8 rounded-3xl mb-8">
                    <div className="flex items-center gap-2 mb-6">
                        <Sparkles className="w-5 h-5 text-primary-500" />
                        <h3 className="text-lg font-bold text-slate-900">오늘 하루를 돌아보며</h3>
                    </div>
                    <textarea
                        value={diary}
                        onChange={(e) => setDiary(e.target.value)}
                        placeholder="오늘 겪었던 일, 떠오르는 생각, 마음속 이야기를 자유롭게 적어보세요..."
                        className="w-full h-64 p-4 bg-white/50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none text-slate-800 placeholder-slate-400"
                    />
                    <div className="mt-4 flex justify-between items-center text-sm text-slate-500">
                        <span>{diary.length} / 2000자</span>
                        <span className="text-xs">💡 작성한 내용은 안전하게 보호됩니다</span>
                    </div>
                </div>

                {/* Save Button */}
                <Button
                    onClick={handleSave}
                    disabled={!selectedEmotion || !diary.trim()}
                    isLoading={isSaving}
                    className="w-full py-4 text-lg shadow-lg shadow-primary-500/20"
                >
                    <Save className="w-5 h-5 mr-2" />
                    기록 저장하기
                </Button>
            </div>
        </div>
    );
};

export default DailyRecord;
