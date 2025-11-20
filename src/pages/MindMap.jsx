import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import { ArrowLeft, Brain, Activity, Heart, Zap } from 'lucide-react';

const MindMap = () => {
    const navigate = useNavigate();

    // Mock Data
    const traits = [
        { label: '자아존중감', score: 85, color: 'bg-rose-500', icon: Heart },
        { label: '스트레스 회복력', score: 60, color: 'bg-orange-500', icon: Activity },
        { label: '공감 능력', score: 92, color: 'bg-blue-500', icon: Brain },
        { label: '실행력', score: 75, color: 'bg-yellow-500', icon: Zap },
    ];

    return (
        <div className="min-h-screen bg-slate-50 p-4 sm:p-8">
            <div className="max-w-4xl mx-auto">
                <div className="flex items-center mb-8">
                    <button onClick={() => navigate(-1)} className="mr-4 p-2 hover:bg-slate-200 rounded-full transition-colors">
                        <ArrowLeft className="w-6 h-6 text-slate-600" />
                    </button>
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900">나의 마음 지도 (Mind Map)</h1>
                        <p className="text-slate-500">나의 심리 DNA를 시각적으로 확인해보세요.</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Radar Chart Simulation */}
                    <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center justify-center aspect-square relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 to-white z-0"></div>
                        <div className="relative z-10 w-full h-full flex items-center justify-center">
                            {/* Simple CSS visualization for Mind Map */}
                            <div className="relative w-64 h-64">
                                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full border-2 border-slate-100 rounded-full"></div>
                                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2/3 h-2/3 border-2 border-slate-100 rounded-full"></div>
                                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1/3 h-1/3 border-2 border-slate-100 rounded-full"></div>

                                {/* Trait Points (Mock positioning) */}
                                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                                    <span className="bg-rose-100 text-rose-600 text-xs font-bold px-2 py-1 rounded-full mb-1">자아존중감</span>
                                    <div className="w-4 h-4 bg-rose-500 rounded-full shadow-lg ring-4 ring-white"></div>
                                </div>
                                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 flex flex-col-reverse items-center">
                                    <span className="bg-blue-100 text-blue-600 text-xs font-bold px-2 py-1 rounded-full mt-1">공감 능력</span>
                                    <div className="w-4 h-4 bg-blue-500 rounded-full shadow-lg ring-4 ring-white"></div>
                                </div>
                                <div className="absolute left-0 top-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-row-reverse items-center">
                                    <span className="bg-orange-100 text-orange-600 text-xs font-bold px-2 py-1 rounded-full mr-1">회복력</span>
                                    <div className="w-4 h-4 bg-orange-500 rounded-full shadow-lg ring-4 ring-white"></div>
                                </div>
                                <div className="absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2 flex flex-row items-center">
                                    <span className="bg-yellow-100 text-yellow-600 text-xs font-bold px-2 py-1 rounded-full ml-1">실행력</span>
                                    <div className="w-4 h-4 bg-yellow-500 rounded-full shadow-lg ring-4 ring-white"></div>
                                </div>

                                {/* Connecting Lines (SVG) */}
                                <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible">
                                    <polygon points="128,10 240,128 128,246 20,128" fill="rgba(99, 102, 241, 0.2)" stroke="#6366f1" strokeWidth="2" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    {/* Details Card */}
                    <div className="space-y-6">
                        {traits.map((trait) => {
                            const Icon = trait.icon;
                            return (
                                <div key={trait.label} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                                    <div className="flex items-center mb-3">
                                        <div className={`p-2 rounded-lg ${trait.color} bg-opacity-10 mr-3`}>
                                            <Icon className={`w-5 h-5 ${trait.color.replace('bg-', 'text-')}`} />
                                        </div>
                                        <h3 className="font-bold text-slate-800">{trait.label}</h3>
                                        <span className="ml-auto font-bold text-2xl text-slate-900">{trait.score}</span>
                                    </div>
                                    <div className="w-full bg-slate-100 rounded-full h-2">
                                        <div
                                            className={`h-2 rounded-full ${trait.color}`}
                                            style={{ width: `${trait.score}%` }}
                                        ></div>
                                    </div>
                                    <p className="text-sm text-slate-500 mt-3">
                                        {trait.score > 80 ? '매우 뛰어난 강점입니다!' : trait.score > 60 ? '평균적인 수준입니다.' : '조금 더 관심이 필요해요.'}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MindMap;
