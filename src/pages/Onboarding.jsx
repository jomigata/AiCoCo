import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../services/firebase';
import { doc, setDoc } from 'firebase/firestore';
import Button from '../components/Button';
import { onboardingData } from '../data/onboardingData';
import { ChevronRight, ChevronLeft, Sparkles } from 'lucide-react';

const Onboarding = () => {
    const [currentStep, setCurrentStep] = useState(0);
    const [answers, setAnswers] = useState({});
    const navigate = useNavigate();
    const user = auth.currentUser;

    const currentQuestion = onboardingData[currentStep];
    const progress = ((currentStep + 1) / onboardingData.length) * 100;

    const handleAnswer = (value) => {
        setAnswers({ ...answers, [currentQuestion.id]: value });
    };

    const handleNext = async () => {
        if (currentStep < onboardingData.length - 1) {
            setCurrentStep(currentStep + 1);
        } else {
            // Save to Firestore
            try {
                await setDoc(doc(db, 'users', user.uid), {
                    name: user.displayName,
                    email: user.email,
                    onboardingAnswers: answers,
                    createdAt: new Date()
                });
                navigate('/');
            } catch (error) {
                console.error('Error saving onboarding data:', error);
            }
        }
    };

    const handleBack = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
        }
    };

    const isAnswered = answers[currentQuestion?.id] !== undefined;

    return (
        <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 relative overflow-hidden">
            {/* Big background decorations */}
            <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary-100 rounded-full blur-3xl opacity-40"></div>
            <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-secondary-100 rounded-full blur-3xl opacity-40"></div>

            <div className="relative z-10 max-w-3xl mx-auto p-6 sm:p-12">
                {/* Header */}
                <div className="text-center mb-12 animate-fade-in">
                    <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full border border-primary-100 shadow-sm">
                        <Sparkles className="w-4 h-4 text-primary-500" />
                        <span className="text-sm font-medium text-primary-700">프로파일링 진행 중</span>
                    </div>
                    <h1 className="text-4xl font-bold text-slate-900 mb-3">당신을 알아가는 시간</h1>
                    <p className="text-slate-500 text-lg">솔직한 답변이 더 정확한 분석의 시작입니다</p>
                </div>

                {/* Progress Bar */}
                <div className="mb-12">
                    <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium text-slate-600">진행률</span>
                        <span className="text-sm font-bold text-primary-600">{Math.round(progress)}%</span>
                    </div>
                    <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full transition-all duration-500 ease-out"
                            style={{ width: `${progress}%` }}
                        ></div>
                    </div>
                    <div className="flex justify-between mt-2 text-xs text-slate-400">
                        <span>질문 {currentStep + 1}</span>
                        <span>총 {onboardingData.length}개</span>
                    </div>
                </div>

                {/* Question Card */}
                <div className="glass-panel p-8 sm:p-12 rounded-3xl mb-8 animate-slide-up">
                    <div className="mb-8">
                        <div className="text-sm font-medium text-primary-600 mb-2">{currentQuestion?.category}</div>
                        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 leading-tight">{currentQuestion?.question}</h2>
                    </div>

                    <div className="space-y-3">
                        {currentQuestion?.options.map((option, index) => (
                            <button
                                key={index}
                                onClick={() => handleAnswer(option.value)}
                                className={`w-full p-5 rounded-2xl text-left transition-all duration-200 border-2 ${answers[currentQuestion.id] === option.value
                                        ? 'bg-primary-50 border-primary-500 shadow-md transform scale-[1.02]'
                                        : 'bg-white border-slate-200 hover:border-primary-300 hover:bg-slate-50'
                                    }`}
                            >
                                <div className="flex items-center justify-between">
                                    <span className="font-medium text-slate-800">{option.label}</span>
                                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${answers[currentQuestion.id] === option.value
                                            ? 'border-primary-500 bg-primary-500'
                                            : 'border-slate-300'
                                        }`}>
                                        {answers[currentQuestion.id] === option.value && (
                                            <div className="w-2 h-2 bg-white rounded-full"></div>
                                        )}
                                    </div>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Navigation */}
                <div className="flex justify-between gap-4">
                    <Button
                        variant="ghost"
                        onClick={handleBack}
                        disabled={currentStep === 0}
                        className="flex-shrink-0"
                    >
                        <ChevronLeft className="w-5 h-5 mr-1" />
                        이전
                    </Button>
                    <Button
                        onClick={handleNext}
                        disabled={!isAnswered}
                        className="flex-1 sm:flex-none sm:px-12"
                    >
                        {currentStep === onboardingData.length - 1 ? '완료하기' : '다음'}
                        <ChevronRight className="w-5 h-5 ml-1" />
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default Onboarding;
