import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Shield, Sword, Users, Trophy, Twitter, Github, MessageCircle } from "lucide-react";
import gladiatorHelmet from "@/assets/gladiator-helmet.png";

const HelmetScroll = () => {
  return (
    <div className="relative overflow-hidden bg-gradient-battle py-8 border-t border-primary/20">
      <div className="flex space-x-8 scroll-animation">
        {Array.from({ length: 20 }).map((_, i) => (
          <img
            key={i}
            src={gladiatorHelmet}
            alt="Gladiator Helmet"
            className="h-12 w-12 opacity-30 flex-shrink-0"
          />
        ))}
      </div>
      <div className="flex space-x-8 scroll-animation" style={{ animationDelay: '-15s' }}>
        {Array.from({ length: 20 }).map((_, i) => (
          <img
            key={i + 20}
            src={gladiatorHelmet}
            alt="Gladiator Helmet"
            className="h-12 w-12 opacity-30 flex-shrink-0"
          />
        ))}
      </div>
    </div>
  );
};

export const Footer = () => {
  return (
    <footer className="bg-gradient-arena border-t border-primary/20">
      <HelmetScroll />
      
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="md:col-span-1">
            <div className="flex items-center space-x-3 mb-4">
              <Sword className="h-8 w-8 text-primary" />
              <h3 className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                PvP Arena
              </h3>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              The future of competitive gaming with encrypted betting protocols.
            </p>
            <div className="flex space-x-3">
              <Button size="sm" variant="outline" className="arena-glow p-2">
                <Twitter className="h-4 w-4" />
              </Button>
              <Button size="sm" variant="outline" className="arena-glow p-2">
                <Github className="h-4 w-4" />
              </Button>
              <Button size="sm" variant="outline" className="arena-glow p-2">
                <MessageCircle className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Arena Section */}
          <div>
            <h4 className="font-semibold text-foreground mb-4 flex items-center">
              <Shield className="h-4 w-4 mr-2 text-primary" />
              Arena
            </h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-neon">Active Pools</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-neon">Tournament Schedule</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-neon">Leaderboards</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-neon">Prize History</a></li>
            </ul>
          </div>

          {/* Protocol Section */}
          <div>
            <h4 className="font-semibold text-foreground mb-4 flex items-center">
              <Users className="h-4 w-4 mr-2 text-secondary" />
              Protocol
            </h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-neon">How It Works</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-neon">Encryption</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-neon">Security Audit</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-neon">Whitepaper</a></li>
            </ul>
          </div>

          {/* Support Section */}
          <div>
            <h4 className="font-semibold text-foreground mb-4 flex items-center">
              <Trophy className="h-4 w-4 mr-2 text-accent" />
              Support
            </h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-neon">Documentation</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-neon">Help Center</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-neon">Discord</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-neon">Bug Reports</a></li>
            </ul>
          </div>
        </div>

        <Separator className="my-8 bg-primary/20" />

        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground">
          <p>© 2024 PvP Arena. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-primary transition-neon">Privacy Policy</a>
            <a href="#" className="hover:text-primary transition-neon">Terms of Service</a>
            <a href="#" className="hover:text-primary transition-neon">Responsible Gaming</a>
          </div>
        </div>
      </div>
    </footer>
  );
};