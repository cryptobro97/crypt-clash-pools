import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Lock, 
  Eye, 
  EyeOff, 
  Shield, 
  Zap, 
  Trophy,
  Coins,
  Key
} from 'lucide-react';
import { useContract } from '@/hooks/useContract';

export const EncryptedBetting = () => {
  const {
    isConnected,
    isPending,
    fhePublicKey,
    encryptedData,
    generateFHEKey,
    encryptData,
    decryptData,
    createPool,
    joinPool,
    revealBet,
    getTestTokens
  } = useContract();

  const [poolId, setPoolId] = useState('');
  const [entryFee, setEntryFee] = useState('0.1');
  const [maxParticipants, setMaxParticipants] = useState(4);
  const [betAmount, setBetAmount] = useState('0.05');
  const [showEncrypted, setShowEncrypted] = useState(false);
  const [status, setStatus] = useState('');

  const handleGenerateKey = async () => {
    setStatus('Generating FHE key...');
    try {
      await generateFHEKey();
      setStatus('FHE key generated successfully!');
    } catch (error) {
      setStatus('Error generating FHE key');
    }
  };

  const handleEncryptBet = async () => {
    if (!betAmount) return;
    
    setStatus('Encrypting bet data...');
    try {
      await encryptData(betAmount);
      setStatus('Bet encrypted and stored on-chain!');
    } catch (error) {
      setStatus('Error encrypting bet');
    }
  };

  const handleCreatePool = async () => {
    setStatus('Creating encrypted betting pool...');
    try {
      await createPool(entryFee, maxParticipants);
      setStatus('Pool created successfully!');
    } catch (error) {
      setStatus('Error creating pool');
    }
  };

  const handleJoinPool = async () => {
    if (!poolId || !betAmount) return;
    
    setStatus('Joining pool with encrypted bet...');
    try {
      await joinPool(poolId, betAmount);
      setStatus('Successfully joined pool with encrypted bet!');
    } catch (error) {
      setStatus('Error joining pool');
    }
  };

  const handleRevealBet = async () => {
    if (!poolId || !betAmount) return;
    
    setStatus('Revealing encrypted bet...');
    try {
      await revealBet(poolId, betAmount);
      setStatus('Bet revealed successfully!');
    } catch (error) {
      setStatus('Error revealing bet');
    }
  };

  const handleGetTestTokens = async () => {
    setStatus('Getting test tokens...');
    try {
      await getTestTokens('1000');
      setStatus('Test tokens received!');
    } catch (error) {
      setStatus('Error getting test tokens');
    }
  };

  if (!isConnected) {
    return (
      <Card className="arena-glow">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Encrypted Betting
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Alert>
            <Shield className="h-4 w-4" />
            <AlertDescription>
              Please connect your wallet to access encrypted betting features.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* FHE Key Generation */}
      <Card className="arena-glow">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Key className="h-5 w-5" />
            FHE Key Management
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {!fhePublicKey ? (
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Generate your FHE (Fully Homomorphic Encryption) key to encrypt your betting data.
              </p>
              <Button 
                onClick={handleGenerateKey}
                disabled={isPending}
                className="w-full bg-gradient-primary neon-glow"
              >
                <Key className="h-4 w-4 mr-2" />
                Generate FHE Key
              </Button>
            </div>
          ) : (
            <div className="space-y-2">
              <Badge variant="secondary" className="w-full justify-center">
                <Shield className="h-3 w-3 mr-1" />
                FHE Key Generated
              </Badge>
              <p className="text-xs text-muted-foreground font-mono break-all">
                Public Key: {fhePublicKey.slice(0, 20)}...
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Test Tokens */}
      <Card className="arena-glow">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Coins className="h-5 w-5" />
            Test Tokens
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Button 
            onClick={handleGetTestTokens}
            disabled={isPending}
            variant="outline"
            className="w-full"
          >
            <Coins className="h-4 w-4 mr-2" />
            Get 1000 Test Tokens
          </Button>
        </CardContent>
      </Card>

      {/* Create Pool */}
      <Card className="arena-glow">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="h-5 w-5" />
            Create Betting Pool
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="entryFee">Entry Fee (ETH)</Label>
              <Input
                id="entryFee"
                type="number"
                step="0.01"
                value={entryFee}
                onChange={(e) => setEntryFee(e.target.value)}
                placeholder="0.1"
              />
            </div>
            <div>
              <Label htmlFor="maxParticipants">Max Participants</Label>
              <Input
                id="maxParticipants"
                type="number"
                min="2"
                max="8"
                value={maxParticipants}
                onChange={(e) => setMaxParticipants(Number(e.target.value))}
              />
            </div>
          </div>
          <Button 
            onClick={handleCreatePool}
            disabled={isPending || !fhePublicKey}
            className="w-full bg-gradient-primary neon-glow"
          >
            <Trophy className="h-4 w-4 mr-2" />
            Create Encrypted Pool
          </Button>
        </CardContent>
      </Card>

      {/* Join Pool */}
      <Card className="arena-glow">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5" />
            Join Pool with Encrypted Bet
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-4">
            <div>
              <Label htmlFor="poolId">Pool ID</Label>
              <Input
                id="poolId"
                value={poolId}
                onChange={(e) => setPoolId(e.target.value)}
                placeholder="Enter pool ID"
              />
            </div>
            <div>
              <Label htmlFor="betAmount">Your Bet Amount (ETH)</Label>
              <Input
                id="betAmount"
                type="number"
                step="0.01"
                value={betAmount}
                onChange={(e) => setBetAmount(e.target.value)}
                placeholder="0.05"
              />
            </div>
          </div>
          
          <div className="flex gap-2">
            <Button 
              onClick={handleEncryptBet}
              disabled={isPending || !fhePublicKey}
              variant="outline"
              className="flex-1"
            >
              <Lock className="h-4 w-4 mr-2" />
              Encrypt Bet
            </Button>
            <Button 
              onClick={handleJoinPool}
              disabled={isPending || !fhePublicKey}
              className="flex-1 bg-gradient-primary neon-glow"
            >
              <Zap className="h-4 w-4 mr-2" />
              Join Pool
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Encrypted Data Display */}
      {Object.keys(encryptedData).length > 0 && (
        <Card className="arena-glow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Encrypted Data on Chain
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {Object.entries(encryptedData).map(([bet, encryptedId]) => (
              <div key={bet} className="flex items-center justify-between p-3 bg-muted/20 rounded-lg">
                <div>
                  <p className="text-sm font-medium">Bet: {bet} ETH</p>
                  <p className="text-xs text-muted-foreground font-mono">
                    Encrypted ID: {encryptedId.slice(0, 20)}...
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setShowEncrypted(!showEncrypted)}
                  >
                    {showEncrypted ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => decryptData(encryptedId)}
                    disabled={isPending}
                  >
                    Decrypt
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Reveal Bet */}
      <Card className="arena-glow">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Eye className="h-5 w-5" />
            Reveal Bet
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-4">
            <div>
              <Label htmlFor="revealPoolId">Pool ID</Label>
              <Input
                id="revealPoolId"
                value={poolId}
                onChange={(e) => setPoolId(e.target.value)}
                placeholder="Enter pool ID"
              />
            </div>
            <div>
              <Label htmlFor="revealBetAmount">Original Bet Amount (ETH)</Label>
              <Input
                id="revealBetAmount"
                type="number"
                step="0.01"
                value={betAmount}
                onChange={(e) => setBetAmount(e.target.value)}
                placeholder="0.05"
              />
            </div>
          </div>
          <Button 
            onClick={handleRevealBet}
            disabled={isPending}
            className="w-full bg-gradient-accent neon-glow"
          >
            <Eye className="h-4 w-4 mr-2" />
            Reveal Encrypted Bet
          </Button>
        </CardContent>
      </Card>

      {/* Status */}
      {status && (
        <Alert>
          <Shield className="h-4 w-4" />
          <AlertDescription>{status}</AlertDescription>
        </Alert>
      )}
    </div>
  );
};
