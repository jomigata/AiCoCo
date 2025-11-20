import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import { ArrowLeft, TrendingUp, Heart, MessageCircle, Shield } from 'lucide-react';

const GroupReport = () => {
    const navigate = useNavigate();

    // Mock Data for visualization
    const reportData = {
        groupName: '우리 가족 사랑해',
        period: '11월 3주차',
        overallScore: 85,
        dimensions: [
            { label: '의사소통', score: 90, icon: MessageCircle, color: 'bg-blue-500' },
            { label: '신뢰도', score: 80, icon: Shield, color: 'bg-green-500' },
            { label: '친밀감', score: 85, icon: Heart, color: 'bg-rose-500' },
            { label: '공동목표', score: 70, icon: TrendingUp, color: 'bg-purple-500' },
        ],
        aiInsight: "이번 주는 가족 간의 대화가 활발했던 한 주였습니다. 특히 주말에 함께 시간을 보낸 것이 친밀감 상승에 큰 도움이 되었습니다. 다만, 서로의 개인적인 목표에 대해서는 조금 더 관심을 가져주는 것이 좋겠습니다.",
        recommendations: [
            "이번 주말에는 다 같이 산책을 해보세요.",
            "서로에게 '고마워'라고 말하는 시간을 가져보세요."
        ]
    };

    return (
        <div className="min-h-screen bg-slate-50 p-4 sm:p-8">
            <div className="max-w-3xl mx-auto">
                {/* Header */}
                <div className="flex items-center mb-8">
                    <button onClick={() => navigate(-1)} className="mr-4 p-2 hover:bg-slate-200 rounded-full transition-colors">
                        <ArrowLeft className="w-6 h-6 text-slate-600" />
                    </button>
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900">{reportData.groupName} 리포트</h1>
                        <p className="text-slate-500">{reportData.period} 분석 결과</p>
                    </div>
                </div>

                {/* Overall Score Card */}
                <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8 mb-6 flex flex-col items-center justify-center text-center">
                    <h2 className="text-lg font-semibold text-slate-600 mb-4">종합 관계 건강도</h2>
                    <div className="relative w-40 h-40 flex items-center justify-center">
                        <svg className="w-full h-full transform -rotate-90">
                            <circle
                                cx="80"
                                cy="80"
                                r="70"
                                stroke="currentColor"
                                strokeWidth="12"
                                fill="transparent"
                                className="text-slate-100"
                            />
                            <circle
                                cx="80"
                                cy="80"
                                r="70"
                                stroke="currentColor"
                                strokeWidth="12"
                                fill="transparent"
                                strokeDasharray={440}
                                strokeDashoffset={440 - (440 * reportData.overallScore) / 100}
                                className="text-indigo-600 transition-all duration-1000 ease-out"
                            />
                        </svg>
                        <div className="absolute flex flex-col items-center">
                            <span className="text-4xl font-bold text-slate-900">{reportData.overallScore}</span>
                            <span className="text-sm text-slate-500">점</span>
                        </div>
                    </div>
                    <p className="mt-4 text-slate-600 max-w-md">
                        지난주보다 <span className="text-green-600 font-bold">5점 상승</span>했습니다! 관계가 긍정적인 방향으로 발전하고 있어요.
                    </p>
                </div>

                {/* Dimension Analysis */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                    {reportData.dimensions.map((dim) => {
                        const Icon = dim.icon;
                        return (
                            <div key={dim.label} className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
                                <div className="flex items-center mb-4">
                                    <div className={`p-2 rounded-lg ${dim.color} bg-opacity-10 mr-3`}>
                                        <Icon className={`w-5 h-5 ${dim.color.replace('bg-', 'text-')}`} />
                                    </div>
                                    <span className="font-semibold text-slate-700">{dim.label}</span>
                                    <span className="ml-auto font-bold text-slate-900">{dim.score}점</span>
                                </div>
                                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                                    <div
                                        className={`h-full ${dim.color} transition-all duration-1000`}
                                        style={{ width: `${dim.score}%` }}
                                    />
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* AI Insight */}
                <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-8 mb-6 border border-indigo-100">
                    <h3 className="text-lg font-bold text-indigo-900 mb-3 flex items-center">
                        <span className="mr-2">✨</span> CoCo AI의 분석
                    </h3>
                    <p className="text-indigo-800 leading-relaxed">
                        {reportData.aiInsight}
                    </p>
                </div>

                {/* Recommendations */}
                <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8">
                    <h3 className="text-lg font-bold text-slate-900 mb-4">이번 주 추천 활동</h3>
                    <ul className="space-y-3">
                        {reportData.recommendations.map((rec, index) => (
                            <li key={index} className="flex items-start">
                                <span className="flex-shrink-0 w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-sm font-bold mr-3 mt-0.5">
                                    {index + 1}
                                </span>
                                <span className="text-slate-700">{rec}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default GroupReport;
