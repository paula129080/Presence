import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PlanCard from '@/components/PlanCard';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Shield, Clock, Users } from 'lucide-react';

export default function Plans() {
  const [showModal, setShowModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState('');

  const handleSelectPlan = (planName: string) => {
    setSelectedPlan(planName);
    setShowModal(true);
  };

  const handlePayment = () => {
    setTimeout(() => {
      setShowModal(false);
      alert('Payment Successful! Redirecting to dashboard...');
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Choose Your Plan</h1>
          <p className="text-gray-600 mb-8">Choose the plan that suits how you connect — flexible options for one chat or ongoing conversations.</p>

          
          <div className="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto mb-12">
            <div className="flex flex-col items-center p-4 bg-gray-50 rounded-lg">
              <Shield className="w-8 h-8 text-[#4285B9] mb-2" />
              <p className="text-sm font-semibold">Verified Hosts</p>
              <p className="text-xs text-gray-600">ID & behavioral screening</p>
            </div>
            <div className="flex flex-col items-center p-4 bg-gray-50 rounded-lg">
              <Clock className="w-8 h-8 text-[#4285B9] mb-2" />
              <p className="text-sm font-semibold">24/7 Access</p>
              <p className="text-xs text-gray-600">Global timezone coverage</p>
            </div>
            <div className="flex flex-col items-center p-4 bg-gray-50 rounded-lg">
              <Users className="w-8 h-8 text-[#4285B9] mb-2" />
              <p className="text-sm font-semibold">Safe Environment</p>
              <p className="text-xs text-gray-600">Template-guided chats</p>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <PlanCard
            name="Adhoc"
            price={18}
            chats={1}
            hosts="Any Host"
            hostSplit={67}
            platformSplit={33}
            onSelect={() => handleSelectPlan('Adhoc')}
          />
          <PlanCard
            name="Weekly Access"
            price={40}
            chats={3}
            hosts="Any Host"
            hostSplit={75}
            platformSplit={25}
            onSelect={() => handleSelectPlan('Weekly Access')}
          />
        </div>

      </div>


      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Complete Payment</DialogTitle>
            <DialogDescription>You selected: {selectedPlan}</DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <p className="mb-4">Stripe checkout will be integrated here.</p>
            <Button onClick={handlePayment} className="w-full bg-[#E53935] hover:bg-[#c62828]">
              Mock Payment
            </Button>
          </div>
        </DialogContent>
      </Dialog>


      <Footer />
    </div>
  );
}
