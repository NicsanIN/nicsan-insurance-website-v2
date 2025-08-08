import React, { useState } from 'react';

interface MotorInsuranceCardProps {
  onBookSafetyCall: () => void;
}

const MotorInsuranceCard: React.FC<MotorInsuranceCardProps> = ({ onBookSafetyCall }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="relative motor-card-container">
      {/* Base Motor Insurance Card */}
      <div 
        className={`relative w-[300px] h-[170px] bg-light-gray rounded-[20px] p-6 motor-card-base cursor-pointer ${
          isExpanded ? 'z-20' : 'z-10'
        }`}
        onMouseEnter={() => setIsExpanded(true)}
        onMouseLeave={() => setIsExpanded(false)}
      >
        {/* Card Content */}
        <div className="flex justify-between items-start h-full">
          <div className="flex flex-col justify-between h-full">
            {/* Title */}
            <h3 className="font-satoshi font-normal text-[32px] text-design-black leading-[1.16em]">
              Motor
            </h3>
            {/* Description */}
            <p className="font-satoshi font-light text-[17px] text-design-black leading-[1.16em] max-w-[150px]">
              Drive with peace<br />of mind
            </p>
          </div>
          {/* Icon */}
          <img 
            src="/images/car.png" 
            alt="Motor Insurance Icon" 
            className="w-[48px] h-[48px] object-contain"
          />
        </div>
      </div>

      {/* Expanded Content - Overlay - Expanding Downward */}
      <div 
        className={`absolute top-0 left-0 w-[300px] bg-light-gray rounded-[20px] motor-card-expanded overflow-hidden shadow-xl ${
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
                Motor
              </h3>
              {/* Description removed from expanded view */}
            </div>
            <img 
              src="/images/car.png" 
              alt="Motor Insurance Icon" 
              className="w-[48px] h-[48px] object-contain"
            />
          </div>

          {/* Motor Insurance Statistics Content */}
          <div className="flex-1 space-y-4">
            {/* Bullet Points */}
            <div className="space-y-3">
              {/* First Bullet Point */}
              <div className="flex items-start space-x-2">
                <span className="w-1.5 h-1.5 bg-design-black rounded-full mt-2 flex-shrink-0"></span>
                <p className="font-satoshi font-light text-[15px] text-design-black leading-[1.4em]">
                  Road crashes cost India ~US $20 bn every year in economic damage..
                </p>
              </div>

              {/* Second Bullet Point */}
              <div className="flex items-start space-x-2">
                <span className="w-1.5 h-1.5 bg-design-black rounded-full mt-2 flex-shrink-0"></span>
                <p className="font-satoshi font-light text-[15px] text-design-black leading-[1.4em]">
                   Most Indians only get third party cover because they don't know about the benefits of comprehensive cover.
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

export default MotorInsuranceCard; 