import React, { ReactNode } from 'react';
import Header from '../../../../components/header/v2/index';
import Footer from '../../../../components/footer/index';
import { Helmet } from 'react-helmet';
import './WebinarLayout.scss';

interface WebinarLayoutProps {
  children: ReactNode;
  title?: string;
  description?: string;
}

const WebinarLayout: React.FC<WebinarLayoutProps> = ({ 
  children, 
  title = 'Вебинары - AML Academy',
  description = 'Вебинары по финансовому мониторингу и противодействию отмыванию денег'
}) => {
  return (
    <div className="webinar-layout">

      <Header />

      <div className="webinar-layout__content" style={{ marginTop: '-20px' }}>
        {children}
      </div>

      <Footer />
    </div>
  );
};

export default WebinarLayout;
