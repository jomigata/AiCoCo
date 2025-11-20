import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import { ArrowLeft, Save } from 'lucide-react';

const DailyRecord = () => {
  const navigate = useNavigate();
  const [selectedEmotion, setSelectedEmotion] = useState('');
  const [mood, setMood] = useState('');
  const [note, setNote] = useState('');

  const emotions = [
    { emoji: '😊', label: '행복', value: 'happy' },
    { emoji: '😢', label: '슬픔', value: 'sad' },
    { emoji: '😰', label: '불안', value: 'anxious' },
    { emoji: '😡', label: '화남', value: 'angry' },
    { emoji: '😴', label: '피곤', value: 'tired' },
    { emoji: '😌', label: '평온', value: 'calm' },
    { emoji: '🤔', label: '고민', value: 'worried' },
    { emoji: '😍', label: '사랑', value: 'love' },
  ];

  const moods = ['매우 좋음', '좋음', '보통', '나쁨', '매우 나쁨'];

  const handleSave = () => {
    // TODO: Save to Firestore
    console.log({ selectedEmotion, mood, note });
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Button
          variant="ghost"
          onClick={() => navigate('/dashboard')}
          className="mb-6 flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          돌아가기
        </Button>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">데일리 마음 기록</h1>
          <p className="text-gray-600 mb-8">오늘의 감정과 상태를 기록하세요</p>

          {/* Emotion Selection */}
          <div className="mb-8">
            <label className="block text-sm font-medium text-gray-700 mb-4">
              오늘의 감정을 선택하세요
            </label>
            <div className="grid grid-cols-4 gap-4">
              {emotions.map((emotion) => (
                <button
                  key={emotion.value}
                  onClick={() => setSelectedEmotion(emotion.value)}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    selectedEmotion === emotion.value
                      ? 'border-indigo-500 bg-indigo-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="text-3xl mb-2">{emotion.emoji}</div>
                  <div className="text-sm text-gray-700">{emotion.label}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Mood Selection */}
          <div className="mb-8">
            <label className="block text-sm font-medium text-gray-700 mb-4">
              전체적인 기분은 어떠신가요?
            </label>
            <div className="flex gap-2">
              {moods.map((m) => (
                <button
                  key={m}
                  onClick={() => setMood(m)}
                  className={`flex-1 py-3 rounded-lg border-2 transition-all ${
                    mood === m
                      ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>

          {/* Note */}
          <div className="mb-8">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              오늘 하루를 한 줄로 기록해보세요 (선택사항)
            </label>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="오늘 하루 어떠셨나요?"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
              rows="4"
            />
          </div>

          <Button
            onClick={handleSave}
            disabled={!selectedEmotion || !mood}
            className="w-full flex items-center justify-center gap-2"
          >
            <Save className="w-4 h-4" />
            기록 저장하기
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

export default DailyRecord;

