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
        // Use fallback data
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleBookSafetyCall = (cardType: 'health' | 'life' | 'motor' | 'travel' | 'cyber' | 'home') => {
    if (showHeroForm) {
      setShowHeroForm(false);
      setHeroFormData({ name: '', phone: '' });
    }
    setActiveCard(cardType);
    setShowForm(true);
  };

  const handleHeroBookSafetyCall = () => {
    if (showForm) {
      setShowForm(false);
      setActiveCard(null);
      setFormData({});
    }
    setShowHeroForm(true);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    
    try {
      const product = products.find(p => p.slug === activeCard);
      const productId = product ? product.id : null;

      await apiService.createSafetyCall({
        product_id: productId,
        customer_name: formData['Name'] || formData['name'] || '',
        phone_number: formData['Phone No.'] || formData['phone'] || '',
        email: formData['Email'] || formData['email'] || '',
        form_data: formData
      });

      await emailService.sendFormspreeNotification({
        product_id: productId,
        customer_name: formData['Name'] || formData['name'] || '',
        phone_number: formData['Phone No.'] || formData['phone'] || '',
        email: formData['Email'] || formData['email'] || '',
        form_data: formData
      });

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
      await apiService.createSafetyCall({
        product_id: null,
        customer_name: heroFormData.name,
        phone_number: heroFormData.phone,
        email: '',
        form_data: heroFormData
      });

      await emailService.sendFormspreeNotification({
        product_id: null,
        customer_name: heroFormData.name,
        phone_number: heroFormData.phone,
        email: '',
        form_data: heroFormData
      });

      setShowHeroThankYou(true);
    } catch (error) {
      console.error('Error submitting hero form:', error);
    } finally {
      setHeroSubmitting(false);
    }
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
    <section className="pt-4 pb-8 relative overflow-hidden">
      {/* Mobile-First Layout - Following Figma Design */}
      <div className="px-4">
        {/* Hero Content - Mobile Layout */}
        <div className="mb-6">
          {/* Main Headline - Split Layout */}
          <div className="flex flex-col lg:flex-row lg:items-start mb-6">
            <div className="lg:w-1/2">
              <h1 className="font-clash-display font-semibold text-3xl sm:text-4xl lg:text-hero text-design-black leading-[0.93em] mb-4 lg:mb-0">
                Insurance<br />
                Minus the<br />
                Drama
              </h1>
            </div>
            <div className="lg:w-1/2 lg:pl-8">
              <p className="font-satoshi font-normal text-base sm:text-lg lg:text-subheading text-design-black leading-[1.16em]">
                No drama, just coverage that works when life doesn't.
              </p>
            </div>
          </div>

          {/* Full-width CTA Button */}
          <button 
            onClick={handleHeroBookSafetyCall}
            className="bg-primary-blue text-button-text font-satoshi font-bold px-6 py-4 rounded-[10px] hover:bg-[#012E58] active:bg-[#012E58] transition-colors w-full text-base shadow-lg active:shadow-md mb-4"
          >
            Book Safety Call
          </button>

          {/* IRDA Description */}
          <p className="font-satoshi font-normal text-sm text-design-black leading-[1.16em] text-center">
            Licensed by IRDA and trusted by more than 1 lakh customers nationwide since 2018
          </p>
        </div>

        {/* Insurance Cards Grid - 3x2 Mobile Layout */}
        <div className="mb-8">
          <div className="grid grid-cols-3 gap-3 sm:gap-4">
            {/* Top Row */}
            <div className="relative col-span-1">
              <HealthInsuranceCard onBookSafetyCall={() => handleBookSafetyCall('health')} />
            </div>
            <div className="relative col-span-1">
              <LifeInsuranceCard onBookSafetyCall={() => handleBookSafetyCall('life')} />
            </div>
            <div className="relative col-span-1">
              <MotorInsuranceCard onBookSafetyCall={() => handleBookSafetyCall('motor')} />
            </div>

            {/* Bottom Row */}
            <div className="relative col-span-1">
              <HomeInsuranceCard onBookSafetyCall={() => handleBookSafetyCall('home')} />
            </div>
            <div className="relative col-span-1">
              <TravelInsuranceCard onBookSafetyCall={() => handleBookSafetyCall('travel')} />
            </div>
            <div className="relative col-span-1">
              <CyberInsuranceCard onBookSafetyCall={() => handleBookSafetyCall('cyber')} />
            </div>
          </div>
        </div>
      </div>

      {/* Hero Form Overlay */}
      {showHeroForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-light-gray p-4 sm:p-6 w-full max-w-md rounded-[20px] sm:rounded-[24px] overflow-hidden relative">
            {/* Close Button */}
            <button 
              onClick={() => {
                setShowHeroForm(false);
                setShowHeroThankYou(false);
                setHeroFormData({ name: '', phone: '' });
              }}
              className="absolute top-3 right-3 sm:top-4 sm:right-4 w-9 h-9 sm:w-8 sm:h-8 bg-gray-300 rounded-full flex items-center justify-center hover:bg-gray-400 active:bg-gray-500 transition-colors z-10 touch-manipulation"
            >
              <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {showHeroThankYou ? (
              /* Thank You Message */
              <div className="flex flex-col items-center justify-center text-center py-8">
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
                  <a href="https://linkedin.com/company/nicsanin" target="_blank" rel="noopener noreferrer"
                     className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center hover:bg-gray-400 transition-colors">
                    <svg className="w-4 h-4 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </a>
                  <a href="https://x.com/nicsanin?s=11" target="_blank" rel="noopener noreferrer"
                     className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center hover:bg-gray-400 transition-colors">
                    <svg className="w-4 h-4 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                    </svg>
                  </a>
                  <a href="https://www.instagram.com/nicsanin?igsh=bzZ2cmFqMHFodzFt&utm_source=qr" target="_blank" rel="noopener noreferrer"
                     className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center hover:bg-gray-400 transition-colors">
                    <svg className="w-4 h-4 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  </a>
                </div>
                
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
            ) : (
              <>
                {/* Form Header */}
                <div className="flex justify-between items-start mb-3 sm:mb-4">
                  <h3 className="font-satoshi font-normal text-xl sm:text-2xl lg:text-[28px] text-design-black leading-[1.16em]">
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
                      onChange={(e) => setHeroFormData(prev => ({ ...prev, name: e.target.value }))}
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
                      onChange={(e) => setHeroFormData(prev => ({ ...prev, phone: e.target.value }))}
                      required
                    />
                  </div>

                  {/* Form Buttons */}
                  <div className="flex gap-2 sm:gap-3 pt-3 sm:pt-4">
                    <button 
                      type="button"
                      onClick={() => {
                        setShowHeroForm(false);
                        setHeroFormData({ name: '', phone: '' });
                      }}
                      disabled={heroSubmitting}
                      className="flex-1 text-design-black font-satoshi font-bold px-3 py-3 sm:px-4 sm:py-3 rounded-[8px] sm:rounded-[10px] border-2 border-design-black hover:bg-gray-100 active:bg-gray-200 transition-colors text-sm sm:text-[15px] disabled:opacity-50 touch-manipulation"
                    >
                      Cancel
                    </button>
                    <button 
                      type="submit"
                      disabled={heroSubmitting}
                      className="flex-1 bg-primary-blue text-button-text font-satoshi font-bold px-3 py-3 sm:px-4 sm:py-3 rounded-[8px] sm:rounded-[10px] hover:bg-[#012E58] active:bg-[#012E58] transition-colors text-sm sm:text-[15px] shadow-md active:shadow-sm disabled:opacity-50 touch-manipulation"
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