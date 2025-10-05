// Development utility to clear localStorage
// Run this in browser console to clear stored user session
console.log('🧹 Clearing InternConnect session...');
localStorage.removeItem('internconnect_user');
sessionStorage.clear();
console.log('✅ Session cleared! Reload the page to see login screen.');
