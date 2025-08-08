import React, { useEffect } from 'react';

interface TermsAndConditionsProps {
  onNavigate?: (page: string) => void;
}

const TermsAndConditions: React.FC<TermsAndConditionsProps> = ({ onNavigate }) => {
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleBackClick = () => {
    console.log('Back button clicked');
    console.log('onNavigate prop:', onNavigate);
    
    if (onNavigate) {
      console.log('Calling onNavigate with "home"');
      onNavigate('home');
    } else {
      console.log('Using window.history.back()');
      window.history.back();
    }
  };

  return (
    <div className="min-h-screen bg-white py-16">
      <div className="max-w-4xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="font-clash-display font-semibold text-[48px] text-design-black leading-[1.16em] mb-4">
            Terms & Conditions
          </h1>
          <p className="font-satoshi font-normal text-[18px] text-gray-600">
            Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>

        {/* Content */}
        <div className="prose prose-lg max-w-none">
          <section className="mb-8">
            <h2 className="font-satoshi font-bold text-[24px] text-design-black mb-4">
              1. Acceptance of Terms
            </h2>
            <p className="font-satoshi font-normal text-[16px] text-gray-700 leading-relaxed mb-4">
              By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement. 
              If you do not agree to abide by the above, please do not use this service.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="font-satoshi font-bold text-[24px] text-design-black mb-4">
              2. Use License
            </h2>
            <p className="font-satoshi font-normal text-[16px] text-gray-700 leading-relaxed mb-4">
              Permission is granted to temporarily download one copy of the materials (information or software) on Nicsan Insurance's 
              website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, 
              and under this license you may not:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li className="font-satoshi font-normal text-[16px] text-gray-700">Modify or copy the materials</li>
              <li className="font-satoshi font-normal text-[16px] text-gray-700">Use the materials for any commercial purpose or for any public display</li>
              <li className="font-satoshi font-normal text-[16px] text-gray-700">Attempt to reverse engineer any software contained on the website</li>
              <li className="font-satoshi font-normal text-[16px] text-gray-700">Remove any copyright or other proprietary notations from the materials</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="font-satoshi font-bold text-[24px] text-design-black mb-4">
              3. Insurance Services
            </h2>
            <p className="font-satoshi font-normal text-[16px] text-gray-700 leading-relaxed mb-4">
              Nicsan Insurance Marketing LLP is a licensed Corporate Agent (Composite) registered with IRDAI (License No: CA0738). 
              We provide insurance intermediation services and do not underwrite insurance policies directly. All insurance products 
              are underwritten by respective insurance companies.
            </p>
            <p className="font-satoshi font-normal text-[16px] text-gray-700 leading-relaxed mb-4">
              The information provided on this website is for general informational purposes only and should not be considered as 
              professional advice. We recommend consulting with our insurance advisors for personalized guidance.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="font-satoshi font-bold text-[24px] text-design-black mb-4">
              4. Privacy Policy
            </h2>
            <p className="font-satoshi font-normal text-[16px] text-gray-700 leading-relaxed mb-4">
              Your privacy is important to us. Please review our Privacy Policy, which also governs your use of the website, 
              to understand our practices regarding the collection and use of your personal information.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="font-satoshi font-bold text-[24px] text-design-black mb-4">
              5. Disclaimer
            </h2>
            <p className="font-satoshi font-normal text-[16px] text-gray-700 leading-relaxed mb-4">
              The materials on Nicsan Insurance's website are provided on an 'as is' basis. Nicsan Insurance makes no warranties, 
              expressed or implied, and hereby disclaims and negates all other warranties including without limitation, implied 
              warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual 
              property or other violation of rights.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="font-satoshi font-bold text-[24px] text-design-black mb-4">
              6. Limitations
            </h2>
            <p className="font-satoshi font-normal text-[16px] text-gray-700 leading-relaxed mb-4">
              In no event shall Nicsan Insurance or its suppliers be liable for any damages (including, without limitation, 
              damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use 
              the materials on Nicsan Insurance's website, even if Nicsan Insurance or a Nicsan Insurance authorized representative 
              has been notified orally or in writing of the possibility of such damage.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="font-satoshi font-bold text-[24px] text-design-black mb-4">
              7. Accuracy of Materials
            </h2>
            <p className="font-satoshi font-normal text-[16px] text-gray-700 leading-relaxed mb-4">
              The materials appearing on Nicsan Insurance's website could include technical, typographical, or photographic errors. 
              Nicsan Insurance does not warrant that any of the materials on its website are accurate, complete or current. 
              Nicsan Insurance may make changes to the materials contained on its website at any time without notice.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="font-satoshi font-bold text-[24px] text-design-black mb-4">
              8. Links
            </h2>
            <p className="font-satoshi font-normal text-[16px] text-gray-700 leading-relaxed mb-4">
              Nicsan Insurance has not reviewed all of the sites linked to its website and is not responsible for the contents 
              of any such linked site. The inclusion of any link does not imply endorsement by Nicsan Insurance of the site. 
              Use of any such linked website is at the user's own risk.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="font-satoshi font-bold text-[24px] text-design-black mb-4">
              9. Modifications
            </h2>
            <p className="font-satoshi font-normal text-[16px] text-gray-700 leading-relaxed mb-4">
              Nicsan Insurance may revise these terms of service for its website at any time without notice. By using this website 
              you are agreeing to be bound by the then current version of these Terms and Conditions of Use.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="font-satoshi font-bold text-[24px] text-design-black mb-4">
              10. Governing Law
            </h2>
            <p className="font-satoshi font-normal text-[16px] text-gray-700 leading-relaxed mb-4">
              These terms and conditions are governed by and construed in accordance with the laws of India and you irrevocably 
              submit to the exclusive jurisdiction of the courts in that state or location.
            </p>
          </section>

          

          
        </div>

        {/* Back Button */}
        <div className="text-center mt-12">
          <button 
            onClick={handleBackClick}
            className="bg-primary-blue text-white font-satoshi font-bold px-8 py-3 rounded-[10px] hover:bg-[#012E58] transition-colors"
          >
            ← Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions;
