#!/bin/bash

echo "🚀 InternConnect Deployment Script"
echo "=================================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    print_status "Installing dependencies..."
    npm install
fi

# Test build
print_status "Testing build process..."
if npm run build; then
    print_success "Build successful!"
else
    print_error "Build failed! Please check the errors above."
    exit 1
fi

# Check for large files
print_status "Checking for large files..."
find public -name "*.pdf" -exec ls -lh {} \; | while read line; do
    size=$(echo $line | awk '{print $5}')
    file=$(echo $line | awk '{print $9}')
    print_warning "Large file found: $file ($size)"
done

# Display deployment options
echo ""
echo "🌐 Deployment Options:"
echo "======================"
echo "1. Vercel (Recommended)"
echo "   - Install: npm i -g vercel"
echo "   - Deploy: vercel"
echo ""
echo "2. Netlify"
echo "   - Install: npm install -g netlify-cli"
echo "   - Deploy: netlify deploy --build"
echo ""
echo "3. Manual upload"
echo "   - Upload dist/ folder to your hosting service"
echo ""

# Environment variables reminder
echo "📋 Environment Variables Needed:"
echo "================================"
echo "VITE_SUPABASE_PROJECT_ID=zeqjdntjzydoncuzcmhd"
echo "VITE_SUPABASE_PUBLISHABLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
echo "VITE_SUPABASE_URL=https://zeqjdntjzydoncuzcmhd.supabase.co"
echo "LOVABLE_API_KEY=your_lovable_api_key (for AI mentor)"
echo ""

print_success "Project is ready for deployment!"
print_status "See DEPLOYMENT_GUIDE.md for detailed instructions."

# Option to deploy with Vercel if available
if command -v vercel &> /dev/null; then
    echo ""
    read -p "Deploy to Vercel now? (y/n): " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        print_status "Deploying to Vercel..."
        vercel
    fi
fi
