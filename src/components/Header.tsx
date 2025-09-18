import { Button } from "@/components/ui/button";
import { Wallet, Shield } from "lucide-react";
import logo from "@/assets/logo.png";

export const Header = () => {
  return (
    <header className="relative z-50 bg-gradient-arena border-b border-primary/20">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo Section */}
          <div className="flex items-center space-x-3">
            <img 
              src={logo} 
              alt="PvP Betting Arena" 
              className="h-12 w-12 neon-glow"
            />
            <div>
              <h1 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                PvP Arena
              </h1>
              <p className="text-xs text-muted-foreground">Fight First, Reveal Bets Later</p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <a href="/active-pools" className="text-foreground hover:text-primary transition-neon">
              Active Pools
            </a>
            <a href="/leaderboard" className="text-foreground hover:text-primary transition-neon">
              Leaderboard
            </a>
            <a href="/tournaments" className="text-foreground hover:text-primary transition-neon">
              Tournaments
            </a>
          </nav>

          {/* Wallet Connection */}
          <div className="flex items-center space-x-3">
            <Button variant="outline" size="sm" className="arena-glow">
              <Shield className="h-4 w-4 mr-2" />
              Encrypted
            </Button>
            <Button className="neon-glow bg-gradient-primary hover:shadow-glow">
              <a href="/enter-arena" className="flex items-center">
                <Wallet className="h-4 w-4 mr-2" />
                Enter Arena
              </a>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};