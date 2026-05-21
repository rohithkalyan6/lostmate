import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import AnimatedPage from '../components/AnimatedPage';
import { AuthShell, CaseButton, Field, Message } from '../components/ui';
import { getDashboardPath } from '../utils/auth';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!formData.email || !formData.password) {
      setError("Please fill all fields");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', formData);
      const userRole = response.data.user?.role;
      
      if (!userRole) {
        setError('Invalid user role');
        setLoading(false);
        return;
      }

      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));

      navigate(getDashboardPath(userRole), { replace: true });
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please check credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatedPage>
      <AuthShell
        eyebrow="LostMate Intake"
        title="Return what matters."
        description="A focused campus recovery desk for reporting missing items, checking found goods, and closing the loop quickly."
      >
        <h2 className="mb-6 text-3xl font-bold">Sign in</h2>
        
        {error && <Message tone="error">{error}</Message>}
        
        <form onSubmit={handleSubmit} className="mt-5 space-y-5">
          <Field label="College Email">
            <input 
              type="email" 
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="case-field"
            />
          </Field>
          <Field label="Password">
            <input 
              type="password" 
              required
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="case-field"
            />
          </Field>
          <CaseButton 
            type="submit"
            disabled={loading}
            className="w-full disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? 'Logging in...' : 'Sign In'}
          </CaseButton>
        </form>
        <p className="mt-6 text-center text-sm text-[var(--muted)]">
          Don't have an account? <Link to="/register" className="font-bold text-[var(--ink)] underline decoration-[var(--line)] underline-offset-4 hover:decoration-[var(--ink)]">Register</Link>
        </p>
      </AuthShell>
    </AnimatedPage>
  );
};

export default Login;
