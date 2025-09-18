import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Clock, Users, Shield, Zap, Lock, Eye } from "lucide-react";
import { EncryptedBetting } from "./EncryptedBetting";

const mockPools = [
  {
    id: 1,
    title: "Cyber Gladiators",
    game: "Neural Combat",
    players: 16,
    maxPlayers: 32,
    poolSize: "2.5 ETH",
    timeLeft: "2h 15m",
    status: "filling",
    entryFee: "0.1 ETH"
  },
  {
    id: 2,
    title: "Neon Warriors",
    game: "Quantum Arena",
    players: 24,
    maxPlayers: 24,
    poolSize: "4.8 ETH",
    timeLeft: "Live",
    status: "active",
    entryFee: "0.2 ETH"
  },
  {
    id: 3,
    title: "Digital Duel",
    game: "Void Combat",
    players: 8,
    maxPlayers: 16,
    poolSize: "1.2 ETH",
    timeLeft: "45m",
    status: "filling",
    entryFee: "0.15 ETH"
  }
];

export const BettingPools = () => {
  return (
    <section className="py-20 bg-gradient-arena">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              ⚔️ Active Betting Pools
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Join encrypted betting pools where your wagers remain hidden until the final strike lands.
          </p>
        </div>

        {/* Encrypted Betting Interface */}
        <div className="mb-12">
          <EncryptedBetting />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {mockPools.map((pool) => (
            <Card key={pool.id} className="arena-glow hover:shadow-glow transition-glow">
              <CardHeader>
                <div className="flex justify-between items-start mb-2">
                  <CardTitle className="text-xl">{pool.title}</CardTitle>
                  <Badge 
                    variant={pool.status === 'active' ? 'default' : 'secondary'}
                    className={pool.status === 'active' ? 'bg-gradient-secondary' : 'bg-gradient-accent'}
                  >
                    {pool.status === 'active' ? 'LIVE' : 'FILLING'}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">{pool.game}</p>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Pool Stats */}
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center space-x-2">
                    <Users className="h-4 w-4 text-primary" />
                    <span>{pool.players}/{pool.maxPlayers}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-secondary" />
                    <span>{pool.timeLeft}</span>
                  </div>
                </div>

                {/* Progress */}
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Pool Progress</span>
                    <span>{Math.round((pool.players / pool.maxPlayers) * 100)}%</span>
                  </div>
                  <Progress 
                    value={(pool.players / pool.maxPlayers) * 100} 
                    className="h-2"
                  />
                </div>

                {/* Pool Size */}
                <div className="bg-muted/30 rounded-lg p-3 text-center">
                  <p className="text-sm text-muted-foreground">Total Pool</p>
                  <p className="text-2xl font-bold text-primary">{pool.poolSize}</p>
                </div>

                {/* Entry Info */}
                <div className="flex items-center justify-between pt-2">
                  <div className="flex items-center space-x-2 text-sm">
                    <Shield className="h-4 w-4 text-accent" />
                    <span>Entry: {pool.entryFee}</span>
                  </div>
                  <Button 
                    size="sm" 
                    className={pool.status === 'active' 
                      ? "bg-gradient-secondary neon-glow" 
                      : "bg-gradient-primary neon-glow"
                    }
                  >
                    {pool.status === 'active' ? (
                      <>
                        <Zap className="h-4 w-4 mr-2" />
                        Watch Live
                      </>
                    ) : (
                      "Join Pool"
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button size="lg" variant="outline" className="arena-glow">
            View All Pools
          </Button>
        </div>
      </div>
    </section>
  );
};