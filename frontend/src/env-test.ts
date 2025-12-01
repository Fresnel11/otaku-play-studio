// Test file to verify environment variables
console.log('🔍 Environment Check:');
console.log('VITE_API_URL:', import.meta.env.VITE_API_URL);
console.log('VITE_GEMINI_API_KEY:', import.meta.env.VITE_GEMINI_API_KEY ? '✅ Set' : '❌ Not set');
console.log('MODE:', import.meta.env.MODE);
console.log('DEV:', import.meta.env.DEV);
console.log('PROD:', import.meta.env.PROD);

import { API_BASE_URL, API_ENDPOINTS } from './config/api';

console.log('\n📡 API Configuration:');
console.log('API_BASE_URL:', API_BASE_URL);
console.log('AUTH endpoint:', API_ENDPOINTS.AUTH);
console.log('GAMES endpoint:', API_ENDPOINTS.GAMES);
