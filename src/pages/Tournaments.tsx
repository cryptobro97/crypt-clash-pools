import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Trophy, Users, Calendar, Clock, Award, Zap } from "lucide-react";

const mockTournaments = [
  {
    id: 1,
    name: "Cyber Championship",
    type: "Elimination",
    prizePool: "50 ETH",
    entryFee: "0.5 ETH",
    participants: 48,
    maxParticipants: 64,
    startTime: "2h 30m",
    status: "registration",
    rounds: 6
  },
  {
    id: 2,
    name: "Neon Masters",
    type: "Round Robin",
    prizePool: "25 ETH",
    entryFee: "0.25 ETH",
    participants: 16,
    maxParticipants: 16,
    startTime: "Live - Round 2",
    status: "active",
    rounds: 8
  },
  {
    id: 3,
    name: "Arena Legends",
    type: "Swiss System",
    prizePool: "100 ETH",
    entryFee: "1 ETH",
    participants: 12,
    maxParticipants: 32,
    startTime: "24h",
    status: "registration",
    rounds: 5
  }
];

const Tournaments = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <section className="py-20 bg-gradient-arena">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                Tournament Arena
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Compete in structured tournaments with massive prize pools and encrypted betting.
            </p>
          </div>

          {/* Tournament Stats */}
          <div className="grid md:grid-cols-3 gap-6 mb-12 max-w-4xl mx-auto">
            <Card className="arena-glow text-center">
              <CardContent className="p-6">
                <Trophy className="h-12 w-12 text-primary mx-auto mb-4" />
                <div className="text-2xl font-bold text-primary">175 ETH</div>
                <p className="text-muted-foreground">Total Prize Pool</p>
              </CardContent>
            </Card>
            
            <Card className="arena-glow text-center">
              <CardContent className="p-6">
                <Users className="h-12 w-12 text-secondary mx-auto mb-4" />
                <div className="text-2xl font-bold text-secondary">76</div>
                <p className="text-muted-foreground">Active Players</p>
              </CardContent>
            </Card>
            
            <Card className="arena-glow text-center">
              <CardContent className="p-6">
                <Award className="h-12 w-12 text-accent mx-auto mb-4" />
                <div className="text-2xl font-bold text-accent">3</div>
                <p className="text-muted-foreground">Live Tournaments</p>
              </CardContent>
            </Card>
          </div>

          {/* Tournament List */}
          <div className="space-y-6 max-w-4xl mx-auto">
            {mockTournaments.map((tournament) => (
              <Card key={tournament.id} className="arena-glow hover:shadow-glow transition-glow">
                <CardHeader>
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <CardTitle className="text-2xl">{tournament.name}</CardTitle>
                      <p className="text-muted-foreground">{tournament.type} Tournament</p>
                    </div>
                    <Badge 
                      variant={tournament.status === 'active' ? 'default' : 'secondary'}
                      className={tournament.status === 'active' ? 'bg-gradient-secondary' : 'bg-gradient-accent'}
                    >
                      {tournament.status === 'active' ? 'LIVE' : 'OPEN'}
                    </Badge>
                  </div>
                </CardHeader>

                <CardContent className="space-y-6">
                  {/* Tournament Info Grid */}
                  <div className="grid md:grid-cols-4 gap-4">
                    <div className="text-center p-4 bg-muted/20 rounded-lg">
                      <Trophy className="h-6 w-6 text-primary mx-auto mb-2" />
                      <div className="text-lg font-bold text-primary">{tournament.prizePool}</div>
                      <p className="text-sm text-muted-foreground">Prize Pool</p>
                    </div>
                    
                    <div className="text-center p-4 bg-muted/20 rounded-lg">
                      <Users className="h-6 w-6 text-secondary mx-auto mb-2" />
                      <div className="text-lg font-bold">{tournament.participants}/{tournament.maxParticipants}</div>
                      <p className="text-sm text-muted-foreground">Players</p>
                    </div>
                    
                    <div className="text-center p-4 bg-muted/20 rounded-lg">
                      <Calendar className="h-6 w-6 text-accent mx-auto mb-2" />
                      <div className="text-lg font-bold">{tournament.rounds}</div>
                      <p className="text-sm text-muted-foreground">Rounds</p>
                    </div>
                    
                    <div className="text-center p-4 bg-muted/20 rounded-lg">
                      <Clock className="h-6 w-6 text-muted-foreground mx-auto mb-2" />
                      <div className="text-lg font-bold">{tournament.startTime}</div>
                      <p className="text-sm text-muted-foreground">Start Time</p>
                    </div>
                  </div>

                  {/* Registration Progress */}
                  {tournament.status === 'registration' && (
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Registration Progress</span>
                        <span>{Math.round((tournament.participants / tournament.maxParticipants) * 100)}%</span>
                      </div>
                      <Progress 
                        value={(tournament.participants / tournament.maxParticipants) * 100} 
                        className="h-3"
                      />
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex items-center justify-between pt-4">
                    <div className="text-sm">
                      <span className="text-muted-foreground">Entry Fee: </span>
                      <span className="font-semibold text-primary">{tournament.entryFee}</span>
                    </div>
                    
                    <div className="flex space-x-3">
                      {tournament.status === 'active' ? (
                        <Button className="bg-gradient-secondary neon-glow">
                          <Zap className="h-4 w-4 mr-2" />
                          Watch Live
                        </Button>
                      ) : (
                        <>
                          <Button variant="outline" className="arena-glow">
                            View Bracket
                          </Button>
                          <Button className="bg-gradient-primary neon-glow">
                            Join Tournament
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button size="lg" variant="outline" className="arena-glow">
              View Tournament History
            </Button>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Tournaments;