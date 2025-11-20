import React from 'react';
import { auth } from '../services/firebase';
import Button from '../components/Button';

const Dashboard = () => {
    const handleLogout = () => {
        auth.signOut();
    };

    return (
        <div className="min-h-screen bg-slate-50 p-8">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-slate-900">나의 대시보드</h1>
                    <Button variant="outline" onClick={handleLogout}>로그아웃</Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                        <h3 className="text-lg font-semibold mb-4">오늘의 마음 기록</h3>
                        <p className="text-slate-500">아직 기록된 내용이 없습니다.</p>
                        <Button className="mt-4 w-full" onClick={() => window.location.href = '/record'}>기록하기</Button>
                    </div>
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                        <h3 className="text-lg font-semibold mb-4">나의 심리 DNA</h3>
                        <p className="text-slate-500">프로파일링 결과가 여기에 표시됩니다.</p>
                        <Button variant="outline" className="mt-4 w-full" onClick={() => window.location.href = '/group/report'}>리포트 보기 (예시)</Button>
                    </div>
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                        <h3 className="text-lg font-semibold mb-4">소속 그룹</h3>
                        <p className="text-slate-500">참여 중인 그룹이 없습니다.</p>
                        <Button variant="secondary" className="mt-4 w-full" onClick={() => window.location.href = '/group/create'}>그룹 만들기</Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
