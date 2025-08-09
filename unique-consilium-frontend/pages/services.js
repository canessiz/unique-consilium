import Layout from '../components/Layout';

export default function Services() {
  const services = [
    {
      title: "Business Consulting",
      description: "Strategic guidance for business growth, operations, and decision-making",
      features: ["Strategic Planning", "Market Analysis", "Process Optimization", "Risk Assessment"]
    },
    {
      title: "Financial Advisory",
      description: "Expert financial guidance for investments, planning, and wealth management",
      features: ["Investment Planning", "Financial Analysis", "Risk Management", "Portfolio Review"]
    },
    {
      title: "Legal Consultation",
      description: "Professional legal advice and consultation for various legal matters",
      features: ["Contract Review", "Legal Compliance", "Risk Assessment", "Documentation"]
    },
    {
      title: "Technology Advisory",
      description: "Technology strategy and digital transformation guidance",
      features: ["Digital Strategy", "System Architecture", "Technology Selection", "Implementation Planning"]
    },
    {
      title: "Career Counseling",
      description: "Professional career guidance and development planning",
      features: ["Career Planning", "Skills Assessment", "Resume Review", "Interview Preparation"]
    },
    {
      title: "Personal Development",
      description: "Personal growth and development consultation services",
      features: ["Goal Setting", "Life Planning", "Skill Development", "Personal Coaching"]
    }
  ];

  return (
    <Layout title="Our Services - Unique Consilium">
      <section className="section">
        <div className="container">
          <h1 className="section-title">Our Services</h1>
          <p className="section-subtitle">
            Comprehensive advisory services tailored to your specific needs
          </p>
          
          <div className="grid grid-2">
            {services.map((service, index) => (
              <div key={index} className="card">
                <h3 style={{ color: '#2c5aa0', marginBottom: '15px' }}>{service.title}</h3>
                <p style={{ marginBottom: '20px' }}>{service.description}</p>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  {service.features.map((feature, idx) => (
                    <li key={idx} style={{ 
                      marginBottom: '8px', 
                      paddingLeft: '20px', 
                      position: 'relative' 
                    }}>
                      <span style={{ 
                        position: 'absolute', 
                        left: 0, 
                        color: '#2c5aa0' 
                      }}>✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-20">
            <div className="card">
              <h3 style={{ color: '#2c5aa0', marginBottom: '20px' }}>How It Works</h3>
              <div className="grid grid-3">
                <div>
                  <h4 style={{ marginBottom: '10px' }}>1. Book Consultation</h4>
                  <p>Schedule a consultation with one of our expert advisors</p>
                </div>
                <div>
                  <h4 style={{ marginBottom: '10px' }}>2. Get Personalized Advice</h4>
                  <p>Receive tailored guidance specific to your situation</p>
                </div>
                <div>
                  <h4 style={{ marginBottom: '10px' }}>3. Implement Solutions</h4>
                  <p>Execute the recommended strategies with ongoing support</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}