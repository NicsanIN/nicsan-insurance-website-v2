import React, { useState } from 'react';

interface HomeInsuranceCardProps {
  onBookSafetyCall: () => void;
}

const HomeInsuranceCard: React.FC<HomeInsuranceCardProps> = ({ onBookSafetyCall }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="relative home-card-container">
      {/* Base Home Insurance Card */}
      <div 
        className={`relative w-[300px] h-[170px] bg-light-gray rounded-[20px] p-6 home-card-base cursor-pointer ${
          isExpanded ? 'z-20' : 'z-10'
        }`}
        onMouseEnter={() => setIsExpanded(true)}
        onMouseLeave={() => setIsExpanded(false)}
      >
        <div className="flex justify-between items-start h-full">
          <div className="flex flex-col justify-between h-full">
            <h3 className="font-satoshi font-normal text-[32px] text-design-black leading-[1.16em]">
              Home
            </h3>
            <p className="font-satoshi font-light text-[17px] text-design-black leading-[1.16em] max-w-[150px]">
              Make your castle<br />disaster-proof
            </p>
          </div>
          <svg 
            width="48" 
            height="48" 
            viewBox="0 0 48 48" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            className="w-[48px] h-[48px]"
          >
            <rect x="8" y="20" width="32" height="20" stroke="#000000" strokeWidth="2" fill="none"/>
            <path d="M8 20 L24 8 L40 20" stroke="#000000" strokeWidth="2" fill="none"/>
            <rect x="18" y="28" width="6" height="12" stroke="#000000" strokeWidth="2" fill="none"/>
            <rect x="26" y="24" width="8" height="8" stroke="#000000" strokeWidth="2" fill="none"/>
            <line x1="30" y1="24" x2="30" y2="32" stroke="#000000" strokeWidth="2"/>
            <line x1="26" y1="28" x2="34" y2="28" stroke="#000000" strokeWidth="2"/>
            <rect x="32" y="12" width="3" height="8" stroke="#000000" strokeWidth="2" fill="none"/>
          </svg>
        </div>
      </div>

      {/* Expanded Content - Overlay - Expanding Upward */}
      <div 
        className={`absolute bottom-0 left-0 w-[300px] rounded-[20px] home-card-expanded overflow-hidden shadow-xl ${
          isExpanded ? 'h-[364px] opacity-100 z-30' : 'h-[170px] opacity-0 pointer-events-none'
        }`}
        style={{ clipPath: 'inset(0 round 20px)' }}
        onMouseEnter={() => setIsExpanded(true)}
        onMouseLeave={() => setIsExpanded(false)}
      >
        {/* Expanded Content Container */}
        <div className="p-6 h-full flex flex-col bg-light-gray">
          {/* Header Section - Only Title and Icon */}
          <div className="flex justify-between items-start mb-6">
            <div className="space-y-5">
              <h3 className="font-satoshi font-normal text-[32px] text-design-black leading-[1.16em]">
                Home
              </h3>
              {/* Description removed from expanded view */}
            </div>
            <svg 
              width="48" 
              height="48" 
              viewBox="0 0 48 48" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
              className="w-[48px] h-[48px]"
            >
              {/* House body */}
              <rect x="8" y="20" width="32" height="20" stroke="#000000" strokeWidth="2" fill="none"/>
              {/* Roof */}
              <path d="M8 20 L24 8 L40 20" stroke="#000000" strokeWidth="2" fill="none"/>
              {/* Door */}
              <rect x="18" y="28" width="6" height="12" stroke="#000000" strokeWidth="2" fill="none"/>
              {/* Window */}
              <rect x="26" y="24" width="8" height="8" stroke="#000000" strokeWidth="2" fill="none"/>
              <line x1="30" y1="24" x2="30" y2="32" stroke="#000000" strokeWidth="2"/>
              <line x1="26" y1="28" x2="34" y2="28" stroke="#000000" strokeWidth="2"/>
              {/* Chimney */}
              <rect x="32" y="12" width="3" height="8" stroke="#000000" strokeWidth="2" fill="none"/>
            </svg>
          </div>

          {/* Home Insurance Statistics Content */}
          <div className="flex-1 space-y-4">
            {/* Bullet Points */}
            <div className="space-y-3">
              {/* First Bullet Point */}
              <div className="flex items-start space-x-2">
                <span className="w-1.5 h-1.5 bg-design-black rounded-full mt-2 flex-shrink-0"></span>
                <p className="font-satoshi font-light text-[15px] text-design-black leading-[1.4em]">
                  ₹ 1 lakh cr+ (US $12 bn) in property losses from natural catastrophes hit India in 2023 alone.
                </p>
              </div>

              {/* Second Bullet Point */}
              <div className="flex items-start space-x-2">
                <span className="w-1.5 h-1.5 bg-design-black rounded-full mt-2 flex-shrink-0"></span>
                <p className="font-satoshi font-light text-[15px] text-design-black leading-[1.4em]">
                  Floods drive 63% of those annual losses — they're now the number-one threat to property.
                </p>
              </div>
            </div>
          </div>

          {/* CTA Button */}
          <div className="pt-4">
            <button 
              onClick={onBookSafetyCall}
              className="bg-primary-blue text-button-text font-satoshi font-bold px-4 py-2.5 rounded-[10px] hover:bg-[#012E58] transition-colors text-[14px] shadow-md"
            >
              Book Safety Call
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeInsuranceCard; 