import React, { useState, useEffect } from 'react';

interface HealthInsuranceCardProps {
  onBookSafetyCall: () => void;
}

const HealthInsuranceCard: React.FC<HealthInsuranceCardProps> = ({ onBookSafetyCall }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024); // lg breakpoint
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Handle card interaction for mobile vs desktop
  const handleCardInteraction = () => {
    if (isMobile) {
      setIsExpanded(!isExpanded);
    }
  };

  return (
    <div className="relative health-card-container">
      {/* Simple Health Insurance Card - Following Figma Design */}
      <div 
        className={`relative w-full h-[120px] sm:h-[140px] lg:h-[160px] bg-light-gray rounded-[12px] sm:rounded-[16px] p-3 sm:p-4 health-card-base cursor-pointer transition-all duration-200 ${
          isExpanded ? 'z-20' : 'z-10'
        } ${isMobile ? 'active:scale-[0.98]' : ''}`}
        onMouseEnter={() => !isMobile && setIsExpanded(true)}
        onMouseLeave={() => !isMobile && setIsExpanded(false)}
        onClick={handleCardInteraction}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleCardInteraction();
          }
        }}
      >
        {/* Card Content - Compact Layout */}
        <div className="flex flex-col h-full justify-between">
          {/* Icon at top */}
          <div className="flex justify-end mb-2">
            <img 
              src="/images/healthcare-icon.png" 
              alt="Healthcare Icon" 
              className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 object-contain"
            />
          </div>
          
          {/* Title and Description at bottom */}
          <div>
            <h3 className="font-satoshi font-semibold text-sm sm:text-base lg:text-lg text-design-black leading-tight mb-1">
              Health
            </h3>
            <p className="font-satoshi font-normal text-xs sm:text-sm text-gray-600 leading-tight">
              Stay healthy, stay wealthy
            </p>
          </div>
        </div>
      </div>

      {/* Expanded Content - Simplified Modal Style */}
      {isExpanded && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-[16px] p-6 w-full max-w-md max-h-[80vh] overflow-y-auto">
            {/* Close Button */}
            <button 
              onClick={() => setIsExpanded(false)}
              className="absolute top-4 right-4 w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Header */}
            <div className="flex items-center space-x-3 mb-6">
              <img 
                src="/images/healthcare-icon.png" 
                alt="Healthcare Icon" 
                className="w-10 h-10 object-contain"
              />
              <h3 className="font-satoshi font-bold text-xl text-design-black">
                Health Insurance
              </h3>
            </div>

            {/* Content */}
            <div className="space-y-4 mb-6">
              <div className="flex items-start space-x-2">
                <span className="w-1.5 h-1.5 bg-design-black rounded-full mt-2 flex-shrink-0"></span>
                <p className="font-satoshi text-sm text-design-black leading-relaxed">
                  Indians still pay 45.98% of all healthcare costs out-of-pocket one medical bill can wipe out savings.
                </p>
              </div>
              <div className="flex items-start space-x-2">
                <span className="w-1.5 h-1.5 bg-design-black rounded-full mt-2 flex-shrink-0"></span>
                <p className="font-satoshi text-sm text-design-black leading-relaxed">
                  ₹ 70,558 average health-claim size in FY 24, up 11% YoY thanks to medical inflation.
                </p>
              </div>
            </div>

            {/* CTA Button */}
            <button 
              onClick={onBookSafetyCall}
              className="bg-primary-blue text-white font-satoshi font-bold px-6 py-3 rounded-[10px] hover:bg-[#012E58] transition-colors w-full"
            >
              Book Safety Call
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default HealthInsuranceCard; 