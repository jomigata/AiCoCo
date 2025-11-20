import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import { 
  Calendar, 
  Users, 
  Heart, 
  TrendingUp, 
  MessageCircle,
  LogOut 
} from 'lucide-react';

const Dashboard = () => {
  const { currentUser, userProfile, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Failed to logout:', error);
    }
  };

  const quickActions = [
    {
      title: '데일리 마음 기록',
      description: '오늘의 감정과 상태를 기록하세요',
      icon: Calendar,
      color: 'bg-blue-500',
      onClick: () => navigate('/daily-record'),
    },
    {
      title: '그룹 만들기',
      description: '새로운 그룹을 생성하세요',
      icon: Users,
      color: 'bg-purple-500',
      onClick: () => navigate('/group/create'),
    },
    {
      title: 'AI 상담 코코',
      description: '24시간 고민 상담',
      icon: MessageCircle,
      color: 'bg-pink-500',
      onClick: () => navigate('/chat'),
    },
    {
      title: '나의 성장 리포트',
      description: '감정 패턴과 성장 분석',
      icon: TrendingUp,
      color: 'bg-green-500',
      onClick: () => navigate('/reports'),
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              안녕하세요, {userProfile?.displayName || currentUser?.email}님
            </h1>
            <p className="text-gray-600 mt-1">
              오늘도 마음 건강을 챙기는 하루 되세요
            </p>
          </div>
          <Button
            variant="outline"
            onClick={handleLogout}
            className="flex items-center gap-2"
          >
            <LogOut className="w-4 h-4" />
            로그아웃
          </Button>
        </div>

        {/* Quick Actions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {quickActions.map((action, index) => {
            const Icon = action.icon;
            return (
              <button
                key={index}
                onClick={action.onClick}
                className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow text-left group"
              >
                <div className={`${action.color} w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {action.title}
                </h3>
                <p className="text-sm text-gray-600">
                  {action.description}
                </p>
              </button>
            );
          })}
        </div>

        {/* Stats Section */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">이번 주 요약</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-indigo-600 mb-2">0</div>
              <div className="text-sm text-gray-600">연속 기록일</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">0</div>
              <div className="text-sm text-gray-600">참여 그룹</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-pink-600 mb-2">0</div>
              <div className="text-sm text-gray-600">완료한 미션</div>
            </div>
          </div>
        </div>

        {/* AI Warning */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <p className="text-sm text-yellow-800">
            ⚠️ <strong>AI 분석 결과 안내:</strong> 모든 리포트와 분석 결과는 AI에 의해 생성되며, 
            편향된 분석이나 충분치 않은 정보로 인한 잘못된 정보일 가능성이 있습니다. 
            전문적인 심리 상담이 필요한 경우 전문가와 상담하시기 바랍니다.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

