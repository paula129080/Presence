import Header from '@/components/Header';
import Footer from '@/components/Footer';
import LegalDisclaimer from '@/components/LegalDisclaimer';
import HeroSection from '@/components/landing/HeroSection';
import HowItWorksSection from '@/components/landing/HowItWorksSection';
import PricingSection from '@/components/landing/PricingSection';
import WhyPresenceSection from '@/components/landing/WhyPresenceSection';
import HostSignupSection from '@/components/landing/HostSignupSection';
import SafetySection from '@/components/landing/SafetySection';
import AboutPlatformSection from '@/components/landing/AboutPlatformSection';
import FAQSection from '@/components/landing/FAQSection';

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <HeroSection />
      <HowItWorksSection />
      <PricingSection />
      <WhyPresenceSection />
      <HostSignupSection />
      <SafetySection />
      <AboutPlatformSection />
      <FAQSection />
      <LegalDisclaimer />
      <Footer />
    </div>
  );
}
