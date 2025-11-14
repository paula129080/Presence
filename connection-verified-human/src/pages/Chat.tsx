import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Video, PhoneOff, Flag } from 'lucide-react';
import ConversationTemplates from '@/components/ConversationTemplates';
import EnvironmentSelector from '@/components/EnvironmentSelector';
import RatingModal from '@/components/RatingModal';
import AutomatedMessaging from '@/components/AutomatedMessaging';


export default function Chat() {
  const navigate = useNavigate();
  const [showEndModal, setShowEndModal] = useState(false);
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [environment, setEnvironment] = useState('The Beach');
  const [sessionStatus, setSessionStatus] = useState<'pre-session' | 'active' | 'post-session'>('active');

  useEffect(() => {
    // Simulate pre-session message 5 seconds before
    const timer = setTimeout(() => {
      setSessionStatus('active');
    }, 5000);
    
    return () => clearTimeout(timer);
  }, []);


  const handleEndSession = () => {
    setSessionStatus('post-session');
    setShowEndModal(false);
    setShowRatingModal(true);
  };


  const handleRatingClose = () => {
    setShowRatingModal(false);
    navigate('/member-dashboard');
  };

  const handleUseTemplate = (text: string) => {
    alert(`Template inserted: "${text}"`);
  };

  const handleReport = () => {
    alert('Report submitted. Admin has been notified via SMS.');
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center">
                    <Video className="mr-2" />
                    Video Chat - {environment}
                  </span>
                  <Button variant="outline" size="sm" onClick={handleReport}>
                    <Flag className="w-4 h-4 mr-1" />
                    Report
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="aspect-video bg-gray-900 rounded-lg flex items-center justify-center text-white">
                  <div className="text-center">
                    <Video className="w-16 h-16 mx-auto mb-4 opacity-50" />
                    <p>Daily.co Video Frame</p>
                    <p className="text-sm opacity-75 mt-2">Integration pending</p>
                  </div>
                </div>
                <div className="mt-4 flex justify-center">
                  <Button onClick={() => setShowEndModal(true)} variant="destructive" size="lg">
                    <PhoneOff className="mr-2" />
                    End Session
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-4">
            <AutomatedMessaging sessionStatus={sessionStatus} userType="member" />
            
            <Card>
              <CardHeader>
                <CardTitle>Session Info</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <div><strong>Host:</strong> Sophie T.</div>
                <div><strong>Time:</strong> 2:00 PM</div>
                <div><strong>Duration:</strong> 30 min</div>
                <div><strong>Status:</strong> Active</div>
              </CardContent>
            </Card>

            <EnvironmentSelector selected={environment} onSelect={setEnvironment} />
            <ConversationTemplates onUseTemplate={handleUseTemplate} />
          </div>
        </div>
      </div>

      <Dialog open={showEndModal} onOpenChange={setShowEndModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Session Complete</DialogTitle>
            <DialogDescription>Thank you for connecting with Presence!</DialogDescription>
          </DialogHeader>
          <Button onClick={handleEndSession} className="bg-[#2563EB]">
            Continue to Rating
          </Button>
        </DialogContent>
      </Dialog>

      <RatingModal open={showRatingModal} onClose={handleRatingClose} hostName="Sophie T." />
    </div>
  );
}
