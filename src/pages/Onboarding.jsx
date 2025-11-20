import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../services/firebase';
import { onboardingQuestions } from '../data/onboardingData';
import Button from '../components/Button';

const Onboarding = () => {
    const navigate = useNavigate();
    const [currentStep, setCurrentStep] = useState(0);
    const [answers, setAnswers] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const currentCategory = onboardingQuestions[currentStep];
    const totalSteps = onboardingQuestions.length;

    const handleAnswer = (questionId, value) => {
        setAnswers(prev => ({ ...prev, [questionId]: value }));
    };

    const handleNext = async () => {
        // Validate current step
        const currentQuestions = currentCategory.questions;
        const allAnswered = currentQuestions.every(q => answers[q.id]);

        if (!allAnswered) {
            alert('모든 질문에 답변해주세요.');
            return;
        }

        if (currentStep < totalSteps - 1) {
            setCurrentStep(prev => prev + 1);
        } else {
            await handleSubmit();
        }
    };

    const handleSubmit = async () => {
        setIsSubmitting(true);
        try {
            const user = auth.currentUser;
            if (!user) throw new Error('로그인이 필요합니다.');

            // Save profile to Firestore
            await setDoc(doc(db, 'users', user.uid), {
                profileCompleted: true,
                onboardingAnswers: answers,
                completedAt: new Date().toISOString(),
                email: user.email,
                displayName: user.displayName
            }, { merge: true });

            navigate('/');
        } catch (error) {
            console.error(error);
            alert('저장 중 오류가 발생했습니다: ' + error.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
            <div className="max-w-2xl w-full bg-white rounded-2xl shadow-xl overflow-hidden">
                {/* Progress Bar */}
                <div className="h-2 bg-slate-100">
                    <div
                        className="h-full bg-indigo-600 transition-all duration-500 ease-out"
                        style={{ width: `${((currentStep + 1) / totalSteps) * 100}%` }}
                    />
                </div>

                <div className="p-8">
                    <div className="mb-8 text-center">
                        <span className="text-sm font-semibold text-indigo-600 tracking-wider uppercase">
                            Step {currentStep + 1} / {totalSteps}
                        </span>
                        <h2 className="mt-2 text-3xl font-bold text-slate-900">
                            {currentCategory.title}
                        </h2>
                    </div>

                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentStep}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.3 }}
                            className="space-y-8"
                        >
                            {currentCategory.questions.map((q) => (
                                <div key={q.id} className="space-y-4">
                                    <p className="text-lg font-medium text-slate-800">{q.text}</p>
                                    <div className="grid grid-cols-5 gap-2">
                                        {q.options.map((option) => (
                                            <button
                                                key={option.value}
                                                onClick={() => handleAnswer(q.id, option.value)}
                                                className={`
                          flex flex-col items-center justify-center p-3 rounded-xl border-2 transition-all duration-200
                          ${answers[q.id] === option.value
                                                        ? 'border-indigo-600 bg-indigo-50 text-indigo-700'
                                                        : 'border-slate-200 hover:border-indigo-200 hover:bg-slate-50 text-slate-600'}
                        `}
                                            >
                                                <span className="text-xl font-bold mb-1">{option.value}</span>
                                                <span className="text-xs text-center hidden sm:block">{option.label}</span>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </motion.div>
                    </AnimatePresence>

                    <div className="mt-10 flex justify-end">
                        <Button
                            onClick={handleNext}
                            isLoading={isSubmitting}
                            size="lg"
                            className="w-full sm:w-auto"
                        >
                            {currentStep === totalSteps - 1 ? '완료하기' : '다음으로'}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Onboarding;
