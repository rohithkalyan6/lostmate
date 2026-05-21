import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import AnimatedPage from '../components/AnimatedPage';
import { AuthShell, CaseButton, Field, Message } from '../components/ui';

const Register = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(email)) return "Invalid email format";
    if (!email.endsWith(".sreenidhi.edu.in") && !email.endsWith("@sreenidhi.edu.in")) return "Use college email only";
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    
    // Auth Requirements checks
    const emailError = validateEmail(formData.email);
    if (emailError) {
      setError(emailError);
      return;
    }

    setLoading(true);
    try {
      await axios.post('http://localhost:5000/api/auth/register', formData);
      setSuccess("Account created successfully! Redirecting...");
      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      console.log(err);
      console.log(err.response);
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatedPage>
      <AuthShell
        eyebrow="New Case Holder"
        title="Start a clean trail."
        description="Use your college email so every report has an accountable owner and every return has a clear path."
      >
        <h2 className="mb-6 text-3xl font-bold">Create account</h2>
        
        {error && <Message tone="error">{error}</Message>}
        {success && <Message tone="success">{success}</Message>}
        
        <form onSubmit={handleSubmit} className="mt-5 space-y-5">
          <Field label="Full Name">
            <input 
              type="text" 
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="case-field"
            />
          </Field>
          <Field label="College Email">
            <input 
              type="email" 
              required
              placeholder="name@sreenidhi.edu.in"
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
            {loading ? 'Processing...' : 'Register'}
          </CaseButton>
        </form>
        <p className="mt-6 text-center text-sm text-[var(--muted)]">
          Already have an account? <Link to="/login" className="font-bold text-[var(--ink)] underline decoration-[var(--line)] underline-offset-4 hover:decoration-[var(--ink)]">Log in</Link>
        </p>
      </AuthShell>
    </AnimatedPage>
  );
};

export default Register;
