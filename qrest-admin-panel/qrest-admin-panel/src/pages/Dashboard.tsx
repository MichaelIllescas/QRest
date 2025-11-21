import React from 'react';
import Container from '../shared/components/Container';
import '../shared/styles/PageLayout.css';

const Dashboard: React.FC = () => {
  return (
    <Container size="xl" className="py-6">
      {/* Sección de título estandarizada */}
      <div className="page-header">
        <h1 className="page-title">
          Dashboard
        </h1>
        <p className="page-description">
          Aquí va el título principal de la sección Dashboard
        </p>
      </div>
      
      {/* Área de contenido estandarizada */}
      <div className="page-content">
        <div className="content-placeholder">
          <div className="placeholder-content">
            <div className="placeholder-icon">📊</div>
            <h3 className="placeholder-title">Contenido del Dashboard</h3>
            <p className="placeholder-text">Aquí va a ir el contenido principal del Dashboard</p>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Dashboard;