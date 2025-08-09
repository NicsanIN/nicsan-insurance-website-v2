import React, { useState } from 'react';

interface HealthInsuranceCardProps {
  onBookSafetyCall: () => void;
}

const HealthInsuranceCard: React.FC<HealthInsuranceCardProps> = ({ onBookSafetyCall }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="relative health-card-container">
      {/* Base Health Insurance Card */}
      <div 
        className={`relative w-full max-w-none sm:max-w-[300px] sm:w-[300px] h-[170px] bg-light-gray rounded-[20px] p-4 sm:p-6 health-card-base cursor-pointer mobile-card-size ${
          isExpanded ? 'z-20' : 'z-10'
        }`}
        onMouseEnter={() => setIsExpanded(true)}
        onMouseLeave={() => setIsExpanded(false)}
      >
        {/* Card Content */}
        <div className="flex justify-between items-start h-full">
          <div className="flex flex-col justify-between h-full">
            {/* Title */}
            <h3 className="font-satoshi font-normal text-2xl sm:text-[32px] text-design-black leading-[1.16em] mobile-title">
              Health
            </h3>
            {/* Description */}
            <p className="font-satoshi font-light text-sm sm:text-[17px] text-design-black leading-[1.16em] max-w-[150px] mobile-card-description">
              Stay healthy,<br />stay wealthy
            </p>
          </div>
          {/* Icon */}
          <img 
            src="/images/healthcare-icon.png" 
            alt="Healthcare Icon" 
            className="w-10 h-10 sm:w-[48px] sm:h-[48px] object-contain"
          />
        </div>
      </div>

      {/* Expanded Content - Overlay */}
      <div 
        className={`absolute top-0 left-0 w-full sm:w-[300px] bg-light-gray rounded-[20px] health-card-expanded overflow-hidden shadow-xl ${
          isExpanded ? 'h-[364px] opacity-100 z-30' : 'h-[170px] opacity-0 pointer-events-none'
        }`}
        onMouseEnter={() => setIsExpanded(true)}
        onMouseLeave={() => setIsExpanded(false)}
      >
        {/* Expanded Content Container */}
        <div className="p-6 h-full flex flex-col">
          {/* Header Section - Only Title and Icon */}
          <div className="flex justify-between items-start mb-6">
            <div className="space-y-5">
              <h3 className="font-satoshi font-normal text-[32px] text-design-black leading-[1.16em]">
                Health
              </h3>
              {/* Description removed from expanded view */}
            </div>
            <img 
              src="/images/healthcare-icon.png" 
              alt="Healthcare Icon" 
              className="w-[48px] h-[48px] object-contain"
            />
          </div>

          {/* Healthcare Statistics Content */}
          <div className="flex-1 space-y-4">
            {/* Bullet Points */}
            <div className="space-y-3">
              {/* First Bullet Point */}
              <div className="flex items-start space-x-2">
                <span className="w-1.5 h-1.5 bg-design-black rounded-full mt-2 flex-shrink-0"></span>
                <p className="font-satoshi font-light text-[15px] text-design-black leading-[1.4em]">
                  Indians still pay 45.98% of all healthcare costs out-of-pocket one medical bill can wipe out savings.
                </p>
              </div>

              {/* Second Bullet Point */}
              <div className="flex items-start space-x-2">
                <span className="w-1.5 h-1.5 bg-design-black rounded-full mt-2 flex-shrink-0"></span>
                <p className="font-satoshi font-light text-[15px] text-design-black leading-[1.4em]">
                  ₹ 70,558 average health-claim size in FY 24, up 11% YoY thanks to medical inflation.
                </p>
              </div>
            </div>
          </div>

          {/* CTA Button */}
          <div className="pt-4">
            <button 
              onClick={onBookSafetyCall}
              className="bg-primary-blue text-button-text font-satoshi font-bold px-4 py-3 sm:py-2.5 rounded-[10px] hover:bg-[#012E58] transition-colors text-sm sm:text-[14px] shadow-md min-h-[44px]"
            >
              Book Safety Call
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HealthInsuranceCard; 