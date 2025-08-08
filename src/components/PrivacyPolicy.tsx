import React, { useEffect } from 'react';

interface PrivacyPolicyProps {
  onNavigate?: (page: string) => void;
}

const PrivacyPolicy: React.FC<PrivacyPolicyProps> = ({ onNavigate }) => {
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
            Privacy Policy
          </h1>
          <p className="font-satoshi font-normal text-[18px] text-gray-600">
            Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>

        {/* Content */}
        <div className="prose prose-lg max-w-none">
          <section className="mb-8">
            <p className="font-satoshi font-normal text-[16px] text-gray-700 leading-relaxed mb-4">
              Nicsan Insurance Marketing LLP (hereinafter referred to as "Nicsan" or "we" or "our" or "us") operates the website at https://nicsanin.com ("Site" or "Platform").
            </p>
            <p className="font-satoshi font-normal text-[16px] text-gray-700 leading-relaxed mb-4">
              We respect the privacy of each user of the Site ("you" or "user"), whether it is your first visit or you have visited us before. This Privacy Statement explains how we protect your privacy, how we treat information we collect on the Site that identifies an individual user ("Personal Information"), and how we use aggregated information.
            </p>
            <p className="font-satoshi font-normal text-[16px] text-gray-700 leading-relaxed mb-4">
              By registering for or using the Site, you signify your acceptance of this Privacy Statement. If you do not agree, you may not use the Site. We reserve the right to modify this Statement at any time by posting an updated notice on our homepage. Continued use of the Site after such changes indicates your agreement to them.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="font-satoshi font-bold text-[24px] text-design-black mb-4">
              1. Information Collection and Use
            </h2>
            <p className="font-satoshi font-normal text-[16px] text-gray-700 leading-relaxed mb-4">
              For a better experience while using our services, we may require you to provide certain personally identifiable information, including but not limited to:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li className="font-satoshi font-normal text-[16px] text-gray-700">First Name, Last Name, Email, and/or Phone Number.</li>
              <li className="font-satoshi font-normal text-[16px] text-gray-700">WhatsApp number (if you choose to interact with us via WhatsApp).</li>
              <li className="font-satoshi font-normal text-[16px] text-gray-700">Additional details such as location, age, health conditions, or income, when relevant to providing advice or quotes.</li>
            </ul>
            <p className="font-satoshi font-normal text-[16px] text-gray-700 leading-relaxed mb-4">
              This information will be retained by us and used as described in this Privacy Policy. In certain cases, information may be shared with relevant insurers, the Insurance Regulatory and Development Authority of India (IRDAI), or third-party service providers to facilitate your request.
            </p>
            <p className="font-satoshi font-normal text-[16px] text-gray-700 leading-relaxed mb-4">
              We also use analytics tools (e.g., Google Analytics) and service providers to collect information such as:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li className="font-satoshi font-normal text-[16px] text-gray-700">Browser type and version.</li>
              <li className="font-satoshi font-normal text-[16px] text-gray-700">Time and date of visits.</li>
              <li className="font-satoshi font-normal text-[16px] text-gray-700">Pages visited and time spent.</li>
              <li className="font-satoshi font-normal text-[16px] text-gray-700">IP address and device details.</li>
              <li className="font-satoshi font-normal text-[16px] text-gray-700">Newsletter opens and clicks.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="font-satoshi font-bold text-[24px] text-design-black mb-4">
              2. How We Use Your Information
            </h2>
            <p className="font-satoshi font-normal text-[16px] text-gray-700 leading-relaxed mb-4">
              We use your information to:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li className="font-satoshi font-normal text-[16px] text-gray-700">Provide, operate, and maintain our services.</li>
              <li className="font-satoshi font-normal text-[16px] text-gray-700">Manage your account as a registered user.</li>
              <li className="font-satoshi font-normal text-[16px] text-gray-700">Send service-related updates, offers, or recommendations.</li>
              <li className="font-satoshi font-normal text-[16px] text-gray-700">Improve website performance and navigation.</li>
              <li className="font-satoshi font-normal text-[16px] text-gray-700">Respond to inquiries and manage requests.</li>
              <li className="font-satoshi font-normal text-[16px] text-gray-700">Comply with legal and regulatory requirements.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="font-satoshi font-bold text-[24px] text-design-black mb-4">
              3. Cookies
            </h2>
            <p className="font-satoshi font-normal text-[16px] text-gray-700 leading-relaxed mb-4">
              We may use cookies and similar technologies to improve your experience, measure performance, and deliver relevant content. You can choose to disable cookies via your browser settings, but some site features may not function properly.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="font-satoshi font-bold text-[24px] text-design-black mb-4">
              4. Sharing Your Information
            </h2>
            <p className="font-satoshi font-normal text-[16px] text-gray-700 leading-relaxed mb-4">
              We may share your information with:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li className="font-satoshi font-normal text-[16px] text-gray-700">Insurers to process your applications or claims.</li>
              <li className="font-satoshi font-normal text-[16px] text-gray-700">Third-party service providers who assist in operations.</li>
              <li className="font-satoshi font-normal text-[16px] text-gray-700">Regulatory authorities as required by law.</li>
            </ul>
            <p className="font-satoshi font-normal text-[16px] text-gray-700 leading-relaxed mb-4">
              We do not sell your personal data to third parties.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="font-satoshi font-bold text-[24px] text-design-black mb-4">
              5. External Links
            </h2>
            <p className="font-satoshi font-normal text-[16px] text-gray-700 leading-relaxed mb-4">
              Our platform may contain links to external websites. We are not responsible for the privacy practices or content of such sites.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="font-satoshi font-bold text-[24px] text-design-black mb-4">
              6. Your Rights
            </h2>
            <p className="font-satoshi font-normal text-[16px] text-gray-700 leading-relaxed mb-4">
              You may have the right to:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li className="font-satoshi font-normal text-[16px] text-gray-700">Access the personal data we hold about you.</li>
              <li className="font-satoshi font-normal text-[16px] text-gray-700">Request correction or deletion of your data.</li>
              <li className="font-satoshi font-normal text-[16px] text-gray-700">Restrict or object to processing.</li>
              <li className="font-satoshi font-normal text-[16px] text-gray-700">Request transfer of your data.</li>
            </ul>
            <p className="font-satoshi font-normal text-[16px] text-gray-700 leading-relaxed mb-4">
              Requests can be sent to privacy@nicsanin.com. We will respond within 60 working days, subject to applicable regulations.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="font-satoshi font-bold text-[24px] text-design-black mb-4">
              7. Data Retention
            </h2>
            <p className="font-satoshi font-normal text-[16px] text-gray-700 leading-relaxed mb-4">
              We retain your personal data only as long as necessary to fulfill the purposes outlined in this Privacy Policy and to comply with legal requirements.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="font-satoshi font-bold text-[24px] text-design-black mb-4">
              8. Security
            </h2>
            <p className="font-satoshi font-normal text-[16px] text-gray-700 leading-relaxed mb-4">
              We use commercially reasonable measures to protect your information, but no method of online transmission or storage is 100% secure.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="font-satoshi font-bold text-[24px] text-design-black mb-4">
              9. Children's Privacy
            </h2>
            <p className="font-satoshi font-normal text-[16px] text-gray-700 leading-relaxed mb-4">
              Our services are not intended for individuals under 18. If we discover that we have collected personal information from a minor, we will delete it.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="font-satoshi font-bold text-[24px] text-design-black mb-4">
              10. Changes to This Privacy Policy
            </h2>
            <p className="font-satoshi font-normal text-[16px] text-gray-700 leading-relaxed mb-4">
              We may update this policy periodically. Changes will be posted on this page with the updated effective date.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="font-satoshi font-bold text-[24px] text-design-black mb-4">
              11. Contact Us
            </h2>
            <p className="font-satoshi font-normal text-[16px] text-gray-700 leading-relaxed mb-4">
              If you have questions about this Privacy Policy or how your data is handled, please contact:
            </p>
            <div className="bg-gray-50 p-4 rounded-lg mb-4">
              <p className="font-satoshi font-normal text-[16px] text-gray-700 mb-2">
                <strong>Email:</strong> privacy@nicsanin.com
              </p>
              <p className="font-satoshi font-normal text-[16px] text-gray-700">
                <strong>Address:</strong> Bengaluru, Karnataka, India
              </p>
            </div>
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

export default PrivacyPolicy;


