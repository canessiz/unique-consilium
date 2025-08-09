import Layout from '../components/Layout';

export default function About() {
  return (
    <Layout title="About Us - Unique Consilium">
      <section className="section">
        <div className="container">
          <h1 className="section-title">About Unique Consilium</h1>
          <p className="section-subtitle">
            Your trusted partner in professional advisory services
          </p>
          
          <div className="grid grid-2">
            <div className="card">
              <h3 style={{ color: '#2c5aa0', marginBottom: '20px' }}>Our Mission</h3>
              <p>
                To provide exceptional advisory services that empower individuals and organizations 
                to make informed decisions and achieve their goals. We believe every client deserves 
                personalized attention and expert guidance.
              </p>
            </div>
            
            <div className="card">
              <h3 style={{ color: '#2c5aa0', marginBottom: '20px' }}>Our Vision</h3>
              <p>
                To be the leading advisory platform that bridges the gap between expertise and 
                those who need guidance, creating a world where informed decisions drive success 
                and growth.
              </p>
            </div>
          </div>
          
          <div className="card mt-20">
            <h3 style={{ color: '#2c5aa0', marginBottom: '20px' }}>Our Story</h3>
            <p>
              Founded with the vision of democratizing access to professional advisory services, 
              Unique Consilium was born from the understanding that everyone deserves expert guidance 
              when making important decisions. Our platform connects clients with experienced advisors 
              across various fields, ensuring that quality consultation is accessible to all.
            </p>
            <p style={{ marginTop: '15px' }}>
              Whether you're an individual seeking personal guidance or an organization looking for 
              strategic direction, our team of vetted professionals is here to help you navigate 
              complex decisions with confidence.
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
}