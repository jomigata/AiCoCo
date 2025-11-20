import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { auth } from '../services/firebase';
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { useNavigate, Link } from 'react-router-dom';
import Button from '../components/Button';
import Input from '../components/Input';
import { Sparkles, ArrowRight } from 'lucide-react';

const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [isLoading, setIsLoading] = useState(false);
    const [authError, setAuthError] = useState('');
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        setIsLoading(true);
        setAuthError('');
        try {
            await signInWithEmailAndPassword(auth, data.email, data.password);
            navigate('/');
        } catch (error) {
            console.error(error);
            setAuthError('이메일 또는 비밀번호를 확인해주세요.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleGoogleLogin = async () => {
        try {
            const provider = new GoogleAuthProvider();
            await signInWithPopup(auth, provider);
            navigate('/');
        } catch (error) {
            console.error(error);
            setAuthError('구글 로그인 중 오류가 발생했습니다.');
        }
    };

    return (
        <div className="min-h-screen flex bg-surface-50">
            {/* Left Side - Visual */}
            <div className="hidden lg:flex lg:w-1/2 bg-primary-900 relative overflow-hidden items-center justify-center p-12">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1499209974431-9dddcece7f88?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')] bg-cover bg-center opacity-40 mix-blend-overlay"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-primary-900/90 to-primary-800/90"></div>

                <div className="relative z-10 max-w-lg text-white">
                    <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center mb-8 border border-white/20">
                        <Sparkles className="w-8 h-8 text-yellow-300" />
                    </div>
                    <h1 className="text-5xl font-serif font-bold mb-6 leading-tight">
                        당신의 마음을 위한<br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-purple-200">지혜로운 여정</span>
                    </h1>
                    <p className="text-lg text-primary-100 leading-relaxed mb-8">
                        WizCoCo는 데이터와 공감을 통해 당신의 더 나은 내일을 함께 설계합니다.
                        지금 바로 시작해보세요.
                    </p>
                    <div className="flex gap-4">
                        <div className="flex -space-x-4">
                            {[1, 2, 3, 4].map(i => (
                                <div key={i} className="w-10 h-10 rounded-full bg-white/20 border-2 border-primary-900"></div>
                            ))}
                        </div>
                        <p className="text-sm text-primary-200 flex items-center">
                            <span className="font-bold text-white mr-1">1,200+</span> 명의 사용자가 함께하고 있습니다
                        </p>
                    </div>
                </div>
            </div>

            {/* Right Side - Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12">
                <div className="w-full max-w-md space-y-8">
                    <div className="text-center lg:text-left">
                        <h2 className="text-3xl font-bold text-slate-900">로그인</h2>
                        <p className="mt-2 text-slate-500">
                            계정이 없으신가요? <Link to="/signup" className="text-primary-600 hover:text-primary-700 font-medium">회원가입하기</Link>
                        </p>
                    </div>

                    <div className="space-y-4">
                        <Button
                            variant="outline"
                            className="w-full py-3 flex items-center justify-center gap-2 text-slate-700 hover:bg-slate-50"
                            onClick={handleGoogleLogin}
                        >
                            <svg className="w-5 h-5" viewBox="0 0 24 24">
                                <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                            </svg>
                            Google로 계속하기
                        </Button>

                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-slate-200"></div>
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-2 bg-surface-50 text-slate-500">또는 이메일로 로그인</span>
                            </div>
                        </div>

                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                            <Input
                                label="이메일"
                                type="email"
                                placeholder="name@example.com"
                                error={errors.email?.message}
                                {...register('email', { required: '이메일을 입력해주세요' })}
                            />

                            <Input
                                label="비밀번호"
                                type="password"
                                placeholder="••••••••"
                                error={errors.password?.message}
                                {...register('password', { required: '비밀번호를 입력해주세요' })}
                            />

                            {authError && (
                                <div className="p-3 rounded-lg bg-red-50 text-red-600 text-sm">
                                    {authError}
                                </div>
                            )}

                            <Button type="submit" className="w-full py-3 text-lg shadow-lg shadow-primary-500/20" isLoading={isLoading}>
                                로그인
                            </Button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
