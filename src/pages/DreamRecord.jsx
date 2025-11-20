import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import { ArrowLeft, Moon, Sparkles } from 'lucide-react';

const DreamRecord = () => {
    const navigate = useNavigate();
    const [dreamContent, setDreamContent] = useState('');
    const [interpretation, setInterpretation] = useState('');
    const [isAnalyzing, setIsAnalyzing] = useState(false);

    const handleAnalyze = (e) => {
        e.preventDefault();
        if (!dreamContent) return;

        setIsAnalyzing(true);
        // Mock AI Analysis
        setTimeout(() => {
            setInterpretation(
                "당신의 꿈은 현재 겪고 있는 '변화'에 대한 무의식적인 불안과 기대를 동시에 보여주고 있습니다. " +
                "특히 등장한 상징물은 새로운 시작을 의미하며, 이는 곧 좋은 기회가 찾아올 것임을 암시합니다. " +
                "현실에서도 조금 더 용기를 내어 새로운 시도를 해보시는 것이 좋겠습니다."
            );
            setIsAnalyzing(false);
        }, 2000);
    };

    return (
        <div className="min-h-screen bg-indigo-950 text-indigo-50 p-4 sm:p-8">
            <div className="max-w-2xl mx-auto">
                <div className="flex items-center mb-8">
                    <button onClick={() => navigate(-1)} className="mr-4 p-2 hover:bg-indigo-900 rounded-full transition-colors">
                        <ArrowLeft className="w-6 h-6" />
                    </button>
                    <h1 className="text-2xl font-bold flex items-center">
                        <Moon className="w-6 h-6 mr-2 text-yellow-300" />
                        꿈 기록 & AI 해몽
                    </h1>
                </div>

                <div className="bg-indigo-900/50 rounded-2xl p-6 border border-indigo-800 backdrop-blur-sm mb-6">
                    <p className="text-indigo-200 mb-4">
                        어젯밤 꾸었던 꿈을 자세히 들려주세요. <br />
                        CoCo AI가 꿈 속에 숨겨진 심리학적 의미를 분석해 드립니다.
                    </p>
                    <textarea
                        value={dreamContent}
                        onChange={(e) => setDreamContent(e.target.value)}
                        placeholder="예: 넓은 바다에서 수영을 하는데 갑자기 고래가 나타나서 나를 태우고 하늘로 날아올랐어요..."
                        className="w-full h-40 p-4 rounded-xl bg-indigo-950/50 border border-indigo-700 text-white placeholder-indigo-400 focus:ring-2 focus:ring-yellow-400 focus:border-transparent resize-none transition-all"
                    />
                    <div className="mt-4 flex justify-end">
                        <Button
                            onClick={handleAnalyze}
                            isLoading={isAnalyzing}
                            className="bg-yellow-400 text-indigo-950 hover:bg-yellow-300 border-none"
                        >
                            <Sparkles className="w-4 h-4 mr-2" />
                            꿈 분석하기
                        </Button>
                    </div>
                </div>

                {interpretation && (
                    <div className="bg-gradient-to-br from-indigo-800 to-purple-900 rounded-2xl p-8 border border-indigo-600 shadow-xl animate-fade-in">
                        <h3 className="text-lg font-bold text-yellow-300 mb-4 flex items-center">
                            <Sparkles className="w-5 h-5 mr-2" />
                            AI 해몽 결과
                        </h3>
                        <p className="text-indigo-100 leading-relaxed text-lg">
                            {interpretation}
                        </p>
                        <div className="mt-6 pt-6 border-t border-indigo-700/50 text-sm text-indigo-400">
                            * 이 분석은 심리학적 상징을 기반으로 하며, 재미와 참고용으로만 활용해 주세요.
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default DreamRecord;
