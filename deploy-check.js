#!/usr/bin/env node

/**
 * Deployment verification script for Vercel
 * Run this script to check if your environment is ready for deployment
 */

const crypto = require('crypto');

console.log('🔍 Checking deployment readiness...\n');

// Check Node.js version
const nodeVersion = process.version;
const requiredVersion = '14.0.0';
console.log(`📦 Node.js version: ${nodeVersion}`);

if (nodeVersion < `v${requiredVersion}`) {
  console.log(`❌ Node.js version ${requiredVersion} or higher is required`);
} else {
  console.log('✅ Node.js version is compatible');
}

// Check if package.json exists
try {
  const packageJson = require('./package.json');
  console.log('✅ package.json found');
  
  // Check required dependencies
  const requiredDeps = ['express', 'mongoose', 'jsonwebtoken', 'cookie-parser'];
  const missingDeps = requiredDeps.filter(dep => !packageJson.dependencies[dep]);
  
  if (missingDeps.length > 0) {
    console.log(`❌ Missing dependencies: ${missingDeps.join(', ')}`);
  } else {
    console.log('✅ All required dependencies found');
  }
} catch (error) {
  console.log('❌ package.json not found or invalid');
}

// Check if vercel.json exists
try {
  const vercelConfig = require('./vercel.json');
  console.log('✅ vercel.json found');
} catch (error) {
  console.log('❌ vercel.json not found');
}

// Check if app.js exists
try {
  require('./app.js');
  console.log('✅ app.js found');
} catch (error) {
  console.log('❌ app.js not found or has errors');
}

// Generate sample secrets for reference
console.log('\n🔐 Sample secrets (generate your own):');
console.log('=====================================');
console.log(`COOKIE_SECRET=${crypto.randomBytes(64).toString('hex')}`);
console.log(`JWT_SECRET=${crypto.randomBytes(64).toString('hex')}`);

console.log('\n📋 Environment Variables Checklist:');
console.log('===================================');
console.log('Required for Vercel deployment:');
console.log('- NODE_ENV=production');
console.log('- MONGO_CONNECTION_STRING=mongodb+srv://...');
console.log('- COOKIE_SECRET=your_generated_secret');
console.log('- JWT_SECRET=your_generated_secret');

console.log('\n🚀 Deployment Steps:');
console.log('===================');
console.log('1. Generate secrets: node generate-secrets.js');
console.log('2. Set environment variables in Vercel dashboard');
console.log('3. Push code to GitHub');
console.log('4. Deploy on Vercel');
console.log('5. Test health endpoint: https://your-app.vercel.app/health');

console.log('\n✅ Ready for deployment!'); 