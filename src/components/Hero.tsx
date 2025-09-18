import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sword, Users, Lock, Trophy } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";

export const Hero = () => {
  return (
    <section 
      className="relative min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${heroBg})` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-background/80 bg-gradient-arena"></div>
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Main Headline */}
          <div className="mb-8">
            <Badge className="mb-4 bg-gradient-accent px-4 py-2 text-accent-foreground font-semibold">
              🛡️ Encrypted Betting Protocol
            </Badge>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                Fight First,
              </span>
              <br />
              <span className="bg-gradient-secondary bg-clip-text text-transparent">
                Reveal Bets Later
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join private PvP combat pools where bets stay encrypted until match conclusion. 
              Pure skill, zero manipulation.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button 
              size="lg" 
              className="neon-glow bg-gradient-primary hover:shadow-glow text-lg px-8 py-6"
            >
              <a href="/enter-arena" className="flex items-center">
                <Sword className="h-5 w-5 mr-3" />
                Enter Arena
              </a>
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="arena-glow text-lg px-8 py-6"
            >
              <a href="/active-pools" className="flex items-center">
                <Users className="h-5 w-5 mr-3" />
                View Active Pools
              </a>
            </Button>
          </div>

          {/* Feature Cards */}
          <div className="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            <Card className="arena-glow">
              <CardContent className="p-6 text-center">
                <Lock className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Encrypted Bets</h3>
                <p className="text-sm text-muted-foreground">
                  All wagers encrypted until combat ends
                </p>
              </CardContent>
            </Card>

            <Card className="arena-glow">
              <CardContent className="p-6 text-center">
                <Sword className="h-12 w-12 text-secondary mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">PvP Combat</h3>
                <p className="text-sm text-muted-foreground">
                  Player vs player battles decide outcomes
                </p>
              </CardContent>
            </Card>

            <Card className="arena-glow">
              <CardContent className="p-6 text-center">
                <Trophy className="h-12 w-12 text-accent mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Fair Rewards</h3>
                <p className="text-sm text-muted-foreground">
                  Skill-based victories, guaranteed payouts
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};