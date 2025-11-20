import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import { ArrowLeft, Send, Bot, User, Sparkles } from 'lucide-react';

const ChatConsultation = () => {
    const navigate = useNavigate();
    const messagesEndRef = useRef(null);
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState([
        {
            id: 1,
            sender: 'ai',
            text: '안녕하세요! 당신의 마음을 듣고 공감하는 AI 상담사 CoCo입니다. 오늘 하루는 어떠셨나요? 편하게 이야기해 주세요.',
            timestamp: new Date()
        }
    ]);
    const [isTyping, setIsTyping] = useState(false);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSend = async (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        const userMessage = {
            id: Date.now(),
            sender: 'user',
            text: input,
            timestamp: new Date()
        };

        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsTyping(true);

        setTimeout(() => {
            const aiMessage = {
                id: Date.now() + 1,
                sender: 'ai',
                text: generateMockResponse(userMessage.text),
                timestamp: new Date()
            };
            setMessages(prev => [...prev, aiMessage]);
            setIsTyping(false);
        }, 1500);
    };

    const generateMockResponse = (text) => {
        if (text.includes('힘들') || text.includes('우울')) {
            return '많이 힘드셨겠어요. 그런 감정이 드는 건 자연스러운 일이에요. 구체적으로 어떤 일이 마음을 무겁게 했는지 조금 더 들려주시겠어요?';
        } else if (text.includes('화나') || text.includes('짜증')) {
            return '화가 나는 상황이 있었군요. 감정을 억누르기보다 표현하는 것이 중요해요. 심호흡을 한번 하고, 그 상황을 다시 떠올려볼까요?';
        } else if (text.includes('행복') || text.includes('좋아')) {
            return '정말 다행이에요! 긍정적인 감정은 우리 마음의 면역력을 높여준답니다. 그 순간을 오래 기억할 수 있도록 기록해보는 건 어떨까요?';
        } else {
            return '그렇군요. 당신의 이야기를 더 듣고 싶어요. 언제든 편하게 말씀해 주세요. 저는 항상 여기 있습니다.';
        }
    };

    return (
        <div className="flex flex-col h-screen bg-gradient-to-br from-primary-50 to-white relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-secondary-100 rounded-full blur-3xl opacity-30 -z-10"></div>

            {/* Header */}
            <header className="glass-panel px-6 py-4 flex items-center z-10 border-b border-white/20">
                <button onClick={() => navigate(-1)} className="mr-4 p-2 hover:bg-white/50 rounded-full transition-colors">
                    <ArrowLeft className="w-6 h-6 text-slate-600" />
                </button>
                <div className="flex items-center flex-1">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-2xl flex items-center justify-center mr-3 shadow-lg">
                        <Bot className="w-7 h-7 text-white" />
                    </div>
                    <div>
                        <h1 className="font-bold text-slate-900 flex items-center gap-2">
                            CoCo 상담사
                            <Sparkles className="w-4 h-4 text-yellow-500" />
                        </h1>
                        <p className="text-xs text-green-500 flex items-center">
                            <span className="w-2 h-2 bg-green-500 rounded-full mr-1 animate-pulse"></span>
                            상담 가능
                        </p>
                    </div>
                </div>
            </header>

            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {messages.map((msg) => (
                    <div
                        key={msg.id}
                        className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'} animate-slide-up`}
                    >
                        <div className={`flex max-w-[80%] ${msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                            <div className={`w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0 mt-1 shadow-md
                ${msg.sender === 'user' ? 'bg-gradient-to-br from-slate-200 to-slate-300 ml-3' : 'bg-gradient-to-br from-primary-500 to-secondary-500 mr-3'}`}>
                                {msg.sender === 'user' ? <User className="w-5 h-5 text-slate-700" /> : <Bot className="w-5 h-5 text-white" />}
                            </div>
                            <div className={`p-5 rounded-3xl shadow-md
                ${msg.sender === 'user'
                                    ? 'bg-gradient-to-br from-primary-600 to-primary-500 text-white rounded-tr-sm'
                                    : 'bg-white text-slate-800 rounded-tl-sm border border-slate-100'}`}>
                                <p className="text-sm leading-relaxed">{msg.text}</p>
                                <span className={`text-xs mt-2 block ${msg.sender === 'user' ? 'text-primary-100' : 'text-slate-400'}`}>
                                    {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
                {isTyping && (
                    <div className="flex justify-start">
                        <div className="flex items-center bg-white border border-slate-100 rounded-3xl rounded-tl-sm p-5 ml-13 shadow-md">
                            <div className="flex space-x-1">
                                <div className="w-2 h-2 bg-primary-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                                <div className="w-2 h-2 bg-primary-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                                <div className="w-2 h-2 bg-primary-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                            </div>
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="glass-panel p-6 border-t border-white/20">
                <form onSubmit={handleSend} className="max-w-4xl mx-auto relative flex items-center gap-3">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="메시지를 입력하세요..."
                        className="flex-1 px-6 py-4 bg-white border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all shadow-sm"
                    />
                    <button
                        type="submit"
                        disabled={!input.trim()}
                        className="p-4 bg-gradient-to-r from-primary-600 to-primary-500 text-white rounded-2xl hover:from-primary-700 hover:to-primary-600 disabled:opacity-50 disabled:hover:from-primary-600 transition-all shadow-lg shadow-primary-500/30"
                    >
                        <Send className="w-5 h-5" />
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ChatConsultation;
