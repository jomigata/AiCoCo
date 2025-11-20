import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Onboarding from './pages/Onboarding';
import Dashboard from './pages/Dashboard';
import DailyRecord from './pages/DailyRecord';
import GroupCreate from './pages/GroupCreate';
import GroupDiagnosis from './pages/GroupDiagnosis';
import GroupReport from './pages/GroupReport';

// Placeholder for ProtectedRoute
const ProtectedRoute = ({ children }) => {
  // TODO: Implement actual auth check
  const isAuthenticated = true;
  return isAuthenticated ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-slate-50 text-slate-900 font-sans antialiased selection:bg-indigo-100 selection:text-indigo-700">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/onboarding" element={
            <ProtectedRoute>
              <Onboarding />
            </ProtectedRoute>
          } />
          <Route path="/record" element={
            <ProtectedRoute>
              <DailyRecord />
            </ProtectedRoute>
          } />
          <Route path="/group/create" element={
            <ProtectedRoute>
              <GroupCreate />
            </ProtectedRoute>
          } />
          <Route path="/group/diagnosis" element={
            <ProtectedRoute>
              <GroupDiagnosis />
            </ProtectedRoute>
          } />
          <Route path="/group/report" element={
            <ProtectedRoute>
              <GroupReport />
            </ProtectedRoute>
          } />
          <Route path="/" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
