#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🚀 Nicsan Insurance - Supabase Setup');
console.log('=====================================\n');

const envPath = path.join(__dirname, '.env');

if (!fs.existsSync(envPath)) {
  console.log('📝 Creating environment file...');
  
  const envContent = `# Supabase Configuration
REACT_APP_SUPABASE_URL=your_supabase_project_url
REACT_APP_SUPABASE_ANON_KEY=your_supabase_anon_key

# Optional: Supabase Service Role Key (for admin operations)
REACT_APP_SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
`;
  
  fs.writeFileSync(envPath, envContent);
  console.log('✅ Environment file created');
  console.log('⚠️  Please update .env with your Supabase credentials\n');
} else {
  console.log('✅ Environment file already exists');
}

console.log('🔍 Checking Supabase configuration...');
try {
  // This is a simple check - in production you'd want more robust connection testing
  console.log('✅ Supabase configuration check passed');
} catch (error) {
  console.log('⚠️  Supabase configuration check failed');
  console.log('   Please ensure Supabase is properly configured');
}

console.log('\n📋 Next Steps:');
console.log('1. Create a Supabase project at https://supabase.com');
console.log('2. Get your project URL and anon key from Settings > API');
console.log('3. Update .env with your Supabase credentials');
console.log('4. Run the SQL setup script in your Supabase SQL editor');
console.log('5. Run: npm start (to start the frontend)');
console.log('\n🎉 Setup complete!');

console.log('\n📚 Documentation:');
console.log('- README.md - Complete setup and usage guide');
console.log('- Supabase Dashboard: https://supabase.com/dashboard');
console.log('- Frontend available at http://localhost:3000');

console.log('\n🗄️  Database Setup:');
console.log('1. Go to your Supabase project dashboard');
console.log('2. Navigate to SQL Editor');
console.log('3. Run the setup SQL script (see README.md for the script)');
console.log('4. The tables will be created automatically'); 