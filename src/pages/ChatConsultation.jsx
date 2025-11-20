import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import { ArrowLeft, Send, Bot } from 'lucide-react';

const ChatConsultation = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: '안녕하세요! 저는 코코입니다. 마음 친구 코코라고 불러주세요. 😊\n\n무엇을 도와드릴까요?',
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      text: input,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    // Simulate AI response (TODO: Integrate with actual AI service)
    setTimeout(() => {
      const botResponse = {
        id: messages.length + 2,
        text: `고민을 들어주셔서 감사합니다. ${input}에 대해 생각해보니, 이런 상황에서는 자신의 감정을 인정하고 받아들이는 것이 중요합니다. 더 구체적으로 이야기해주시면 더 도움을 드릴 수 있을 것 같아요. 😊`,
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botResponse]);
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex flex-col">
      <div className="max-w-4xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-4">
        <Button
          variant="ghost"
          onClick={() => navigate('/dashboard')}
          className="mb-4 flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          돌아가기
        </Button>

        <div className="bg-white rounded-2xl shadow-xl flex flex-col" style={{ height: 'calc(100vh - 120px)' }}>
          {/* Header */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
                <Bot className="w-5 h-5 text-indigo-600" />
              </div>
              <div>
                <h1 className="text-xl font-semibold text-gray-900">마음 친구 코코</h1>
                <p className="text-sm text-gray-600">24시간 상담 가능</p>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                    message.sender === 'user'
                      ? 'bg-indigo-600 text-white'
                      : 'bg-gray-100 text-gray-900'
                  }`}
                >
                  <p className="whitespace-pre-wrap">{message.text}</p>
                  <p className={`text-xs mt-1 ${
                    message.sender === 'user' ? 'text-indigo-100' : 'text-gray-500'
                  }`}>
                    {message.timestamp.toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-gray-100 rounded-2xl px-4 py-3">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-6 border-t border-gray-200">
            <div className="flex gap-3">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && handleSend()}
                placeholder="메시지를 입력하세요..."
                className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
              <Button onClick={handleSend} disabled={!input.trim() || loading}>
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* AI Warning */}
        <div className="mt-4 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <p className="text-xs text-yellow-800">
            ⚠️ <strong>AI 상담 안내:</strong> 코코는 AI 챗봇으로, 전문적인 심리 상담을 대체할 수 없습니다. 
            심각한 정신 건강 문제가 있으시거나 전문가의 도움이 필요하시면 전문 상담사와 상담하시기 바랍니다.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChatConsultation;

