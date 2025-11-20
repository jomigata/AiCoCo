import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../services/firebase';
import Button from '../components/Button';
import Input from '../components/Input';
import { Mail, Lock, Github } from 'lucide-react'; // Using Github icon as placeholder for Google if needed, or just text

const Login = () => {
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = async (data) => {
        setIsLoading(true);
        try {
            await signInWithEmailAndPassword(auth, data.email, data.password);
            navigate('/');
        } catch (error) {
            console.error(error);
            alert("로그인 실패: " + error.message);
        } finally {
            setIsLoading(false);
        }
    };

    const handleGoogleLogin = async () => {
        setIsLoading(true);
        try {
            const provider = new GoogleAuthProvider();
            await signInWithPopup(auth, provider);
            navigate('/');
        } catch (error) {
            console.error(error);
            alert("구글 로그인 실패: " + error.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-2xl shadow-xl shadow-slate-200/50">
                <div className="text-center">
                    <h2 className="mt-6 text-3xl font-extrabold text-slate-900 tracking-tight">
                        WizCoCo
                    </h2>
                    <p className="mt-2 text-sm text-slate-600">
                        당신의 마음을 위한 지혜로운 동반자
                    </p>
                </div>

                <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
                    <div className="space-y-4">
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
                    </div>

                    <Button type="submit" className="w-full" isLoading={isLoading}>
                        로그인
                    </Button>
                </form>

                <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-slate-200" />
                    </div>
                    <div className="relative flex justify-center text-sm">
                        <span className="px-2 bg-white text-slate-500">또는</span>
                    </div>
                </div>

                <Button variant="outline" className="w-full" onClick={handleGoogleLogin} isLoading={isLoading}>
                    <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                        <path
                            fill="currentColor"
                            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                            className="text-blue-600"
                        />
                        <path
                            fill="currentColor"
                            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                            className="text-green-500"
                        />
                        <path
                            fill="currentColor"
                            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                            className="text-yellow-500"
                        />
                        <path
                            fill="currentColor"
                            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                            className="text-red-500"
                        />
                    </svg>
                    Google로 계속하기
                </Button>

                <p className="text-center text-sm text-slate-600">
                    계정이 없으신가요?{' '}
                    <Link to="/signup" className="font-medium text-indigo-600 hover:text-indigo-500">
                        회원가입
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
