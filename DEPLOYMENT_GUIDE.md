# Vercel Deployment Guide for Crypt Clash Pools

## Prerequisites

1. **Vercel Account**: Sign up at [vercel.com](https://vercel.com)
2. **GitHub Repository**: Ensure your code is pushed to GitHub
3. **Environment Variables**: Prepare the required environment variables

## Step-by-Step Deployment

### 1. Connect GitHub Repository to Vercel

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click "New Project" on the dashboard
3. Import your GitHub repository:
   - Select "Import Git Repository"
   - Choose `cryptobro97/crypt-clash-pools`
   - Click "Import"

### 2. Configure Project Settings

#### Framework Preset
- **Framework Preset**: Vite
- **Root Directory**: `./` (default)
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`

#### Environment Variables
Add the following environment variables in Vercel dashboard:

```env
NEXT_PUBLIC_CHAIN_ID=11155111
NEXT_PUBLIC_RPC_URL=your_sepolia_rpc_url
NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=your_wallet_connect_project_id
NEXT_PUBLIC_INFURA_API_KEY=your_infura_api_key
```

**⚠️ Security Note**: Replace placeholder values with your actual API keys. Never commit real API keys to the repository.

**How to add environment variables:**
1. In your Vercel project dashboard
2. Go to "Settings" tab
3. Click "Environment Variables"
4. Add each variable with its value
5. Make sure to select "Production", "Preview", and "Development" for all variables

### 3. Deploy Configuration

#### Build Settings
- **Node.js Version**: 18.x (recommended)
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`

#### Advanced Settings
- **Functions**: Not required for this project
- **Edge Functions**: Not required
- **Analytics**: Optional (can be enabled for monitoring)

### 4. Deploy the Project

1. Click "Deploy" button
2. Wait for the build process to complete
3. Vercel will automatically assign a domain (e.g., `crypt-clash-pools.vercel.app`)

### 5. Post-Deployment Configuration

#### Custom Domain (Optional)
1. Go to "Domains" tab in your Vercel project
2. Add your custom domain
3. Configure DNS settings as instructed

#### Environment Variables Verification
1. Go to "Settings" → "Environment Variables"
2. Verify all variables are set correctly
3. Redeploy if any changes were made

### 6. Smart Contract Deployment

#### Deploy to Sepolia Testnet
```bash
# Install dependencies
npm install

# Compile contracts
npm run compile

# Deploy to Sepolia (requires private key in .env)
npm run deploy
```

#### Update Frontend with Contract Addresses
1. After deployment, update the contract addresses in your frontend
2. Create a `contracts.json` file with deployed addresses
3. Update the frontend to use the deployed contract addresses

### 7. Testing the Deployment

#### Frontend Testing
1. Visit your Vercel domain
2. Test wallet connection (MetaMask, Rainbow, etc.)
3. Verify all pages load correctly
4. Test responsive design on mobile

#### Smart Contract Testing
1. Connect wallet to Sepolia testnet
2. Get test ETH from Sepolia faucet
3. Test pool creation and joining
4. Test FHE encryption/decryption

### 8. Monitoring and Maintenance

#### Vercel Analytics
1. Enable Vercel Analytics in project settings
2. Monitor performance and user behavior
3. Set up alerts for errors

#### Error Monitoring
1. Check Vercel function logs
2. Monitor browser console for errors
3. Set up error tracking (Sentry, etc.)

## Troubleshooting

### Common Issues

#### Build Failures
- **Issue**: Build fails with dependency errors
- **Solution**: Check `package.json` and `package-lock.json` are up to date
- **Command**: `npm install` locally to verify

#### Environment Variables
- **Issue**: Wallet connection fails
- **Solution**: Verify all environment variables are set correctly
- **Check**: WalletConnect Project ID and RPC URLs

#### Smart Contract Issues
- **Issue**: Contract calls fail
- **Solution**: Verify contract addresses and network
- **Check**: Ensure contracts are deployed to correct network

### Performance Optimization

#### Build Optimization
1. Enable Vercel's automatic optimizations
2. Use `npm run build` for production builds
3. Enable compression and caching

#### Frontend Optimization
1. Optimize images (use WebP format)
2. Enable lazy loading
3. Minimize bundle size

## Security Considerations

### Environment Variables
- Never commit private keys to repository
- Use Vercel's environment variable system
- Rotate keys regularly

### Smart Contract Security
- Audit contracts before mainnet deployment
- Use multi-signature wallets for contract ownership
- Implement proper access controls

## Support

### Documentation
- [Vercel Documentation](https://vercel.com/docs)
- [RainbowKit Documentation](https://www.rainbowkit.com/docs)
- [Wagmi Documentation](https://wagmi.sh/)

### Community
- GitHub Issues: Report bugs and feature requests
- Discord: Join the community for support
- Twitter: Follow for updates

## Deployment Checklist

- [ ] GitHub repository connected to Vercel
- [ ] Environment variables configured
- [ ] Build settings configured
- [ ] Project deployed successfully
- [ ] Custom domain configured (if applicable)
- [ ] Smart contracts deployed to testnet
- [ ] Frontend updated with contract addresses
- [ ] Wallet connection tested
- [ ] All pages tested
- [ ] Mobile responsiveness verified
- [ ] Performance monitoring enabled
- [ ] Error tracking configured

## Next Steps

1. **Mainnet Deployment**: Deploy contracts to Ethereum mainnet
2. **Token Integration**: Integrate with real ERC20 tokens
3. **Advanced Features**: Add more FHE operations
4. **UI/UX Improvements**: Enhance user experience
5. **Analytics**: Implement detailed analytics
6. **Security Audit**: Conduct comprehensive security audit
