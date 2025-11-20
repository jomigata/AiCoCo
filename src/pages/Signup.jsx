import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../services/firebase';
import Button from '../components/Button';
import Input from '../components/Input';

const Signup = () => {
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors }, watch } = useForm();
    const password = watch("password");

    const onSubmit = async (data) => {
        setIsLoading(true);
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password);
            await updateProfile(userCredential.user, {
                displayName: data.name
            });
            // TODO: Create user document in Firestore
            navigate('/onboarding');
        } catch (error) {
            console.error(error);
            alert("회원가입 실패: " + error.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-2xl shadow-xl shadow-slate-200/50">
                <div className="text-center">
                    <h2 className="mt-6 text-3xl font-extrabold text-slate-900 tracking-tight">
                        회원가입
                    </h2>
                    <p className="mt-2 text-sm text-slate-600">
                        WizCoCo와 함께 마음 여행을 시작하세요
                    </p>
                </div>

                <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
                    <div className="space-y-4">
                        <Input
                            label="이름"
                            placeholder="홍길동"
                            error={errors.name?.message}
                            {...register('name', { required: '이름을 입력해주세요' })}
                        />
                        <Input
                            label="이메일"
                            type="email"
                            placeholder="name@example.com"
                            error={errors.email?.message}
                            {...register('email', {
                                required: '이메일을 입력해주세요',
                                pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                    message: "유효한 이메일 주소가 아닙니다"
                                }
                            })}
                        />
                        <Input
                            label="비밀번호"
                            type="password"
                            placeholder="••••••••"
                            error={errors.password?.message}
                            {...register('password', {
                                required: '비밀번호를 입력해주세요',
                                minLength: {
                                    value: 6,
                                    message: "비밀번호는 최소 6자 이상이어야 합니다"
                                }
                            })}
                        />
                        <Input
                            label="비밀번호 확인"
                            type="password"
                            placeholder="••••••••"
                            error={errors.passwordConfirm?.message}
                            {...register('passwordConfirm', {
                                required: '비밀번호를 다시 입력해주세요',
                                validate: value => value === password || "비밀번호가 일치하지 않습니다"
                            })}
                        />
                    </div>

                    <Button type="submit" className="w-full" isLoading={isLoading}>
                        가입하기
                    </Button>
                </form>

                <p className="text-center text-sm text-slate-600">
                    이미 계정이 있으신가요?{' '}
                    <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
                        로그인
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Signup;
