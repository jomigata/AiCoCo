import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Button from '../components/Button';
import Input from '../components/Input';
import { Heart } from 'lucide-react';

const Signup = () => {
  const [formData, setFormData] = useState({
    displayName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('비밀번호가 일치하지 않습니다');
      return;
    }

    if (formData.password.length < 6) {
      setError('비밀번호는 최소 6자 이상이어야 합니다');
      return;
    }

    setLoading(true);

    try {
      await signup(formData.email, formData.password, formData.displayName);
      navigate('/onboarding');
    } catch (err) {
      let errorMessage = '회원가입에 실패했습니다.';
      
      if (err.code === 'auth/configuration-not-found') {
        errorMessage = 'Firebase Authentication이 설정되지 않았습니다.\n\n해결 방법:\n1. Firebase Console 접속: https://console.firebase.google.com/project/aicoco-5f8e6/authentication\n2. "Sign-in method" 탭에서 "Email/Password" 활성화\n3. 페이지를 새로고침하고 다시 시도하세요.';
      } else if (err.code === 'auth/email-already-in-use') {
        errorMessage = '이미 사용 중인 이메일입니다.';
      } else if (err.code === 'auth/invalid-email') {
        errorMessage = '유효하지 않은 이메일 주소입니다.';
      } else if (err.code === 'auth/weak-password') {
        errorMessage = '비밀번호가 너무 약합니다. 더 강한 비밀번호를 사용하세요.';
      } else if (err.code === 'auth/operation-not-allowed') {
        errorMessage = '이메일/비밀번호 인증이 활성화되지 않았습니다.';
      } else if (err.message) {
        errorMessage = err.message;
      }
      
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-600 rounded-2xl mb-4">
            <Heart className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            WizCoCo - CoCo Ai
          </h1>
          <p className="text-gray-600">
            새로운 여정을 시작하세요
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">회원가입</h2>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm whitespace-pre-line">
              {error}
              {error.includes('Firebase Authentication이 설정되지 않았습니다') && (
                <div className="mt-3 pt-3 border-t border-red-200">
                  <a 
                    href="https://console.firebase.google.com/project/aicoco-5f8e6/authentication/providers" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-indigo-600 hover:text-indigo-700 underline font-medium"
                  >
                    → Firebase Console에서 바로 설정하기
                  </a>
                </div>
              )}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="이름"
              name="displayName"
              type="text"
              value={formData.displayName}
              onChange={handleChange}
              required
              placeholder="홍길동"
            />

            <Input
              label="이메일"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="your@email.com"
            />

            <Input
              label="비밀번호"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="최소 6자 이상"
              helperText="비밀번호는 최소 6자 이상이어야 합니다"
            />

            <Input
              label="비밀번호 확인"
              name="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              placeholder="비밀번호를 다시 입력하세요"
            />

            <Button
              type="submit"
              className="w-full"
              disabled={loading}
            >
              {loading ? '가입 중...' : '회원가입'}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              이미 계정이 있으신가요?{' '}
              <Link to="/login" className="text-indigo-600 hover:text-indigo-700 font-medium">
                로그인
              </Link>
            </p>
          </div>
        </div>

        <div className="mt-6 text-center">
          <p className="text-xs text-gray-500">
            AI의 편향된 분석이나 충분치 않은 정보로 인한 잘못된 정보일 가능성이 있습니다.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;

