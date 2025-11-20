import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Button from '../components/Button';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../services/firebase';
import { Heart, ArrowRight } from 'lucide-react';

const Onboarding = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    age: '',
    gender: '',
    relationshipStatus: '',
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      handleComplete();
    }
  };

  const handleComplete = async () => {
    setLoading(true);
    try {
      await updateDoc(doc(db, 'users', currentUser.uid), {
        onboardingCompleted: true,
        profile: formData,
        onboardingDate: new Date().toISOString(),
      });
      navigate('/dashboard');
    } catch (error) {
      console.error('Error completing onboarding:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">단계 {step} / 3</span>
              <span className="text-sm text-gray-500">개인 종합 프로파일링</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(step / 3) * 100}%` }}
              />
            </div>
          </div>

          {/* Step 1: Age */}
          {step === 1 && (
            <div>
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-100 rounded-full mb-4">
                  <Heart className="w-8 h-8 text-indigo-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  나이를 알려주세요
                </h2>
                <p className="text-gray-600">
                  연령대에 맞는 맞춤형 검사를 제공하기 위해 필요합니다
                </p>
              </div>

              <div className="space-y-3">
                {['10대', '20대', '30대', '40대', '50대', '60대 이상'].map((age) => (
                  <button
                    key={age}
                    onClick={() => {
                      setFormData({ ...formData, age });
                      setTimeout(() => setStep(2), 300);
                    }}
                    className="w-full p-4 text-left border-2 rounded-lg transition-all hover:border-indigo-500 hover:bg-indigo-50"
                  >
                    {age}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Gender */}
          {step === 2 && (
            <div>
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  성별을 선택해주세요
                </h2>
                <p className="text-gray-600">
                  개인화된 분석을 위해 필요합니다
                </p>
              </div>

              <div className="space-y-3">
                {['남성', '여성', '기타', '선택 안함'].map((gender) => (
                  <button
                    key={gender}
                    onClick={() => {
                      setFormData({ ...formData, gender });
                      setTimeout(() => setStep(3), 300);
                    }}
                    className="w-full p-4 text-left border-2 rounded-lg transition-all hover:border-indigo-500 hover:bg-indigo-50"
                  >
                    {gender}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 3: Relationship Status */}
          {step === 3 && (
            <div>
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  현재 관계 상태를 알려주세요
                </h2>
                <p className="text-gray-600">
                  그룹 기능 추천에 활용됩니다
                </p>
              </div>

              <div className="space-y-3 mb-6">
                {['싱글', '연인', '배우자', '가족', '친구', '기타'].map((status) => (
                  <button
                    key={status}
                    onClick={() => setFormData({ ...formData, relationshipStatus: status })}
                    className={`w-full p-4 text-left border-2 rounded-lg transition-all ${
                      formData.relationshipStatus === status
                        ? 'border-indigo-500 bg-indigo-50'
                        : 'hover:border-indigo-500 hover:bg-indigo-50'
                    }`}
                  >
                    {status}
                  </button>
                ))}
              </div>

              <Button
                onClick={handleComplete}
                disabled={!formData.relationshipStatus || loading}
                className="w-full flex items-center justify-center gap-2"
              >
                {loading ? '완료 중...' : '완료하기'}
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          )}

          {/* Navigation */}
          {step < 3 && step > 1 && (
            <div className="mt-6 flex gap-4">
              <Button
                variant="outline"
                onClick={() => setStep(step - 1)}
                className="flex-1"
              >
                이전
              </Button>
            </div>
          )}
        </div>

        {/* AI Warning */}
        <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <p className="text-xs text-yellow-800">
            ⚠️ AI의 편향된 분석이나 충분치 않은 정보로 인한 잘못된 정보일 가능성이 있습니다.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;

