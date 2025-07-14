#!/bin/bash

# Life Insurance Recommendation Backend - Local Development Setup
echo "🚀 Setting up Life Insurance Recommendation Backend for local development..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    exit 1
fi

# Check if PostgreSQL is installed
if ! command -v psql &> /dev/null; then
    echo "❌ PostgreSQL is not installed. Please install PostgreSQL first."
    echo "   You can download it from: https://www.postgresql.org/download/"
    exit 1
fi

echo "✅ Node.js and PostgreSQL are installed"

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Create .env file if it doesn't exist
if [ ! -f .env ]; then
    echo "🔧 Creating .env file..."
    cp env.example .env
    echo "✅ .env file created. Please update it with your database credentials."
else
    echo "✅ .env file already exists"
fi

# Check if database exists
echo "🗄️  Checking database connection..."
if psql -h localhost -U postgres -d life_insurance -c "SELECT 1;" > /dev/null 2>&1; then
    echo "✅ Database 'life_insurance' exists and is accessible"
else
    echo "⚠️  Database 'life_insurance' not found or not accessible"
    echo "   Please create the database and run the setup script:"
    echo "   1. Create database: CREATE DATABASE life_insurance;"
    echo "   2. Run setup script: psql -h localhost -U postgres -d life_insurance -f scripts/setup-local-db.sql"
fi

echo ""
echo "🎉 Setup complete!"
echo ""
echo "Next steps:"
echo "1. Update .env file with your database credentials"
echo "2. Start the development server: npm run dev"
echo "3. Access the API at: http://localhost:3000"
echo "4. Access Swagger docs at: http://localhost:3000/api-docs"
echo ""
echo "Happy coding! 🚀" 