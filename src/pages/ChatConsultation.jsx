import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import { ArrowLeft, Send, Bot, User } from 'lucide-react';

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

        // Mock AI Response
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
        <div className="flex flex-col h-screen bg-slate-50">
            {/* Header */}
            <header className="bg-white shadow-sm p-4 flex items-center z-10">
                <button onClick={() => navigate(-1)} className="mr-4 p-2 hover:bg-slate-100 rounded-full transition-colors">
                    <ArrowLeft className="w-6 h-6 text-slate-600" />
                </button>
                <div className="flex items-center">
                    <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center mr-3">
                        <Bot className="w-6 h-6 text-indigo-600" />
                    </div>
                    <div>
                        <h1 className="font-bold text-slate-900">CoCo 상담사</h1>
                        <p className="text-xs text-green-500 flex items-center">
                            <span className="w-2 h-2 bg-green-500 rounded-full mr-1"></span>
                            상담 가능
                        </p>
                    </div>
                </div>
            </header>

            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((msg) => (
                    <div
                        key={msg.id}
                        className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                        <div className={`flex max-w-[80%] ${msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1 
                ${msg.sender === 'user' ? 'bg-slate-200 ml-2' : 'bg-indigo-100 mr-2'}`}>
                                {msg.sender === 'user' ? <User className="w-5 h-5 text-slate-600" /> : <Bot className="w-5 h-5 text-indigo-600" />}
                            </div>
                            <div className={`p-4 rounded-2xl shadow-sm 
                ${msg.sender === 'user'
                                    ? 'bg-indigo-600 text-white rounded-tr-none'
                                    : 'bg-white text-slate-800 rounded-tl-none border border-slate-100'}`}>
                                <p className="text-sm leading-relaxed">{msg.text}</p>
                                <span className={`text-xs mt-1 block opacity-70 ${msg.sender === 'user' ? 'text-indigo-200' : 'text-slate-400'}`}>
                                    {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
                {isTyping && (
                    <div className="flex justify-start">
                        <div className="flex items-center bg-white border border-slate-100 rounded-2xl rounded-tl-none p-4 ml-10 shadow-sm">
                            <div className="flex space-x-1">
                                <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                                <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                                <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                            </div>
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="bg-white p-4 border-t border-slate-100">
                <form onSubmit={handleSend} className="max-w-3xl mx-auto relative flex items-center">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="메시지를 입력하세요..."
                        className="w-full pl-4 pr-12 py-4 bg-slate-50 border border-slate-200 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                    />
                    <button
                        type="submit"
                        disabled={!input.trim()}
                        className="absolute right-2 p-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 disabled:opacity-50 disabled:hover:bg-indigo-600 transition-colors"
                    >
                        <Send className="w-5 h-5" />
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ChatConsultation;
