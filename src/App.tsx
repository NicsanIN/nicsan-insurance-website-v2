import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import AboutUs from './components/AboutUs';
import Footer from './components/Footer';
import TermsAndConditions from './components/TermsAndConditions';
import PrivacyPolicy from './components/PrivacyPolicy';

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  const handleNavigation = (page: string) => {
    console.log('Navigation called with page:', page);
    console.log('Current page before change:', currentPage);
    setCurrentPage(page);
    console.log('Current page after change:', page);
  };

  const renderPage = () => {
    console.log('Rendering page:', currentPage);
    switch (currentPage) {
      case 'terms':
        return <TermsAndConditions onNavigate={handleNavigation} />;
      case 'privacy':
        return <PrivacyPolicy onNavigate={handleNavigation} />;
      case 'home':
      default:
        return (
          <>
            <Hero />
            <AboutUs />
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-design-white">
      <div className="max-w-[1440px] mx-auto px-10">
        <Header />
        {renderPage()}
        <Footer onNavigate={handleNavigation} />
      </div>
    </div>
  );
}

export default App; 