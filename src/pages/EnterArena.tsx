import { Header } from "@/components/Header";
import { WalletConnection } from "@/components/WalletConnection";
import { Footer } from "@/components/Footer";

const EnterArena = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <WalletConnection />
      <Footer />
    </div>
  );
};

export default EnterArena;