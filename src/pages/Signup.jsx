import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { auth } from '../services/firebase';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { useNavigate, Link } from 'react-router-dom';
import Button from '../components/Button';
import Input from '../components/Input';
import { Sparkles, Heart } from 'lucide-react';

const Signup = () => {
    const { register, handleSubmit, formState: { errors }, watch } = useForm();
    const [isLoading, setIsLoading] = useState(false);
    const [authError, setAuthError] = useState('');
    const navigate = useNavigate();
    const password = watch('password');

    const onSubmit = async (data) => {
        setIsLoading(true);
        setAuthError('');
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password);
            await updateProfile(userCredential.user, { displayName: data.name });
            navigate('/onboarding');
        } catch (error) {
            console.error(error);
            setAuthError('회원가입 중 오류가 발생했습니다. 다시 시도해주세요.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex bg-slate-50">
            {/* Left Side - Visual */}
            <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-secondary-500 to-primary-600 relative overflow-hidden items-center justify-center p-12">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1499728603263-13726abce5fd?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')] bg-cover bg-center opacity-20 mix-blend-overlay"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-secondary-600/90 to-primary-700/90"></div>

                <div className="relative z-10 max-w-lg text-white">
                    <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center mb-8 border border-white/20">
                        <Heart className="w-8 h-8 text-rose-200 fill-rose-200" />
                    </div>
                    <h1 className="text-5xl font-serif font-bold mb-6 leading-tight">
                        마음의 여정,<br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-200 to-blue-200">함께 시작해요</span>
                    </h1>
                    <p className="text-lg text-white/90 leading-relaxed mb-8">
                        당신만의 심리 케어 파트너, WizCoCo와 함께 더 건강하고 행복한 내일을 만들어가세요.
                    </p>
                    <div className="space-y-4 text-white/80">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                                <Sparkles className="w-4 h-4" />
                            </div>
                            <span>AI 기반 맞춤형 심리 분석</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                                <Sparkles className="w-4 h-4" />
                            </div>
                            <span>전문가와의 1:1 연결</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                                <Sparkles className="w-4 h-4" />
                            </div>
                            <span>소중한 관계를 위한 그룹 케어</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Side - Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12">
                <div className="w-full max-w-md space-y-8">
                    <div className="text-center lg:text-left">
                        <h2 className="text-3xl font-bold text-slate-900">회원가입</h2>
                        <p className="mt-2 text-slate-500">
                            이미 계정이 있으신가요? <Link to="/login" className="text-primary-600 hover:text-primary-700 font-medium">로그인하기</Link>
                        </p>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        <Input
                            label="이름"
                            type="text"
                            placeholder="홍길동"
                            error={errors.name?.message}
                            {...register('name', { required: '이름을 입력해주세요' })}
                        />

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
                            placeholder="8자 이상 입력하세요"
                            error={errors.password?.message}
                            {...register('password', {
                                required: '비밀번호를 입력해주세요',
                                minLength: { value: 6, message: '비밀번호는 최소 6자 이상이어야 합니다' }
                            })}
                        />

                        <Input
                            label="비밀번호 확인"
                            type="password"
                            placeholder="비밀번호를 다시 입력하세요"
                            error={errors.confirmPassword?.message}
                            {...register('confirmPassword', {
                                required: '비밀번호 확인을 입력해주세요',
                                validate: value => value === password || '비밀번호가 일치하지 않습니다'
                            })}
                        />

                        {authError && (
                            <div className="p-3 rounded-lg bg-red-50 text-red-600 text-sm">
                                {authError}
                            </div>
                        )}

                        <Button type="submit" className="w-full py-3 text-lg shadow-lg shadow-primary-500/20" isLoading={isLoading}>
                            시작하기
                        </Button>

                        <p className="text-xs text-center text-slate-500 mt-4">
                            회원가입 시 <span className="text-primary-600">서비스 이용약관</span> 및 <span className="text-primary-600">개인정보 처리방침</span>에 동의하게 됩니다.
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Signup;
