import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Onboarding from './pages/Onboarding';
import Dashboard from './pages/Dashboard';
import DailyRecord from './pages/DailyRecord';
import GroupCreate from './pages/GroupCreate';
import ChatConsultation from './pages/ChatConsultation';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/onboarding"
            element={
              <ProtectedRoute>
                <Onboarding />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute requireOnboarding>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/daily-record"
            element={
              <ProtectedRoute requireOnboarding>
                <DailyRecord />
              </ProtectedRoute>
            }
          />
          <Route
            path="/group/create"
            element={
              <ProtectedRoute requireOnboarding>
                <GroupCreate />
              </ProtectedRoute>
            }
          />
          <Route
            path="/chat"
            element={
              <ProtectedRoute requireOnboarding>
                <ChatConsultation />
              </ProtectedRoute>
            }
          />
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;

