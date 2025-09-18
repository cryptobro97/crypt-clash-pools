#!/bin/bash

# Crypt Clash Pools - Quick Deployment Script
# This script automates the deployment process to Vercel

echo "🚀 Starting Crypt Clash Pools deployment..."

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "❌ Vercel CLI not found. Installing..."
    npm install -g vercel
fi

# Check if user is logged in to Vercel
if ! vercel whoami &> /dev/null; then
    echo "🔐 Please log in to Vercel:"
    vercel login
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Build the project
echo "🔨 Building project..."
npm run build

# Deploy to Vercel
echo "🚀 Deploying to Vercel..."
vercel --prod

# Set environment variables
echo "🔧 Setting environment variables..."
vercel env add NEXT_PUBLIC_CHAIN_ID production
vercel env add NEXT_PUBLIC_RPC_URL production
vercel env add NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID production
vercel env add NEXT_PUBLIC_INFURA_API_KEY production

echo "✅ Deployment completed!"
echo "🌐 Your app is now live on Vercel!"
echo "📱 Test wallet connection and all features"
echo "🔗 Check the deployment URL in your Vercel dashboard"
