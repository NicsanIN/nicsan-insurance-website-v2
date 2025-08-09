import React, { useState, useEffect } from 'react';
import HealthInsuranceCard from './HealthInsuranceCard';
import LifeInsuranceCard from './LifeInsuranceCard';
import CyberInsuranceCard from './CyberInsuranceCard';
import HomeInsuranceCard from './HomeInsuranceCard';
import MotorInsuranceCard from './MotorInsuranceCard';
import TravelInsuranceCard from './TravelInsuranceCard';
import apiService from '../services/api';
import emailService from '../services/emailService';

interface Product {
  id: number;
  name: string;
  slug: string;
  description: string;
  icon_path: string;
  statistics: any;
  form_fields: any[];
  expansion_direction: 'up' | 'down';
}

const Hero: React.FC = () => {
  const [showForm, setShowForm] = useState(false);
  const [activeCard, setActiveCard] = useState<'health' | 'life' | 'motor' | 'travel' | 'cyber' | 'home' | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [showHeroForm, setShowHeroForm] = useState(false);
  const [heroFormData, setHeroFormData] = useState({
    name: '',
    phone: ''
  });
  const [heroSubmitting, setHeroSubmitting] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);
  const [showHeroThankYou, setShowHeroThankYou] = useState(false);

  // Fetch products from API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const products = await apiService.getProducts();
        setProducts(products);
      } catch (error) {
        console.error('Error fetching products:', error);
        // Fallback to static data if API fails
        setProducts([
          {
            id: 1,
            name: 'Health',
            slug: 'health',
            description: 'Stay healthy, stay wealthy',
            icon_path: '/images/healthcare-icon.png',
            statistics: [
              'Indians still pay 45.98% of all healthcare costs out-of-pocket one medical bill can wipe out savings.',
              '₹ 70,558 — average health-claim size in FY 24, up 11% YoY thanks to medical inflation.'
            ],
            form_fields: ['Name', 'Phone No.', 'Age', 'Dependents', 'Target sum insured'],
            expansion_direction: 'down'
          },
          {
            id: 2,
            name: 'Life',
            slug: 'life',
            description: 'Secure your family\'s future',
            icon_path: '/images/life-insurance-icon.png',
            statistics: [
              'Life insurance provides financial security for your family in case of your untimely demise.',
              'Coverage can help pay for funeral expenses, outstanding debts, and living expenses.'
            ],
            form_fields: ['Name', 'Phone No.', 'Age', 'Dependents', 'Target sum insured'],
            expansion_direction: 'down'
          },
          {
            id: 3,
            name: 'Motor',
            slug: 'motor',
            description: 'Drive with confidence',
            icon_path: '/images/car.png',
            statistics: [
              'Motor insurance is mandatory by law in India.',
              'Comprehensive coverage protects against accidents, theft, and natural disasters.'
            ],
            form_fields: ['Name', 'Phone No.', 'Registration No', 'Policy expiry', 'Make', 'Model'],
            expansion_direction: 'down'
          },
          {
            id: 4,
            name: 'Travel',
            slug: 'travel',
            description: 'Travel worry-free',
            icon_path: '/images/world-icon.png',
            statistics: [
              'Travel insurance covers medical emergencies, trip cancellations, and lost baggage.',
              'Essential for international travel and domestic trips with valuable items.'
            ],
            form_fields: ['Name', 'Phone No.', 'Destination country/region', 'Trip start & end dates', 'Number of passengers'],
            expansion_direction: 'down'
          },
          {
            id: 5,
            name: 'Cyber',
            slug: 'cyber',
            description: 'Protect against cyber threats',
            icon_path: '/images/cyber-security-icon.png',
            statistics: [
              'SMBs are now the #1 target for hackers fewer resources, bigger pay-outs.',
              'India was the #2 most-attacked nation in 2024'
            ],
            form_fields: ['Name', 'Phone No.', 'Coverage needed', 'Any prior breaches or claims history?'],
            expansion_direction: 'up'
          },
          {
            id: 6,
            name: 'Home',
            slug: 'home',
            description: 'Protect your home and belongings',
            icon_path: '/images/honest.png',
            statistics: [
              '₹ 1 lakh cr+ (US $12 bn) in property losses from natural catastrophes hit India in 2023 alone.',
              'Floods drive 63% of those annual losses — they\'re now the number-one threat to property.'
            ],
            form_fields: ['Name', 'Phone No.', 'Cost of structure and interiors', 'Desired policy term'],
            expansion_direction: 'up'
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Listen for closeCardForms event from other components
  useEffect(() => {
    const handleCloseCardForms = () => {
      if (showForm) {
        setShowForm(false);
        setActiveCard(null);
        setFormData({});
      }
    };

    window.addEventListener('closeCardForms', handleCloseCardForms);
    return () => {
      window.removeEventListener('closeCardForms', handleCloseCardForms);
    };
  }, [showForm]);

  const handleBookSafetyCall = (cardType: 'health' | 'life' | 'motor' | 'travel' | 'cyber' | 'home') => {
    // Close hero form if it's open
    if (showHeroForm) {
      setShowHeroForm(false);
      setHeroFormData({ name: '', phone: '' });
    }
    setActiveCard(cardType);
    setShowForm(true);
  };

  const handleHeroBookSafetyCall = () => {
    // Close card form if it's open
    if (showForm) {
      setShowForm(false);
      setActiveCard(null);
      setFormData({});
    }
    setShowHeroForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setActiveCard(null);
    setFormData({});
  };

  const handleCloseHeroForm = () => {
    setShowHeroForm(false);
    setHeroFormData({ name: '', phone: '' });
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    
    try {
      // Find the product ID based on the active card
      const product = products.find(p => p.slug === activeCard);
      const productId = product ? product.id : null;

      // Submit form data to API
      await apiService.createSafetyCall({
        product_id: productId,
        customer_name: formData['Name'] || formData['name'] || '',
        phone_number: formData['Phone No.'] || formData['phone'] || '',
        email: formData['Email'] || formData['email'] || '',
        form_data: formData
      });

      // Send email notification
      await emailService.sendFormspreeNotification({
        product_id: productId,
        customer_name: formData['Name'] || formData['name'] || '',
        phone_number: formData['Phone No.'] || formData['phone'] || '',
        email: formData['Email'] || formData['email'] || '',
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

  const handleHeroFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setHeroSubmitting(true);
    
    try {
      // Submit form data to API
      await apiService.createSafetyCall({
        product_id: null,
        customer_name: heroFormData.name,
        phone_number: heroFormData.phone,
        email: '',
        form_data: heroFormData
      });

      // Send email notification
      await emailService.sendFormspreeNotification({
        product_id: null,
        customer_name: heroFormData.name,
        phone_number: heroFormData.phone,
        email: '',
        form_data: heroFormData
      });

      // Show thank you message
      setShowHeroThankYou(true);
    } catch (error) {
      console.error('Error submitting hero form:', error);
    } finally {
      setHeroSubmitting(false);
    }
  };

  const handleInputChange = (fieldName: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [fieldName]: value
    }));
  };

  const handleHeroInputChange = (field: string, value: string) => {
    setHeroFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Function to render form fields based on card type
  const renderFormFields = () => {
    if (!activeCard) return null;

    const product = products.find(p => p.slug === activeCard);
    if (!product) return null;

    // Handle both old format (string array) and new format (object array)
    const formFields = Array.isArray(product.form_fields) 
      ? product.form_fields.map(field => 
          typeof field === 'string' 
            ? { name: field, label: field, type: 'text', required: true, placeholder: `Enter ${field.toLowerCase()}` }
            : field
        )
      : [];

    return formFields.map((field, index) => (
      <div key={index}>
        <label className="block font-satoshi font-normal text-[15px] text-design-black mb-2">
          {field.label}:
        </label>
        <input 
          type={field.type || 'text'}
          className="w-full px-4 py-3 bg-white rounded-[8px] border border-gray-300 focus:outline-none focus:border-primary-blue text-[15px]"
          placeholder={field.placeholder || `Enter ${field.label.toLowerCase()}`}
          value={formData[field.name] || ''}
          onChange={(e) => handleInputChange(field.name, e.target.value)}
          required={field.required !== false}
        />
      </div>
    ));
  };

  if (loading) {
    return (
      <section className="pt-4 pb-16">
        <div className="flex justify-center items-center h-64">
          <div className="text-design-black">Loading...</div>
        </div>
      </section>
    );
  }

  return (
    <section className="pt-4 pb-16 relative overflow-x-auto">
      <div className="flex min-w-[1200px]">
        {/* Left Content - Fixed positioning from Figma */}
        <div className="w-[408px] space-y-8">
          {/* Main Headline */}
          <h1 className="font-clash-display font-semibold text-hero text-design-black leading-[0.93em]">
            Insurance<br />
            Minus the<br />
            Drama
          </h1>

          {/* Subtitle */}
          <p 
            className="font-satoshi font-normal text-subheading text-design-black leading-[1.16em] max-w-[408px]"
            style={{ marginBottom: '40px' }}
          >
            No drama, just coverage that works when life doesn't.
          </p>

          {/* CTA Button */}
          <button 
            onClick={handleHeroBookSafetyCall}
            className="bg-primary-blue text-button-text font-satoshi font-bold px-5 py-3.5 rounded-[10px] hover:bg-[#012E58] transition-colors"
          >
            Book Safety Call
          </button>

          {/* Description */}
          <p className="font-satoshi font-normal text-body text-design-black leading-[1.16em] max-w-[408px]">
            Licensed by IRDA and trusted by more than 1 lakh customers nationwide since 2018
          </p>
        </div>

        {/* Right Product Grid - Fixed positioning */}
        <div className="ml-[280px] relative">
          <div className="grid grid-cols-2 gap-x-4 gap-y-4">
            {/* Health Insurance Card */}
            <div className="relative">
              <HealthInsuranceCard onBookSafetyCall={() => handleBookSafetyCall('health')} />
            </div>

            {/* Life Insurance Card */}
            <div className="relative">
              <LifeInsuranceCard onBookSafetyCall={() => handleBookSafetyCall('life')} />
            </div>

            {/* Travel Insurance Card */}
            <div className="relative">
              <TravelInsuranceCard onBookSafetyCall={() => handleBookSafetyCall('travel')} />
            </div>

            {/* Motor Insurance Card */}
            <div className="relative">
              <MotorInsuranceCard onBookSafetyCall={() => handleBookSafetyCall('motor')} />
            </div>

            {/* Home Insurance Card */}
            <div className="relative">
              <HomeInsuranceCard onBookSafetyCall={() => handleBookSafetyCall('home')} />
            </div>

            {/* Cyber Insurance Card */}
            <div className="relative">
              <CyberInsuranceCard onBookSafetyCall={() => handleBookSafetyCall('cyber')} />
            </div>
          </div>

          {/* Cards Section Form Overlay - Constrained within section */}
          {showForm && (
            <div className="absolute inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center max-w-full max-h-full rounded-[24px] overflow-hidden">
              <div 
                className="bg-light-gray p-6 w-full h-full flex flex-col rounded-[24px] overflow-hidden max-w-full max-h-full relative"
                style={{
                  boxShadow: 'none',
                  border: 'none',
                  backgroundClip: 'padding-box',
                  outline: 'none',
                  filter: 'none',
                  backdropFilter: 'none'
                }}
              >
                {/* X Close Button */}
                <button 
                  onClick={() => {
                    setShowForm(false);
                    setShowThankYou(false);
                    setActiveCard(null);
                    setFormData({});
                  }}
                  className="absolute top-4 right-4 w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center hover:bg-gray-400 transition-colors z-10"
                >
                  <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>

                {showThankYou ? (
                  /* Thank You Message */
                  <div className="flex flex-col items-center justify-center h-full text-center">
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
                        onClick={() => {
                          setShowForm(false);
                          setShowThankYou(false);
                          setActiveCard(null);
                          setFormData({});
                        }}
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
                        {activeCard ? activeCard.charAt(0).toUpperCase() + activeCard.slice(1) : ''}
                        </h3>
                    </div>

                    {/* Form Content - Scrollable */}
                    <form onSubmit={handleFormSubmit} className="flex-1 overflow-y-auto">
                      <div className="space-y-4">
                        {/* Form Fields */}
                        <div className="space-y-4">
                          {renderFormFields()}
                        </div>
                      </div>

                      {/* Form Buttons - Fixed at bottom */}
                      <div className="pt-4 flex gap-3 mt-4">
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
        </div>
      </div>

      {/* Hero Form Overlay */}
      {showHeroForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-light-gray p-6 w-full max-w-md rounded-[24px] overflow-hidden relative">
            {/* X Close Button */}
            <button 
              onClick={() => {
                setShowHeroForm(false);
                setShowHeroThankYou(false);
                setHeroFormData({ name: '', phone: '' });
              }}
              className="absolute top-4 right-4 w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center hover:bg-gray-400 transition-colors z-10"
            >
              <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {showHeroThankYou ? (
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
                    onClick={() => {
                      setShowHeroForm(false);
                      setShowHeroThankYou(false);
                      setHeroFormData({ name: '', phone: '' });
                    }}
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
                <form onSubmit={handleHeroFormSubmit} className="space-y-4">
                  <div>
                    <label className="block font-satoshi font-normal text-[15px] text-design-black mb-2">
                      Name:
                    </label>
                    <input 
                      type="text"
                      className="w-full px-4 py-3 bg-white rounded-[8px] border border-gray-300 focus:outline-none focus:border-primary-blue text-[15px]"
                      placeholder="Enter your full name"
                      value={heroFormData.name}
                      onChange={(e) => handleHeroInputChange('name', e.target.value)}
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
                      value={heroFormData.phone}
                      onChange={(e) => handleHeroInputChange('phone', e.target.value)}
                      required
                    />
                  </div>

                  {/* Form Buttons */}
                  <div className="flex gap-3 pt-4">
                    <button 
                      type="button"
                      onClick={handleCloseHeroForm}
                      disabled={heroSubmitting}
                      className="flex-1 text-design-black font-satoshi font-bold px-4 py-3 rounded-[10px] border-2 border-design-black hover:bg-gray-100 transition-colors text-[15px] disabled:opacity-50"
                    >
                      Cancel
                    </button>
                    <button 
                      type="submit"
                      disabled={heroSubmitting}
                      className="flex-1 bg-primary-blue text-button-text font-satoshi font-bold px-4 py-3 rounded-[10px] hover:bg-[#012E58] transition-colors text-[15px] shadow-md disabled:opacity-50"
                    >
                      {heroSubmitting ? 'Submitting...' : 'Schedule Safety Call'}
                    </button>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </section>
  );
};

export default Hero; 