import { useAccount, useWriteContract, useReadContract } from 'wagmi';
import { parseEther, formatEther } from 'viem';
import { useState, useEffect } from 'react';

// Contract addresses (these should be set after deployment)
const CONTRACT_ADDRESSES = {
  cryptClashPools: process.env.NEXT_PUBLIC_CRYPT_CLASH_POOLS_ADDRESS || '',
  fheEncryption: process.env.NEXT_PUBLIC_FHE_ENCRYPTION_ADDRESS || '',
  mockToken: process.env.NEXT_PUBLIC_MOCK_TOKEN_ADDRESS || '',
};

// Contract ABI (simplified for demonstration)
const CRYPT_CLASH_POOLS_ABI = [
  {
    "inputs": [
      {"internalType": "uint256", "name": "_entryFee", "type": "uint256"},
      {"internalType": "uint256", "name": "_maxParticipants", "type": "uint256"}
    ],
    "name": "createPool",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {"internalType": "uint256", "name": "_poolId", "type": "uint256"},
      {"internalType": "uint256", "name": "_encryptedBet", "type": "uint256"}
    ],
    "name": "joinPool",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {"internalType": "uint256", "name": "_poolId", "type": "uint256"},
      {"internalType": "uint256", "name": "_betAmount", "type": "uint256"}
    ],
    "name": "revealBet",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "uint256", "name": "_poolId", "type": "uint256"}],
    "name": "getPoolInfo",
    "outputs": [
      {"internalType": "uint256", "name": "id", "type": "uint256"},
      {"internalType": "address", "name": "creator", "type": "address"},
      {"internalType": "uint256", "name": "entryFee", "type": "uint256"},
      {"internalType": "uint256", "name": "maxParticipants", "type": "uint256"},
      {"internalType": "uint256", "name": "currentParticipants", "type": "uint256"},
      {"internalType": "bool", "name": "isActive", "type": "bool"},
      {"internalType": "bool", "name": "isMatchStarted", "type": "bool"},
      {"internalType": "uint256", "name": "totalPrize", "type": "uint256"},
      {"internalType": "uint256", "name": "createdAt", "type": "uint256"},
      {"internalType": "address[]", "name": "participants", "type": "address[]"}
    ],
    "stateMutability": "view",
    "type": "function"
  }
];

const FHE_ENCRYPTION_ABI = [
  {
    "inputs": [],
    "name": "generateFHEKey",
    "outputs": [{"internalType": "uint256", "name": "publicKey", "type": "uint256"}],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {"internalType": "uint256", "name": "_data", "type": "uint256"},
      {"internalType": "uint256", "name": "_recipientPublicKey", "type": "uint256"}
    ],
    "name": "encryptData",
    "outputs": [{"internalType": "uint256", "name": "dataId", "type": "uint256"}],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "uint256", "name": "_dataId", "type": "uint256"}],
    "name": "decryptData",
    "outputs": [{"internalType": "uint256", "name": "decryptedData", "type": "uint256"}],
    "stateMutability": "nonpayable",
    "type": "function"
  }
];

const MOCK_TOKEN_ABI = [
  {
    "inputs": [{"internalType": "uint256", "name": "amount", "type": "uint256"}],
    "name": "faucet",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "address", "name": "account", "type": "address"}],
    "name": "balanceOf",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
  }
];

export const useContract = () => {
  const { address, isConnected } = useAccount();
  const { writeContract, isPending, error } = useWriteContract();
  const [fhePublicKey, setFhePublicKey] = useState<string>('');
  const [encryptedData, setEncryptedData] = useState<Record<string, string>>({});

  // Generate FHE key for user
  const generateFHEKey = async () => {
    if (!isConnected || !CONTRACT_ADDRESSES.fheEncryption) return;

    try {
      const result = await writeContract({
        address: CONTRACT_ADDRESSES.fheEncryption as `0x${string}`,
        abi: FHE_ENCRYPTION_ABI,
        functionName: 'generateFHEKey',
      });
      
      if (result) {
        setFhePublicKey(result.toString());
      }
    } catch (err) {
      console.error('Error generating FHE key:', err);
    }
  };

  // Encrypt data using FHE
  const encryptData = async (data: string, recipientPublicKey?: string) => {
    if (!isConnected || !CONTRACT_ADDRESSES.fheEncryption) return;

    try {
      const dataValue = parseEther(data);
      const publicKey = recipientPublicKey || fhePublicKey;
      
      if (!publicKey) {
        throw new Error('No public key available');
      }

      const result = await writeContract({
        address: CONTRACT_ADDRESSES.fheEncryption as `0x${string}`,
        abi: FHE_ENCRYPTION_ABI,
        functionName: 'encryptData',
        args: [dataValue, BigInt(publicKey)],
      });

      if (result) {
        setEncryptedData(prev => ({
          ...prev,
          [data]: result.toString()
        }));
      }
    } catch (err) {
      console.error('Error encrypting data:', err);
    }
  };

  // Decrypt data using FHE
  const decryptData = async (dataId: string) => {
    if (!isConnected || !CONTRACT_ADDRESSES.fheEncryption) return;

    try {
      const result = await writeContract({
        address: CONTRACT_ADDRESSES.fheEncryption as `0x${string}`,
        abi: FHE_ENCRYPTION_ABI,
        functionName: 'decryptData',
        args: [BigInt(dataId)],
      });

      return result;
    } catch (err) {
      console.error('Error decrypting data:', err);
    }
  };

  // Create a new betting pool
  const createPool = async (entryFee: string, maxParticipants: number) => {
    if (!isConnected || !CONTRACT_ADDRESSES.cryptClashPools) return;

    try {
      const fee = parseEther(entryFee);
      
      const result = await writeContract({
        address: CONTRACT_ADDRESSES.cryptClashPools as `0x${string}`,
        abi: CRYPT_CLASH_POOLS_ABI,
        functionName: 'createPool',
        args: [fee, BigInt(maxParticipants)],
      });

      return result;
    } catch (err) {
      console.error('Error creating pool:', err);
    }
  };

  // Join a betting pool with encrypted bet
  const joinPool = async (poolId: string, betAmount: string) => {
    if (!isConnected || !CONTRACT_ADDRESSES.cryptClashPools) return;

    try {
      // First encrypt the bet amount
      const encryptedBetId = await encryptData(betAmount);
      
      if (!encryptedBetId) {
        throw new Error('Failed to encrypt bet');
      }

      const result = await writeContract({
        address: CONTRACT_ADDRESSES.cryptClashPools as `0x${string}`,
        abi: CRYPT_CLASH_POOLS_ABI,
        functionName: 'joinPool',
        args: [BigInt(poolId), BigInt(encryptedBetId)],
      });

      return result;
    } catch (err) {
      console.error('Error joining pool:', err);
    }
  };

  // Reveal bet after match completion
  const revealBet = async (poolId: string, betAmount: string) => {
    if (!isConnected || !CONTRACT_ADDRESSES.cryptClashPools) return;

    try {
      const bet = parseEther(betAmount);
      
      const result = await writeContract({
        address: CONTRACT_ADDRESSES.cryptClashPools as `0x${string}`,
        abi: CRYPT_CLASH_POOLS_ABI,
        functionName: 'revealBet',
        args: [BigInt(poolId), bet],
      });

      return result;
    } catch (err) {
      console.error('Error revealing bet:', err);
    }
  };

  // Get test tokens from faucet
  const getTestTokens = async (amount: string = '1000') => {
    if (!isConnected || !CONTRACT_ADDRESSES.mockToken) return;

    try {
      const tokenAmount = parseEther(amount);
      
      const result = await writeContract({
        address: CONTRACT_ADDRESSES.mockToken as `0x${string}`,
        abi: MOCK_TOKEN_ABI,
        functionName: 'faucet',
        args: [tokenAmount],
      });

      return result;
    } catch (err) {
      console.error('Error getting test tokens:', err);
    }
  };

  // Get pool information
  const getPoolInfo = async (poolId: string) => {
    if (!CONTRACT_ADDRESSES.cryptClashPools) return null;

    try {
      const result = await readContract({
        address: CONTRACT_ADDRESSES.cryptClashPools as `0x${string}`,
        abi: CRYPT_CLASH_POOLS_ABI,
        functionName: 'getPoolInfo',
        args: [BigInt(poolId)],
      });

      return result;
    } catch (err) {
      console.error('Error getting pool info:', err);
      return null;
    }
  };

  return {
    // State
    isConnected,
    isPending,
    error,
    fhePublicKey,
    encryptedData,
    
    // FHE Functions
    generateFHEKey,
    encryptData,
    decryptData,
    
    // Pool Functions
    createPool,
    joinPool,
    revealBet,
    getPoolInfo,
    
    // Token Functions
    getTestTokens,
  };
};
