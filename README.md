# Crypt Clash Pools - FHE-Encrypted PvP Arena

A decentralized PvP betting platform where bets remain encrypted using Fully Homomorphic Encryption (FHE) until match conclusion. Built with React, TypeScript, and blockchain integration.

## 🚀 Features

- **FHE-Encrypted Betting**: All bets are encrypted using Fully Homomorphic Encryption until match completion
- **Multi-Wallet Support**: Connect with Rainbow, MetaMask, WalletConnect, and other popular wallets
- **Real-time PvP Matches**: Join live combat pools and tournaments
- **Transparent Results**: Decrypted results only after match conclusion
- **Leaderboard System**: Track your performance across different pools
- **Smart Contract Integration**: Deploy and interact with FHE-encrypted contracts

## 🛠 Technology Stack

- **Frontend**: React 18, TypeScript, Vite
- **UI Components**: shadcn/ui, Radix UI, Tailwind CSS
- **Blockchain**: Wagmi, Viem, RainbowKit
- **Encryption**: FHE (Fully Homomorphic Encryption)
- **Networks**: Ethereum Sepolia Testnet
- **Smart Contracts**: Solidity, OpenZeppelin, Hardhat

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Git
- MetaMask or compatible wallet

### Installation

```bash
# Clone the repository
git clone https://github.com/cryptobro97/crypt-clash-pools.git

# Navigate to the project directory
cd crypt-clash-pools

# Install dependencies
npm install

# Start the development server
npm run dev
```

### Environment Variables

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_CHAIN_ID=11155111
NEXT_PUBLIC_RPC_URL=https://sepolia.infura.io/v3/b18fb7e6ca7045ac83c41157ab93f990
NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=2ec9743d0d0cd7fb94dee1a7e6d33475
NEXT_PUBLIC_INFURA_API_KEY=b18fb7e6ca7045ac83c41157ab93f990
```

## 🔐 Smart Contracts

The platform uses FHE-encrypted smart contracts for secure betting:

- **CryptClashPools**: Main contract managing betting pools and matches
- **FHEEncryption**: FHE encryption/decryption utilities
- **MockERC20**: Test token for development

### Deploy Contracts

```bash
# Compile contracts
npm run compile

# Deploy to Sepolia testnet
npm run deploy

# Deploy to local network
npm run deploy:local
```

## 🚀 Deployment

### Vercel Deployment (Recommended)

1. **Connect Repository**: Link your GitHub repository to Vercel
2. **Set Environment Variables**: Configure all required environment variables
3. **Deploy**: Automatic deployment on push to main branch

### Quick Deploy Script

```bash
# Make deployment script executable
chmod +x deploy.sh

# Run deployment script
./deploy.sh
```

### Manual Deployment

```bash
# Build the project
npm run build

# Preview the build
npm run preview
```

## 📱 Usage

1. **Connect Wallet**: Use Rainbow, MetaMask, or WalletConnect
2. **Create Pool**: Set entry fee and maximum participants
3. **Join Pool**: Place encrypted bet using FHE
4. **Start Match**: Automatic match start when pool is full
5. **Reveal Bets**: Decrypt and reveal bets after match completion
6. **Claim Prize**: Winner automatically receives prize

## 🔧 Development

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run compile      # Compile smart contracts
npm run deploy       # Deploy to Sepolia
npm run deploy:local # Deploy to local network
npm run test         # Run tests
npm run lint         # Run linter
```

### Project Structure

```
crypt-clash-pools/
├── contracts/           # Smart contracts
│   ├── CryptClashPools.sol
│   ├── FHEEncryption.sol
│   └── MockERC20.sol
├── src/                # Frontend source
│   ├── components/     # React components
│   ├── pages/         # Page components
│   └── hooks/         # Custom hooks
├── public/            # Static assets
└── docs/             # Documentation
```

## 🔒 Security Features

- **FHE Encryption**: All bets encrypted until match completion
- **Smart Contract Security**: ReentrancyGuard, Ownable patterns
- **Access Control**: Role-based permissions
- **Emergency Functions**: Circuit breakers for emergencies

## 🌐 Network Configuration

- **Testnet**: Sepolia (Chain ID: 11155111)
- **RPC URL**: https://sepolia.infura.io/v3/b18fb7e6ca7045ac83c41157ab93f990
- **WalletConnect**: Project ID configured
- **Tokens**: Mock ERC20 for testing

## 📊 Monitoring

- **Vercel Analytics**: Built-in performance monitoring
- **Error Tracking**: Automatic error reporting
- **Smart Contract Events**: All transactions logged
- **FHE Operations**: Encryption/decryption tracking

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- **GitHub Issues**: [Report bugs and feature requests](https://github.com/cryptobro97/crypt-clash-pools/issues)
- **Documentation**: [Full documentation](https://github.com/cryptobro97/crypt-clash-pools/wiki)
- **Community**: Join our Discord for support

## 🎯 Roadmap

- [ ] Mainnet deployment
- [ ] Advanced FHE operations
- [ ] Mobile app development
- [ ] Cross-chain support
- [ ] Governance token
- [ ] Staking mechanisms

## 🙏 Acknowledgments

- OpenZeppelin for smart contract libraries
- RainbowKit for wallet integration
- Vercel for deployment platform
- FHE research community for encryption standards
