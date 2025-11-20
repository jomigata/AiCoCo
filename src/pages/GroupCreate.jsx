import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Button from '../components/Button';
import Input from '../components/Input';
import { ArrowLeft, Users } from 'lucide-react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../services/firebase';

const GroupCreate = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [groupName, setGroupName] = useState('');
  const [groupType, setGroupType] = useState('');
  const [selectedFeatures, setSelectedFeatures] = useState([]);
  const [loading, setLoading] = useState(false);

  const groupTypes = [
    { value: 'family', label: '가족', description: '가족 구성원들과 함께' },
    { value: 'couple', label: '연인/부부', description: '연인 또는 배우자와 함께' },
    { value: 'friends', label: '친구', description: '친구들과 함께' },
    { value: 'team', label: '회사 팀', description: '직장 동료들과 함께' },
    { value: 'other', label: '기타', description: '다른 목적의 그룹' },
  ];

  const features = [
    { id: 'communication', label: '의사소통 개선', description: '서로의 의사소통 방식을 이해하고 개선' },
    { id: 'conflict', label: '갈등 해결', description: '갈등 상황을 건강하게 해결하는 방법 학습' },
    { id: 'bonding', label: '유대감 강화', description: '서로의 감정을 공유하고 이해하기' },
    { id: 'growth', label: '함께 성장', description: '개인과 관계의 지속적인 성장' },
  ];

  const toggleFeature = (featureId) => {
    setSelectedFeatures((prev) =>
      prev.includes(featureId)
        ? prev.filter((id) => id !== featureId)
        : [...prev, featureId]
    );
  };

  const handleCreate = async () => {
    if (!groupName || !groupType) return;

    setLoading(true);
    try {
      const groupData = {
        name: groupName,
        type: groupType,
        features: selectedFeatures,
        createdBy: currentUser.uid,
        members: [currentUser.uid],
        createdAt: new Date().toISOString(),
        status: 'active',
      };

      await addDoc(collection(db, 'groups'), groupData);
      navigate('/dashboard');
    } catch (error) {
      console.error('Error creating group:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Button
          variant="ghost"
          onClick={() => navigate('/dashboard')}
          className="mb-6 flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          돌아가기
        </Button>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-indigo-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">그룹 만들기</h1>
              <p className="text-gray-600">함께 성장할 그룹을 만들어보세요</p>
            </div>
          </div>

          {/* Group Name */}
          <div className="mb-8">
            <Input
              label="그룹 이름"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
              placeholder="예: 우리 가족, 우리 커플 등"
              required
            />
          </div>

          {/* Group Type */}
          <div className="mb-8">
            <label className="block text-sm font-medium text-gray-700 mb-4">
              그룹 유형을 선택하세요
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {groupTypes.map((type) => (
                <button
                  key={type.value}
                  onClick={() => setGroupType(type.value)}
                  className={`p-4 text-left border-2 rounded-lg transition-all ${
                    groupType === type.value
                      ? 'border-indigo-500 bg-indigo-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="font-semibold text-gray-900">{type.label}</div>
                  <div className="text-sm text-gray-600 mt-1">{type.description}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Features */}
          <div className="mb-8">
            <label className="block text-sm font-medium text-gray-700 mb-4">
              그룹의 목표를 선택하세요 (복수 선택 가능)
            </label>
            <div className="space-y-3">
              {features.map((feature) => (
                <button
                  key={feature.id}
                  onClick={() => toggleFeature(feature.id)}
                  className={`w-full p-4 text-left border-2 rounded-lg transition-all ${
                    selectedFeatures.includes(feature.id)
                      ? 'border-indigo-500 bg-indigo-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-semibold text-gray-900">{feature.label}</div>
                      <div className="text-sm text-gray-600 mt-1">{feature.description}</div>
                    </div>
                    {selectedFeatures.includes(feature.id) && (
                      <div className="w-6 h-6 bg-indigo-600 rounded-full flex items-center justify-center">
                        <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>

          <Button
            onClick={handleCreate}
            disabled={!groupName || !groupType || loading}
            className="w-full"
          >
            {loading ? '생성 중...' : '그룹 만들기'}
          </Button>
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

export default GroupCreate;

