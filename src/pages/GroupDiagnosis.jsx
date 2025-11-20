import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { doc, getDoc, updateDoc, arrayUnion } from 'firebase/firestore';
import { auth, db } from '../services/firebase';
import { groupDiagnosisQuestions } from '../data/groupDiagnosisData';
import Button from '../components/Button';
import { motion, AnimatePresence } from 'framer-motion';

const GroupDiagnosis = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const groupId = searchParams.get('groupId');
    const [groupType, setGroupType] = useState(null);
    const [currentStep, setCurrentStep] = useState(0);
    const [answers, setAnswers] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchGroupType = async () => {
            if (!groupId) return;
            try {
                const groupDoc = await getDoc(doc(db, 'groups', groupId));
                if (groupDoc.exists()) {
                    setGroupType(groupDoc.data().type);
                }
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchGroupType();
    }, [groupId]);

    if (isLoading) return <div className="p-8 text-center">로딩 중...</div>;
    if (!groupType) return <div className="p-8 text-center">그룹 정보를 찾을 수 없습니다.</div>;

    const questions = groupDiagnosisQuestions[groupType] || [];
    const currentQuestion = questions[currentStep];
    const totalSteps = questions.length;

    const handleAnswer = (value) => {
        setAnswers(prev => ({ ...prev, [currentQuestion.id]: value }));
    };

    const handleNext = async () => {
        if (!answers[currentQuestion.id]) {
            alert('답변을 선택해주세요.');
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

            // Save diagnosis result to Group document (or a subcollection)
            // For simplicity, we'll add it to a 'diagnosisResults' array in the group doc
            await updateDoc(doc(db, 'groups', groupId), {
                diagnosisResults: arrayUnion({
                    userId: user.uid,
                    userName: user.displayName,
                    answers: answers,
                    completedAt: new Date().toISOString()
                })
            });

            alert('진단이 완료되었습니다!');
            navigate('/');
        } catch (error) {
            console.error(error);
            alert('저장 실패: ' + error.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 p-4 flex items-center justify-center">
            <div className="max-w-2xl w-full bg-white rounded-2xl shadow-xl p-8">
                <div className="mb-8 text-center">
                    <span className="text-sm font-semibold text-indigo-600 tracking-wider uppercase">
                        Question {currentStep + 1} / {totalSteps}
                    </span>
                    <h2 className="mt-4 text-2xl font-bold text-slate-900">
                        {currentQuestion.text}
                    </h2>
                </div>

                <div className="space-y-4">
                    {currentQuestion.options.map((option) => (
                        <button
                            key={option.value}
                            onClick={() => handleAnswer(option.value)}
                            className={`w-full p-4 rounded-xl border-2 text-left transition-all ${answers[currentQuestion.id] === option.value
                                    ? 'border-indigo-600 bg-indigo-50 text-indigo-700 font-medium'
                                    : 'border-slate-100 hover:border-indigo-200 hover:bg-slate-50 text-slate-600'
                                }`}
                        >
                            {option.label}
                        </button>
                    ))}
                </div>

                <div className="mt-8 flex justify-end">
                    <Button onClick={handleNext} isLoading={isSubmitting} size="lg">
                        {currentStep === totalSteps - 1 ? '제출하기' : '다음'}
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default GroupDiagnosis;
