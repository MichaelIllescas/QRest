import React from 'react';
import Container from '../shared/components/Container';
import '../shared/styles/PageLayout.css';

const Reports: React.FC = () => {
  return (
    <Container size="xl" className="py-6">
      {/* Sección de título estandarizada */}
      <div className="page-header">
        <h1 className="page-title">
          Reportes
        </h1>
        <p className="page-description">
          Aquí va el título principal de la sección Reportes
        </p>
      </div>
      
      {/* Área de contenido estandarizada */}
      <div className="page-content">
        <div className="content-placeholder">
          <div className="placeholder-content">
            <div className="placeholder-icon">📊</div>
            <h3 className="placeholder-title">Contenido de Reportes</h3>
            <p className="placeholder-text">Aquí va a ir el contenido principal de los Reportes</p>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Reports;