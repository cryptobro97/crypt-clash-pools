import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Wallet, Shield, Zap, CheckCircle, LogOut } from "lucide-react";
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount, useDisconnect } from 'wagmi';

const walletFeatures = [
  {
    icon: Shield,
    title: "FHE-Encrypted Security",
    description: "Your bets remain encrypted using Fully Homomorphic Encryption until match completion"
  },
  {
    icon: Zap,
    title: "Instant Transactions",
    description: "Lightning-fast deposits and withdrawals on Sepolia testnet"
  },
  {
    icon: CheckCircle,
    title: "Verified Protocols",
    description: "Smart contracts audited and battle-tested for maximum security"
  }
];

export const WalletConnection = () => {
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();

  return (
    <section className="py-20 bg-gradient-arena">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">
              <span className="bg-gradient-secondary bg-clip-text text-transparent">
                Enter the Arena
              </span>
            </h2>
            <p className="text-xl text-muted-foreground">
              Connect your wallet to join encrypted betting pools and start earning.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* Wallet Connection Card */}
            <Card className="arena-glow p-6">
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 p-4 bg-gradient-primary rounded-full w-fit neon-glow">
                  <Wallet className="h-8 w-8 text-primary-foreground" />
                </div>
                <CardTitle className="text-2xl">Connect Wallet</CardTitle>
                <p className="text-muted-foreground">
                  Required for pool entry and encrypted betting
                </p>
              </CardHeader>

              <CardContent className="space-y-4">
                {!isConnected ? (
                  <div className="space-y-3">
                    <ConnectButton.Custom>
                      {({
                        account,
                        chain,
                        openAccountModal,
                        openChainModal,
                        openConnectModal,
                        authenticationStatus,
                        mounted,
                      }) => {
                        const ready = mounted && authenticationStatus !== 'loading';
                        const connected =
                          ready &&
                          account &&
                          chain &&
                          (!authenticationStatus ||
                            authenticationStatus === 'authenticated');

                        return (
                          <div
                            {...(!ready && {
                              'aria-hidden': true,
                              'style': {
                                opacity: 0,
                                pointerEvents: 'none',
                                userSelect: 'none',
                              },
                            })}
                          >
                            {(() => {
                              if (!connected) {
                                return (
                                  <Button 
                                    size="lg" 
                                    className="w-full bg-gradient-primary neon-glow hover:shadow-glow"
                                    onClick={openConnectModal}
                                  >
                                    <Wallet className="h-5 w-5 mr-3" />
                                    Connect Wallet
                                    <Badge className="ml-auto bg-victory text-white">Required</Badge>
                                  </Button>
                                );
                              }

                              if (chain.unsupported) {
                                return (
                                  <Button 
                                    size="lg" 
                                    variant="destructive"
                                    className="w-full"
                                    onClick={openChainModal}
                                  >
                                    Wrong Network
                                  </Button>
                                );
                              }

                              return (
                                <div className="space-y-3">
                                  <div className="p-4 bg-muted/20 rounded-lg border border-primary/20">
                                    <div className="flex items-center justify-between">
                                      <div>
                                        <p className="text-sm text-muted-foreground">Connected as</p>
                                        <p className="font-mono text-sm">
                                          {account.displayName}
                                        </p>
                                      </div>
                                      <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={openAccountModal}
                                      >
                                        Manage
                                      </Button>
                                    </div>
                                  </div>
                                  
                                  <Button 
                                    size="lg" 
                                    variant="outline"
                                    className="w-full arena-glow"
                                    onClick={() => disconnect()}
                                  >
                                    <LogOut className="h-5 w-5 mr-3" />
                                    Disconnect
                                  </Button>
                                </div>
                              );
                            })()}
                          </div>
                        );
                      }}
                    </ConnectButton.Custom>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div className="p-4 bg-muted/20 rounded-lg border border-primary/20">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-muted-foreground">Connected as</p>
                          <p className="font-mono text-sm">
                            {address?.slice(0, 6)}...{address?.slice(-4)}
                          </p>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => disconnect()}
                        >
                          <LogOut className="h-4 w-4 mr-2" />
                          Disconnect
                        </Button>
                      </div>
                    </div>
                  </div>
                )}

                <div className="pt-4 text-center text-sm text-muted-foreground">
                  <p>
                    New to crypto wallets?{" "}
                    <a href="#" className="text-primary hover:text-primary-glow transition-neon">
                      Learn how to get started
                    </a>
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Features */}
            <div className="space-y-6">
              {walletFeatures.map((feature, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="p-3 bg-gradient-accent rounded-lg neon-glow">
                    <feature.icon className="h-6 w-6 text-accent-foreground" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </div>
                </div>
              ))}

              <div className="mt-8 p-4 bg-muted/20 rounded-lg border border-primary/20">
                <h4 className="font-semibold text-primary mb-2">Why Wallet Required?</h4>
                <p className="text-sm text-muted-foreground">
                  Your wallet enables secure betting pool entry, FHE-encrypted wager storage, 
                  and automatic prize distribution when matches conclude.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};