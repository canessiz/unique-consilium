import { useState } from 'react';
import Link from 'next/link';
import Layout from '../../components/Layout';

export default function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    
    // Simulate login process
    setTimeout(() => {
      if (formData.email && formData.password) {
        // Simulate successful login
        alert('Login successful! (This is a demo)');
      } else {
        setError('Please fill in all fields');
      }
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <Layout title="Login - Unique Consilium">
      <section className="section">
        <div className="container">
          <div style={{ maxWidth: '400px', margin: '0 auto' }}>
            <div className="card">
              <h1 className="text-center mb-30" style={{ color: '#2c5aa0' }}>Login</h1>
              
              {error && (
                <div style={{ 
                  background: '#f8d7da', 
                  color: '#721c24', 
                  padding: '15px', 
                  borderRadius: '5px', 
                  marginBottom: '20px' 
                }}>
                  {error}
                </div>
              )}
              
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="email">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="Enter your email"
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    placeholder="Enter your password"
                  />
                </div>
                
                <button 
                  type="submit" 
                  className="btn btn-primary"
                  disabled={isSubmitting}
                  style={{ width: '100%', marginBottom: '20px' }}
                >
                  {isSubmitting ? 'Logging in...' : 'Login'}
                </button>
              </form>
              
              <div className="text-center">
                <p>
                  Don't have an account?{' '}
                  <Link href="/auth/register" style={{ color: '#2c5aa0', fontWeight: '500' }}>
                    Register here
                  </Link>
                </p>
                <p style={{ marginTop: '10px' }}>
                  <Link href="/auth/forgot-password" style={{ color: '#666' }}>
                    Forgot your password?
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}