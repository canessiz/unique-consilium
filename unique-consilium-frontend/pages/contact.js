import { useState } from 'react';
import Layout from '../components/Layout';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setSubmitStatus('success');
      setIsSubmitting(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 2000);
  };

  return (
    <Layout title="Contact Us - Unique Consilium">
      <section className="section">
        <div className="container">
          <h1 className="section-title">Contact Us</h1>
          <p className="section-subtitle">
            Get in touch with our team for personalized consultation
          </p>
          
          <div className="grid grid-2">
            <div className="card">
              <h3 style={{ color: '#2c5aa0', marginBottom: '20px' }}>Send us a Message</h3>
              
              {submitStatus === 'success' && (
                <div style={{ 
                  background: '#d4edda', 
                  color: '#155724', 
                  padding: '15px', 
                  borderRadius: '5px', 
                  marginBottom: '20px' 
                }}>
                  Thank you for your message! We'll get back to you soon.
                </div>
              )}
              
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="name">Full Name *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="email">Email Address *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="subject">Subject *</label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select a subject</option>
                    <option value="general">General Inquiry</option>
                    <option value="consultation">Consultation Request</option>
                    <option value="business">Business Consulting</option>
                    <option value="financial">Financial Advisory</option>
                    <option value="legal">Legal Consultation</option>
                    <option value="technology">Technology Advisory</option>
                    <option value="career">Career Counseling</option>
                    <option value="personal">Personal Development</option>
                  </select>
                </div>
                
                <div className="form-group">
                  <label htmlFor="message">Message *</label>
                  <textarea
                    id="message"
                    name="message"
                    rows="5"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us about your needs and how we can help..."
                    required
                  ></textarea>
                </div>
                
                <button 
                  type="submit" 
                  className="btn btn-primary"
                  disabled={isSubmitting}
                  style={{ width: '100%' }}
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            </div>
            
            <div className="card">
              <h3 style={{ color: '#2c5aa0', marginBottom: '20px' }}>Get in Touch</h3>
              
              <div style={{ marginBottom: '30px' }}>
                <h4 style={{ marginBottom: '10px' }}>📧 Email</h4>
                <p>info@uniqueconsilium.com</p>
                <p>support@uniqueconsilium.com</p>
              </div>
              
              <div style={{ marginBottom: '30px' }}>
                <h4 style={{ marginBottom: '10px' }}>📞 Phone</h4>
                <p>+1 (555) 123-4567</p>
                <p>+1 (555) 987-6543</p>
              </div>
              
              <div style={{ marginBottom: '30px' }}>
                <h4 style={{ marginBottom: '10px' }}>🕒 Business Hours</h4>
                <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                <p>Saturday: 10:00 AM - 4:00 PM</p>
                <p>Sunday: Closed</p>
              </div>
              
              <div>
                <h4 style={{ marginBottom: '10px' }}>📍 Office Location</h4>
                <p>123 Business District</p>
                <p>Professional Plaza, Suite 456</p>
                <p>Business City, BC 12345</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}