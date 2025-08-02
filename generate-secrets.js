#!/usr/bin/env node

/**
 * Generate secure secrets for JWT_SECRET and COOKIE_SECRET
 * Run this script with: node generate-secrets.js
 */

const crypto = require('crypto');

console.log('🔐 Generating secure secrets for your chat application...\n');

// Generate JWT_SECRET
const jwtSecret = crypto.randomBytes(64).toString('hex');
console.log('JWT_SECRET:');
console.log(jwtSecret);
console.log('');

// Generate COOKIE_SECRET
const cookieSecret = crypto.randomBytes(64).toString('hex');
console.log('COOKIE_SECRET:');
console.log(cookieSecret);
console.log('');

console.log('📝 Copy these secrets to your .env file:');
console.log('==========================================');
console.log(`JWT_SECRET=${jwtSecret}`);
console.log(`COOKIE_SECRET=${cookieSecret}`);
console.log('');

console.log('⚠️  Important Security Notes:');
console.log('- Never commit these secrets to Git');
console.log('- Use different secrets for development and production');
console.log('- Store production secrets securely in Vercel environment variables');
console.log('- Rotate these secrets every 3-6 months');
console.log('');

console.log('�� Happy coding!'); 