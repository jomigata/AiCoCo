import React from 'react';

const Onboarding = () => {
    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center">
            <div className="text-center">
                <h1 className="text-3xl font-bold text-slate-900 mb-4">환영합니다!</h1>
                <p className="text-slate-600">맞춤형 심리 케어를 위해 몇 가지 질문에 답해주세요.</p>
                {/* TODO: Implement multi-step profiling form */}
            </div>
        </div>
    );
};

export default Onboarding;
