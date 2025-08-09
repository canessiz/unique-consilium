import { useState } from 'react';
import Link from 'next/link';
import Layout from '../../components/Layout';

export default function Register() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    userType: 'client'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

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
    
    // Basic validation
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setIsSubmitting(false);
      return;
    }
    
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      setIsSubmitting(false);
      return;
    }
    
    // Simulate registration process
    setTimeout(() => {
      setSuccess(true);
      setIsSubmitting(false);
    }, 2000);
  };

  if (success) {
    return (
      <Layout title="Registration Successful - Unique Consilium">
        <section className="section">
          <div className="container">
            <div style={{ maxWidth: '400px', margin: '0 auto' }}>
              <div className="card text-center">
                <h1 style={{ color: '#2c5aa0', marginBottom: '20px' }}>Registration Successful!</h1>
                <p style={{ marginBottom: '30px' }}>
                  Welcome to Unique Consilium! Your account has been created successfully.
                </p>
                <Link href="/auth/login" className="btn btn-primary">
                  Login to Your Account
                </Link>
              </div>
            </div>
          </div>
        </section>
      </Layout>
    );
  }

  return (
    <Layout title="Register - Unique Consilium">
      <section className="section">
        <div className="container">
          <div style={{ maxWidth: '500px', margin: '0 auto' }}>
            <div className="card">
              <h1 className="text-center mb-30" style={{ color: '#2c5aa0' }}>Create Account</h1>
              
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
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                  <div className="form-group">
                    <label htmlFor="firstName">First Name</label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                      placeholder="Enter your first name"
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="lastName">Last Name</label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      required
                      placeholder="Enter your last name"
                    />
                  </div>
                </div>
                
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
                  <label htmlFor="userType">Account Type</label>
                  <select
                    id="userType"
                    name="userType"
                    value={formData.userType}
                    onChange={handleChange}
                    required
                  >
                    <option value="client">Client (Seeking Advisory Services)</option>
                    <option value="advisor">Advisor (Providing Services)</option>
                  </select>
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
                
                <div className="form-group">
                  <label htmlFor="confirmPassword">Confirm Password</label>
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                    placeholder="Confirm your password"
                  />
                </div>
                
                <button 
                  type="submit" 
                  className="btn btn-primary"
                  disabled={isSubmitting}
                  style={{ width: '100%', marginBottom: '20px' }}
                >
                  {isSubmitting ? 'Creating Account...' : 'Create Account'}
                </button>
              </form>
              
              <div className="text-center">
                <p>
                  Already have an account?{' '}
                  <Link href="/auth/login" style={{ color: '#2c5aa0', fontWeight: '500' }}>
                    Login here
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