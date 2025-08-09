import Layout from '../../components/Layout';

export default function Dashboard() {
  const user = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    userType: 'client',
    joinDate: 'January 2024'
  };

  const recentConsultations = [
    {
      id: 1,
      title: 'Business Strategy Review',
      advisor: 'Sarah Johnson',
      date: '2024-01-15',
      status: 'Completed'
    },
    {
      id: 2,
      title: 'Financial Planning Session',
      advisor: 'Michael Chen',
      date: '2024-01-10',
      status: 'Scheduled'
    },
    {
      id: 3,
      title: 'Legal Consultation',
      advisor: 'Emily Rodriguez',
      date: '2024-01-05',
      status: 'In Progress'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed': return '#28a745';
      case 'Scheduled': return '#007bff';
      case 'In Progress': return '#ffc107';
      default: return '#6c757d';
    }
  };

  return (
    <Layout title="Dashboard - Unique Consilium">
      <section className="section">
        <div className="container">
          <h1 className="section-title">Welcome back, {user.name}!</h1>
          <p className="section-subtitle">Manage your consultations and account settings</p>
          
          <div className="grid grid-3">
            <div className="card text-center">
              <h3 style={{ color: '#2c5aa0', marginBottom: '15px' }}>Total Consultations</h3>
              <div style={{ fontSize: '3rem', fontWeight: 'bold', color: '#2c5aa0' }}>12</div>
              <p>Lifetime consultations</p>
            </div>
            
            <div className="card text-center">
              <h3 style={{ color: '#2c5aa0', marginBottom: '15px' }}>Active Sessions</h3>
              <div style={{ fontSize: '3rem', fontWeight: 'bold', color: '#2c5aa0' }}>2</div>
              <p>Ongoing consultations</p>
            </div>
            
            <div className="card text-center">
              <h3 style={{ color: '#2c5aa0', marginBottom: '15px' }}>Upcoming</h3>
              <div style={{ fontSize: '3rem', fontWeight: 'bold', color: '#2c5aa0' }}>1</div>
              <p>Scheduled sessions</p>
            </div>
          </div>
          
          <div className="grid grid-2">
            <div className="card">
              <h3 style={{ color: '#2c5aa0', marginBottom: '20px' }}>Recent Consultations</h3>
              {recentConsultations.map((consultation) => (
                <div key={consultation.id} style={{ 
                  padding: '15px', 
                  border: '1px solid #eee', 
                  borderRadius: '5px', 
                  marginBottom: '15px' 
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <h4 style={{ margin: '0 0 5px 0' }}>{consultation.title}</h4>
                      <p style={{ margin: '0', color: '#666' }}>with {consultation.advisor}</p>
                      <p style={{ margin: '5px 0 0 0', fontSize: '0.9rem', color: '#888' }}>
                        {consultation.date}
                      </p>
                    </div>
                    <span style={{ 
                      padding: '5px 12px', 
                      borderRadius: '15px', 
                      fontSize: '0.8rem', 
                      fontWeight: '500',
                      background: getStatusColor(consultation.status) + '20',
                      color: getStatusColor(consultation.status)
                    }}>
                      {consultation.status}
                    </span>
                  </div>
                </div>
              ))}
              <button className="btn btn-primary" style={{ width: '100%' }}>
                View All Consultations
              </button>
            </div>
            
            <div className="card">
              <h3 style={{ color: '#2c5aa0', marginBottom: '20px' }}>Quick Actions</h3>
              
              <div style={{ marginBottom: '15px' }}>
                <button className="btn btn-primary" style={{ width: '100%', marginBottom: '10px' }}>
                  Book New Consultation
                </button>
              </div>
              
              <div style={{ marginBottom: '15px' }}>
                <button className="btn btn-secondary" style={{ width: '100%', marginBottom: '10px' }}>
                  Browse Advisors
                </button>
              </div>
              
              <div style={{ marginBottom: '15px' }}>
                <button className="btn btn-secondary" style={{ width: '100%', marginBottom: '10px' }}>
                  Update Profile
                </button>
              </div>
              
              <div style={{ marginBottom: '15px' }}>
                <button className="btn btn-secondary" style={{ width: '100%' }}>
                  View Account Settings
                </button>
              </div>
              
              <hr style={{ margin: '20px 0' }} />
              
              <h4 style={{ marginBottom: '15px' }}>Account Information</h4>
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>Account Type:</strong> {user.userType === 'client' ? 'Client' : 'Advisor'}</p>
              <p><strong>Member Since:</strong> {user.joinDate}</p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}