import { Header } from "@/components/Header";
import { BettingPools } from "@/components/BettingPools";
import { Footer } from "@/components/Footer";

const ActivePools = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <BettingPools />
      <Footer />
    </div>
  );
};

export default ActivePools;