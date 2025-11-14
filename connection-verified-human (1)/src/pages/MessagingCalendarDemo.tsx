import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import MessageFlowPreview from '@/components/MessageFlowPreview';
import { BookingCalendar } from '@/components/BookingCalendar';
import AutomatedMessaging from '@/components/AutomatedMessaging';
import { Button } from '@/components/ui/button';

export default function MessagingCalendarDemo() {
  const [sessionStatus, setSessionStatus] = useState<'pre-session' | 'active' | 'post-session'>('pre-session');
  const [showLike, setShowLike] = useState(false);
  const [showMutualLike, setShowMutualLike] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-4xl font-bold mb-4">Messaging & Calendar Integration Demo</h1>
        <p className="text-gray-600 mb-8">Preview of automated messaging flows and Cal.com calendar integration</p>

        <Tabs defaultValue="messaging" className="space-y-8">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="messaging">Messaging Flow</TabsTrigger>
            <TabsTrigger value="calendar">Calendar Integration</TabsTrigger>
            <TabsTrigger value="live">Live Demo</TabsTrigger>
          </TabsList>

          <TabsContent value="messaging">
            <MessageFlowPreview />
          </TabsContent>

          <TabsContent value="calendar">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Cal.com Integration</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p>When a host has a <code className="bg-gray-100 px-2 py-1 rounded">Cal Link</code> field in Airtable (e.g., https://cal.com/presence/host-username):</p>
                  <ul className="list-disc list-inside space-y-2 text-gray-700">
                    <li>Member sees Cal.com booking iframe embedded directly in the app</li>
                    <li>Host manages availability directly on Cal.com - no syncing needed</li>

                    <li>Booking confirmation is sent to both parties</li>
                  </ul>
                  <p className="mt-4">Without Cal.com integration, the custom calendar interface is shown with manual time selection.</p>
                </CardContent>
              </Card>

              <BookingCalendar
                hostId="demo-host"
                hostName="Demo Host"
                hostEmail="demo@presence.com"
                memberName="Demo Member"
                memberEmail="member@presence.com"
              />
            </div>
          </TabsContent>

          <TabsContent value="live">
            <Card>
              <CardHeader>
                <CardTitle>Live Messaging Demo</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2 mb-4">
                  <Button onClick={() => setSessionStatus('pre-session')}>Pre-Session</Button>
                  <Button onClick={() => setSessionStatus('active')}>Active</Button>
                  <Button onClick={() => setSessionStatus('post-session')}>Post-Session</Button>
                  <Button onClick={() => setShowLike(!showLike)} variant="outline">Toggle Like</Button>
                  <Button onClick={() => setShowMutualLike(!showMutualLike)} variant="outline">Toggle Mutual</Button>
                </div>

                <AutomatedMessaging 
                  sessionStatus={sessionStatus} 
                  userType="member"
                  isLiked={showLike}
                  isMutualLike={showMutualLike}
                />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      <Footer />
    </div>
  );
}
