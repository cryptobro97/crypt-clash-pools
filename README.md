# Crypt Clash Pools - FHE-Encrypted PvP Arena

A decentralized PvP betting platform where bets remain encrypted using Fully Homomorphic Encryption (FHE) until match conclusion. Built with React, TypeScript, and blockchain integration.

## Features

- **FHE-Encrypted Betting**: All bets are encrypted using Fully Homomorphic Encryption until match completion
- **Multi-Wallet Support**: Connect with Rainbow, MetaMask, WalletConnect, and other popular wallets
- **Real-time PvP Matches**: Join live combat pools and tournaments
- **Transparent Results**: Decrypted results only after match conclusion
- **Leaderboard System**: Track your performance across different pools

## Technology Stack

- **Frontend**: React 18, TypeScript, Vite
- **UI Components**: shadcn/ui, Radix UI, Tailwind CSS
- **Blockchain**: Wagmi, Viem, RainbowKit
- **Encryption**: FHE (Fully Homomorphic Encryption)
- **Networks**: Ethereum Sepolia Testnet

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Git

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

## Smart Contracts

The platform uses FHE-encrypted smart contracts for secure betting:

- **PoolFactory**: Creates and manages betting pools
- **BettingPool**: Individual pool contracts with FHE encryption
- **TournamentManager**: Handles tournament creation and management
- **FHEOracle**: Provides encrypted random number generation

## Deployment

### Vercel Deployment

1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Manual Deployment

```bash
# Build the project
npm run build

# Preview the build
npm run preview
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

MIT License - see LICENSE file for details

## Support

For support and questions, please open an issue on GitHub or contact the development team.
