import Layout from '../components/Layout';
import Link from 'next/link';

export default function Home() {
  return (
    <Layout title="Unique Consilium - Professional Advisory Services">
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <h1>Welcome to Unique Consilium</h1>
          <p>Professional advisory services tailored to your unique needs</p>
          <div style={{ marginTop: '30px' }}>
            <Link href="/auth/register" className="btn btn-primary" style={{ marginRight: '15px' }}>
              Get Started
            </Link>
            <Link href="/services" className="btn btn-secondary">
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section">
        <div className="container">
          <h2 className="section-title">Why Choose Unique Consilium?</h2>
          <p className="section-subtitle">
            We provide personalized advisory services that help you make informed decisions
          </p>
          
          <div className="grid grid-3">
            <div className="card text-center">
              <h3 style={{ color: '#2c5aa0', marginBottom: '15px' }}>Expert Advisors</h3>
              <p>Our team of experienced professionals provides expert guidance across various domains</p>
            </div>
            
            <div className="card text-center">
              <h3 style={{ color: '#2c5aa0', marginBottom: '15px' }}>Personalized Approach</h3>
              <p>Every consultation is tailored to your specific needs and circumstances</p>
            </div>
            
            <div className="card text-center">
              <h3 style={{ color: '#2c5aa0', marginBottom: '15px' }}>Proven Results</h3>
              <p>Track record of successful outcomes and satisfied clients</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section" style={{ background: '#f8f9fa' }}>
        <div className="container text-center">
          <h2 className="section-title">Ready to Get Started?</h2>
          <p className="section-subtitle">
            Join thousands of satisfied clients who have benefited from our advisory services
          </p>
          <Link href="/contact" className="btn btn-primary">
            Contact Us Today
          </Link>
        </div>
      </section>
    </Layout>
  );
}
