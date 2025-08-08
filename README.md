# Nicsan Insurance - Modern Insurance Website

A comprehensive insurance website built with React, TypeScript, and Tailwind CSS, featuring interactive insurance cards, dynamic forms, and a complete lead generation system.

## 🚀 Features

### Core Functionality
- **Interactive Insurance Cards**: 6 insurance types (Life, Health, Motor, Travel, Cyber, Home) with hover expansion effects
- **Dynamic Form System**: "Book Safety Call" forms with product-specific fields and validation
- **Lead Generation**: Complete database storage and email notification system
- **Thank You Messages**: Custom post-submission experience with social media integration
- **Responsive Design**: Mobile-friendly interface with modern UI/UX

### Insurance Products
- **Life Insurance**: Family protection and future security
- **Health Insurance**: Comprehensive healthcare coverage
- **Motor Insurance**: Vehicle protection and road safety
- **Travel Insurance**: International travel coverage
- **Cyber Insurance**: Digital protection and cybersecurity
- **Home Insurance**: Property and disaster protection

### User Experience
- **Hover Effects**: Smooth card expansion with cubic-bezier transitions
- **Form Validation**: Real-time input validation and error handling
- **Social Media Integration**: Direct links to LinkedIn, X (Twitter), and Instagram
- **Static Pages**: Terms & Conditions and Privacy Policy pages
- **Navigation**: Simple state-based routing system

## 🛠️ Tech Stack

### Frontend
- **React 18** with TypeScript for type safety
- **Tailwind CSS** for styling and responsive design
- **Custom CSS** for advanced animations and effects
- **SVG Icons** for crisp, scalable graphics

### Backend & Services
- **Supabase** (PostgreSQL) for database management
- **Formspree** for email notifications
- **Environment Variables** for secure configuration

### Development Tools
- **TypeScript** for type safety
- **ESLint** for code quality
- **Custom scrollbar styling**
- **Optimized transitions** for smooth animations

## 📋 Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Supabase account (free tier available)
- Formspree account (free tier available)

## 🚀 Quick Start

### 1. Clone and Install

```bash
git clone <your-repo-url>
cd nicsan-insurance
npm install
```

### 2. Environment Setup

1. **Run the setup script**:
   ```bash
   npm run setup
   ```

2. **Configure your `.env` file**:
   ```env
   REACT_APP_SUPABASE_URL=your_supabase_project_url
   REACT_APP_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

### 3. Database Setup

1. **Create Supabase Project**:
   - Go to [https://supabase.com](https://supabase.com)
   - Create a new project and wait for it to be ready

2. **Run Database Scripts**:
   - Use the SQL scripts in `supabase-email-setup.sql`
   - This creates all necessary tables and configurations

3. **Configure Email Notifications**:
   - Set up Formspree integration
   - Update email endpoints in `src/services/emailService.js`

### 4. Start Development

```bash
npm start
```

The application will be available at `http://localhost:3000`

## 📁 Project Structure

```
src/
├── components/
│   ├── Hero.tsx              # Main product grid and form overlays
│   ├── Header.tsx            # Navigation header with "Book Safety Call"
│   ├── Footer.tsx            # Footer with links and company info
│   ├── AboutUs.tsx           # About Us, Core Values, and Founders Notes
│   ├── TermsAndConditions.tsx # Terms & Conditions page
│   ├── PrivacyPolicy.tsx     # Privacy Policy page
│   └── insurance-cards/      # Individual insurance card components
│       ├── LifeInsuranceCard.tsx
│       ├── HealthInsuranceCard.tsx
│       ├── MotorInsuranceCard.tsx
│       ├── TravelInsuranceCard.tsx
│       ├── CyberInsuranceCard.tsx
│       └── HomeInsuranceCard.tsx
├── services/
│   ├── api.js               # Supabase API service
│   └── emailService.js      # Formspree email notifications
├── App.tsx                  # Main application with routing
├── index.css               # Global styles and animations
└── index.tsx               # Application entry point
```

## 🎨 Design Features

### Insurance Cards
- **Hover Expansion**: Cards expand vertically on hover with smooth transitions
- **Statistics Display**: Each card shows relevant industry statistics
- **Call-to-Action**: "Book Safety Call" buttons with hover effects
- **Z-index Layering**: Proper layering for overlapping effects

### Form System
- **Dynamic Fields**: Form fields generated based on product type
- **Validation**: Real-time input validation
- **Thank You Messages**: Custom post-submission experience
- **Social Media Links**: Direct integration with company social profiles

### Visual Design
- **Color Scheme**: Professional blue (#004E98) with red accents (#D7263D)
- **Typography**: Satoshi font family for modern, clean appearance
- **Animations**: Smooth cubic-bezier transitions
- **Responsive**: Mobile-first design approach

## 🔧 Configuration

### Database Schema
- **insurance_products**: Product information and form configurations
- **safety_call_requests**: Lead generation data storage
- **email_notifications**: Email notification logging

### Email Setup
- **Formspree Integration**: Handles all form submissions
- **Notification Templates**: Custom email templates for different products
- **Error Handling**: Comprehensive error logging and recovery

### Environment Variables
```env
REACT_APP_SUPABASE_URL=your_supabase_url
REACT_APP_SUPABASE_ANON_KEY=your_supabase_key
```

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Deploy Options
- **Vercel**: Connect your GitHub repository
- **Netlify**: Drag and drop the build folder
- **AWS S3**: Upload build files to S3 bucket
- **Any Static Hosting**: The app is fully static after build

## 📱 Responsive Design

The application is fully responsive and optimized for:
- **Desktop**: Full feature set with hover effects
- **Tablet**: Adapted layouts with touch-friendly interactions
- **Mobile**: Optimized for small screens with simplified navigation

## 🔗 Social Media Integration

The application includes direct links to:
- **LinkedIn**: [linkedin.com/company/nicsanin](https://linkedin.com/company/nicsanin)
- **X (Twitter)**: [x.com/nicsanin](https://x.com/nicsanin?s=11)
- **Instagram**: [instagram.com/nicsanin](https://www.instagram.com/nicsanin?igsh=bzZ2cmFqMHFodzFt&utm_source=qr)

## 📄 Legal Pages

- **Terms & Conditions**: Comprehensive terms of service
- **Privacy Policy**: Data protection and privacy information
- **IRDAI Compliance**: Regulatory compliance information

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📞 Support

For support or questions:
- **Email**: connect@nicsanimf.com
- **Website**: [nicsanin.com](https://nicsanin.com)

## 📄 License

This project is proprietary software owned by Nicsan Insurance Marketing LLP.

---

**Built with ❤️ by Nicsan Insurance Marketing LLP** 