import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, PlayCircle, BookOpen, Headphones } from 'lucide-react';

const ContentLibrary = () => {
    const navigate = useNavigate();

    const contents = [
        {
            category: '명상 가이드',
            items: [
                { title: '하루를 시작하는 5분 명상', duration: '5:00', type: 'audio' },
                { title: '불안을 잠재우는 호흡법', duration: '10:00', type: 'audio' },
                { title: '깊은 잠을 위한 수면 명상', duration: '20:00', type: 'audio' }
            ]
        },
        {
            category: '심리학 아티클',
            items: [
                { title: '번아웃 증후군, 어떻게 대처할까?', readTime: '5분', type: 'article' },
                { title: '건강한 대화를 위한 비폭력 대화법', readTime: '7분', type: 'article' },
                { title: '자존감을 높이는 작은 습관들', readTime: '4분', type: 'article' }
            ]
        }
    ];

    return (
        <div className="min-h-screen bg-slate-50 p-4 sm:p-8">
            <div className="max-w-4xl mx-auto">
                <div className="flex items-center mb-8">
                    <button onClick={() => navigate(-1)} className="mr-4 p-2 hover:bg-slate-200 rounded-full transition-colors">
                        <ArrowLeft className="w-6 h-6 text-slate-600" />
                    </button>
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900">마음 도서관</h1>
                        <p className="text-slate-500">당신의 마음을 위한 치유의 콘텐츠를 만나보세요.</p>
                    </div>
                </div>

                <div className="space-y-10">
                    {contents.map((section) => (
                        <div key={section.category}>
                            <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center">
                                {section.category === '명상 가이드' ? <Headphones className="w-6 h-6 mr-2 text-indigo-600" /> : <BookOpen className="w-6 h-6 mr-2 text-indigo-600" />}
                                {section.category}
                            </h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                                {section.items.map((item, idx) => (
                                    <div key={idx} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow cursor-pointer group">
                                        <div className="w-12 h-12 bg-indigo-50 rounded-full flex items-center justify-center mb-4 group-hover:bg-indigo-100 transition-colors">
                                            {item.type === 'audio' ? <PlayCircle className="w-6 h-6 text-indigo-600" /> : <BookOpen className="w-6 h-6 text-indigo-600" />}
                                        </div>
                                        <h3 className="font-bold text-slate-900 mb-2">{item.title}</h3>
                                        <p className="text-sm text-slate-500">
                                            {item.type === 'audio' ? `재생 시간: ${item.duration}` : `읽는 시간: ${item.readTime}`}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ContentLibrary;
