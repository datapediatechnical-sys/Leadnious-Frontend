import LandingNavbar from "@/components/LandingNavbar";
import Footer from "@/components/Footer";
import InsuranceHero from "@/components/enterprise/InsuranceHero";
import EnterpriseFeatures from "@/components/enterprise/EnterpriseFeatures";
import EnterpriseSolutions from "@/components/enterprise/EnterpriseSolutions";
import EnterpriseAutomation from "@/components/enterprise/EnterpriseAutomation";
import EnterpriseCTA from "@/components/enterprise/EnterpriseCTA";
import LogoCloud from "@/components/enterprise/LogoCloud";

export default function InsurancePage() {
  return (
    <div className="min-h-screen bg-background font-sans selection:bg-cyan-500/30">
      <LandingNavbar />

      <main>
        <InsuranceHero />
        <EnterpriseFeatures />
        <EnterpriseSolutions />
        <EnterpriseAutomation />
        <LogoCloud />
        <EnterpriseCTA />
      </main>

      <Footer />
    </div>
  );
}
