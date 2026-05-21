import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import ReportLost from './pages/ReportLost';
import ReportFound from './pages/ReportFound';
import LostItems from './pages/LostItems';
import FoundItems from './pages/FoundItems';
import Login from './pages/Login';
import Home from './pages/Home';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import Register from './pages/Register';
import ItemDetails from './pages/ItemDetails';
import { clearAuth, getDashboardPath, getStoredUser, getToken } from './utils/auth';

// Protected Route with Role Verification
const ProtectedRoute = ({ children, allowedRole }) => {
  const token = getToken();
  const user = getStoredUser();
  const role = user ? user.role : null;

  if (!token || !user) {
    return <Navigate to="/login" replace />;
  }

  if (!['user', 'admin'].includes(role)) {
    clearAuth();
    return <Navigate to="/login" replace />;
  }

  if (role !== allowedRole) {
    return <Navigate to={getDashboardPath(role)} replace />;
  }

  return children;
};

const PublicRoute = ({ children }) => {
  const token = getToken();
  const user = getStoredUser();

  if (token && user?.role) {
    return <Navigate to={getDashboardPath(user.role)} replace />;
  }

  return children;
};

const App = () => {
  return (
    <Router>
      <div className="app-frame flex min-h-screen flex-col">
        <Navbar />
        <main className="flex-1 w-full">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
            <Route path="/admin-login" element={<PublicRoute><AdminLogin /></PublicRoute>} />
            <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />
            
            {/* User Protected Routes */}
            <Route path="/dashboard" element={<ProtectedRoute allowedRole="user"><Dashboard /></ProtectedRoute>} />
            <Route path="/lost" element={<ProtectedRoute allowedRole="user"><LostItems /></ProtectedRoute>} />
            <Route path="/found" element={<ProtectedRoute allowedRole="user"><FoundItems /></ProtectedRoute>} />
            <Route path="/items/:id" element={<ProtectedRoute allowedRole="user"><ItemDetails /></ProtectedRoute>} />
            <Route path="/report-lost" element={<ProtectedRoute allowedRole="user"><ReportLost /></ProtectedRoute>} />
            <Route path="/report-found" element={<ProtectedRoute allowedRole="user"><ReportFound /></ProtectedRoute>} />
            
            {/* Admin Protected Routes */}
            <Route path="/admin-dashboard" element={<ProtectedRoute allowedRole="admin"><AdminDashboard /></ProtectedRoute>} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
