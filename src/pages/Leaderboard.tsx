import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Trophy, Medal, Award, TrendingUp } from "lucide-react";

const mockLeaderboard = [
  {
    rank: 1,
    name: "CyberGladiator",
    wins: 156,
    losses: 12,
    earnings: "45.8 ETH",
    winRate: 92.9,
    avatar: "CG"
  },
  {
    rank: 2,
    name: "NeonWarrior",
    wins: 134,
    losses: 23,
    earnings: "38.2 ETH",
    winRate: 85.4,
    avatar: "NW"
  },
  {
    rank: 3,
    name: "QuantumFighter",
    wins: 98,
    losses: 18,
    earnings: "29.5 ETH",
    winRate: 84.5,
    avatar: "QF"
  },
  {
    rank: 4,
    name: "VoidSlayer",
    wins: 87,
    losses: 15,
    earnings: "26.1 ETH",
    winRate: 85.3,
    avatar: "VS"
  },
  {
    rank: 5,
    name: "ArenaKing",
    wins: 76,
    losses: 19,
    earnings: "22.7 ETH",
    winRate: 80.0,
    avatar: "AK"
  }
];

const Leaderboard = () => {
  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="h-6 w-6 text-yellow-500" />;
      case 2:
        return <Medal className="h-6 w-6 text-gray-400" />;
      case 3:
        return <Award className="h-6 w-6 text-amber-600" />;
      default:
        return <span className="text-2xl font-bold text-muted-foreground">#{rank}</span>;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <section className="py-20 bg-gradient-arena">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                Arena Leaderboard
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Top gladiators ranked by skill, earnings, and arena dominance.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            {/* Top 3 Highlight */}
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              {mockLeaderboard.slice(0, 3).map((player) => (
                <Card key={player.rank} className="arena-glow hover:shadow-glow transition-glow">
                  <CardHeader className="text-center">
                    <div className="flex justify-center mb-4">
                      {getRankIcon(player.rank)}
                    </div>
                    <Avatar className="h-16 w-16 mx-auto mb-4">
                      <AvatarFallback className="bg-gradient-primary text-primary-foreground text-lg">
                        {player.avatar}
                      </AvatarFallback>
                    </Avatar>
                    <CardTitle className="text-xl">{player.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center space-y-3">
                    <div className="text-2xl font-bold text-primary">{player.earnings}</div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Wins</p>
                        <p className="font-semibold text-green-500">{player.wins}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Win Rate</p>
                        <p className="font-semibold">{player.winRate}%</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Full Leaderboard */}
            <Card className="arena-glow">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="h-5 w-5 mr-2" />
                  Complete Rankings
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockLeaderboard.map((player) => (
                    <div key={player.rank} className="flex items-center justify-between p-4 bg-muted/20 rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 flex justify-center">
                          {getRankIcon(player.rank)}
                        </div>
                        <Avatar>
                          <AvatarFallback className="bg-gradient-accent text-accent-foreground">
                            {player.avatar}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-semibold">{player.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {player.wins}W - {player.losses}L
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-6 text-sm">
                        <div className="text-center">
                          <p className="font-semibold text-primary">{player.earnings}</p>
                          <p className="text-muted-foreground">Earnings</p>
                        </div>
                        <Badge variant={player.winRate > 85 ? "default" : "secondary"}>
                          {player.winRate}% Win Rate
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Leaderboard;