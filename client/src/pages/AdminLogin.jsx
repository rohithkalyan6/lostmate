import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import AnimatedPage from '../components/AnimatedPage';
import { AuthShell, CaseButton, Field, Message } from '../components/ui';

const AdminLogin = () => {
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
      
      // Admin Authorization Check
      if (response.data.user.role === 'admin') {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        navigate('/admin-dashboard', { replace: true });
      } else {
        setError('Access denied: You are not an admin.');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please check credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatedPage>
      <AuthShell
        eyebrow="Admin Review"
        title="Approve with precision."
        description="A stripped-down desk for staff to verify reports before they reach the public board."
      >
        <h2 className="mb-6 text-3xl font-bold">Admin portal</h2>
        
        {error && <Message tone="error">{error}</Message>}
        
        <form onSubmit={handleSubmit} className="mt-5 space-y-5">
          <Field label="Admin Email">
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
            {loading ? 'Authenticating...' : 'Sign In as Admin'}
          </CaseButton>
        </form>
        <p className="mt-6 text-center text-sm text-[var(--muted)]">
          Not an admin? <Link to="/login" className="font-bold text-[var(--ink)] underline decoration-[var(--line)] underline-offset-4 hover:decoration-[var(--ink)]">User Login</Link>
        </p>
      </AuthShell>
    </AnimatedPage>
  );
};

export default AdminLogin;
