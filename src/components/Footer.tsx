import React, { useState } from 'react';
import apiService from '../services/api';
import emailService from '../services/emailService';

interface FooterProps {
  onNavigate?: (page: string) => void;
}

const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);

  const handleBookSafetyCall = () => {
    setShowForm(true);
    setShowThankYou(false);
    setFormData({ name: '', phone: '' });
    window.dispatchEvent(new CustomEvent('closeCardForms'));
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setShowThankYou(false);
    setFormData({ name: '', phone: '' });
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    
    try {
      // Submit form data to API
      await apiService.createSafetyCall({
        product_id: null,
        customer_name: formData.name,
        phone_number: formData.phone,
        email: '',
        form_data: formData
      });

      // Send email notification
      await emailService.sendFormspreeNotification({
        product_id: null,
        customer_name: formData.name,
        phone_number: formData.phone,
        email: '',
        form_data: formData
      });

      // Show thank you message
      setShowThankYou(true);
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleTermsClick = () => {
    if (onNavigate) {
      onNavigate('terms');
    }
  };

  const handlePrivacyClick = () => {
    if (onNavigate) {
      onNavigate('privacy');
    }
  };

  return (
    <footer className="bg-white text-black py-12 mt-16">
      <div className="max-w-[1440px] mx-auto px-10">
        {/* Top Band */}
        <div className="flex justify-between items-start mb-8">
          {/* Left Section - Logo and Button */}
          <div className="flex flex-col items-start space-y-4">
            {/* Logo */}
            <div className="flex items-center">
              <img 
                src="/images/logo-horizontal.png" 
                alt="Nicsan Insurance" 
                className="h-8 object-contain"
              />
            </div>
            {/* Button */}
            <button 
              onClick={handleBookSafetyCall}
              className="bg-primary-blue text-white font-satoshi font-bold px-6 py-3 rounded-lg hover:bg-[#012E58] transition-colors"
            >
              Book Safety Call
            </button>
          </div>

          {/* Right Section - Three Columns */}
          <div className="flex gap-16">
            {/* Products Column */}
            <div>
              <h4 className="font-satoshi font-bold text-[16px] text-black mb-4">
                Products
              </h4>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="font-satoshi font-normal text-[14px] text-black hover:text-gray-600 transition-colors">
                    Health Insurance
                  </a>
                </li>
                <li>
                  <a href="#" className="font-satoshi font-normal text-[14px] text-black hover:text-gray-600 transition-colors">
                    Life Insurance
                  </a>
                </li>
                <li>
                  <a href="#" className="font-satoshi font-normal text-[14px] text-black hover:text-gray-600 transition-colors">
                    Motor Insurance
                  </a>
                </li>
                <li>
                  <a href="#" className="font-satoshi font-normal text-[14px] text-black hover:text-gray-600 transition-colors">
                    Travel Insurance
                  </a>
                </li>
                <li>
                  <a href="#" className="font-satoshi font-normal text-[14px] text-black hover:text-gray-600 transition-colors">
                    Cyber Insurance
                  </a>
                </li>
                <li>
                  <a href="#" className="font-satoshi font-normal text-[14px] text-black hover:text-gray-600 transition-colors">
                    Home Insurance
                  </a>
                </li>
              </ul>
            </div>

            {/* General Column */}
            <div>
              <h4 className="font-satoshi font-bold text-[16px] text-black mb-4">
                General
              </h4>
              <ul className="space-y-2">
                <li>
                  <button 
                    onClick={handleTermsClick}
                    className="font-satoshi font-normal text-[14px] text-black hover:text-gray-600 transition-colors text-left"
                  >
                    Terms & Conditions
                  </button>
                </li>
                <li>
                  <button 
                    onClick={handlePrivacyClick}
                    className="font-satoshi font-normal text-[14px] text-black hover:text-gray-600 transition-colors text-left"
                  >
                    Privacy Policy
                  </button>
                </li>
                
              </ul>
            </div>

            {/* Need Help? Column */}
            <div>
              <h4 className="font-satoshi font-bold text-[16px] text-black mb-4">
                Need Help?
              </h4>
              <div className="space-y-2">
                <div>
                  <p className="font-satoshi font-normal text-[14px] text-black">
                    General Support: care@nicsanimf.com
                  </p>
                </div>
                <div>
                  <p className="font-satoshi font-normal text-[14px] text-black">
                    Hiring Queries: connect@nicsanimf.com
                  </p>
                </div>
                
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Band - Copyright and Disclaimer */}
        <div className="border-t border-gray-200 pt-8">
          <div className="flex justify-between items-start">
            {/* Left Section - Company Info Only */}
            <div className="flex flex-col items-start space-y-2">
              <p className="font-satoshi font-normal text-[12px] text-black">
                Nicsan © 2021-2025. All Rights Reserved.
              </p>
              <p className="font-satoshi font-normal text-[12px] text-black">
                Nicsan Insurance Marketing LLP
              </p>
              <p className="font-satoshi font-normal text-[12px] text-black">
                CIN: U74999KA2018PTC184423
              </p>
              <p className="font-satoshi font-normal text-[12px] text-black">
                IRDAI Registered Corporate Agent (Composite) License No{' '}
                <span className="underline">CA0738</span> valid till 9th December 2026
              </p>
            </div>

            {/* Right Section - Disclaimer */}
            <div className="max-w-2xl">
              <p className="font-satoshi font-normal text-[12px] text-black leading-relaxed">
                Disclaimer : The information contained in this website is presented purely for information purposes only provided as service to the internet community at large. It does not constitute insurance advice and we do not guarantee the accuracy, adequacy or the completeness of the information contained here.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Form Overlay */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-light-gray p-6 w-full max-w-md rounded-[24px] overflow-hidden relative">
            {/* X Close Button */}
            <button 
              onClick={handleCloseForm}
              className="absolute top-4 right-4 w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center hover:bg-gray-400 transition-colors z-10"
            >
              <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {showThankYou ? (
              /* Thank You Message */
              <div className="flex flex-col items-center justify-center text-center py-8">
                <div className="mb-6">
                  <h3 className="font-satoshi font-bold text-[32px] text-[#D7263D] leading-[1.16em] mb-4">
                    We've got your back.
                  </h3>
                  <p className="font-satoshi font-normal text-[16px] text-gray-700 leading-relaxed mb-3">
                    Your Ni Buddy is already looking into your request and will get in touch with you shortly.
                  </p>
                  <p className="font-satoshi font-normal text-[16px] text-gray-700 leading-relaxed mb-6">
                    In the meantime, grab a chai, we'll take it from here.
                  </p>
                  
                  {/* Social Media Icons */}
                  <div className="flex justify-center space-x-4 mb-6">
                    <a 
                      href="https://linkedin.com/company/nicsanin" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center hover:bg-gray-400 transition-colors"
                    >
                      <svg className="w-4 h-4 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                    </a>
                    <a 
                      href="https://x.com/nicsanin?s=11" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center hover:bg-gray-400 transition-colors"
                    >
                      <svg className="w-4 h-4 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                      </svg>
                    </a>
                    <a 
                      href="https://www.instagram.com/nicsanin?igsh=bzZ2cmFqMHFodzFt&utm_source=qr" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center hover:bg-gray-400 transition-colors"
                    >
                      <svg className="w-4 h-4 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                      </svg>
                    </a>
                  </div>
                  
                  {/* Close Button */}
                  <button 
                    onClick={handleCloseForm}
                    className="bg-[#004E98] text-white font-satoshi font-bold px-8 py-3 rounded-[10px] hover:bg-[#012E58] transition-colors text-[16px]"
                  >
                    Close
                  </button>
                </div>
              </div>
            ) : (
              <>
                {/* Form Header */}
                <div className="flex justify-between items-start mb-4">
                  <h3 className="font-satoshi font-normal text-[28px] text-design-black leading-[1.16em]">
                    Book Safety Call
                  </h3>
                </div>

                {/* Form Content */}
                <form onSubmit={handleFormSubmit} className="space-y-4">
                  <div>
                    <label className="block font-satoshi font-normal text-[15px] text-design-black mb-2">
                      Name:
                    </label>
                    <input 
                      type="text"
                      className="w-full px-4 py-3 bg-white rounded-[8px] border border-gray-300 focus:outline-none focus:border-primary-blue text-[15px]"
                      placeholder="Enter your full name"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      required
                    />
                  </div>

                  <div>
                    <label className="block font-satoshi font-normal text-[15px] text-design-black mb-2">
                      Phone No.:
                    </label>
                    <input 
                      type="tel"
                      className="w-full px-4 py-3 bg-white rounded-[8px] border border-gray-300 focus:outline-none focus:border-primary-blue text-[15px]"
                      placeholder="Enter your phone number"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      required
                    />
                  </div>

                  {/* Form Buttons */}
                  <div className="flex gap-3 pt-4">
                    <button 
                      type="button"
                      onClick={handleCloseForm}
                      disabled={submitting}
                      className="flex-1 text-design-black font-satoshi font-bold px-4 py-3 rounded-[10px] border-2 border-design-black hover:bg-gray-100 transition-colors text-[15px] disabled:opacity-50"
                    >
                      Cancel
                    </button>
                    <button 
                      type="submit"
                      disabled={submitting}
                      className="flex-1 bg-primary-blue text-button-text font-satoshi font-bold px-4 py-3 rounded-[10px] hover:bg-[#012E58] transition-colors text-[15px] shadow-md disabled:opacity-50"
                    >
                      {submitting ? 'Submitting...' : 'Schedule Safety Call'}
                    </button>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </footer>
  );
};

export default Footer;
