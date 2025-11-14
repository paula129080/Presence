import { MemberOnboardingMultiStep } from '@/components/MemberOnboardingMultiStep';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function MemberOnboarding() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 bg-gray-50">
        <MemberOnboardingMultiStep />
      </main>
      <Footer />
    </div>
  );
}
