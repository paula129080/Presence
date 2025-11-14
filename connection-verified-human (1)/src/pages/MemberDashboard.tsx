import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { SessionCard } from '@/components/SessionCard';
import LikeNotification from '@/components/LikeNotification';
import MemberVisibilityToggle from '@/components/MemberVisibilityToggle';

import NotificationBanner from '@/components/NotificationBanner';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { airtableService, PresenceOperation } from '@/lib/airtable';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';



export default function MemberDashboard() {
  const [activeTab, setActiveTab] = useState('upcoming');
  const [sessions, setSessions] = useState<PresenceOperation[]>([]);
  const [loading, setLoading] = useState(true);
  const [holidayMessage, setHolidayMessage] = useState<string>('');
  const [inactivityMessage, setInactivityMessage] = useState<string>('');
  const [showHolidayBanner, setShowHolidayBanner] = useState(false);
  const [showInactivityBanner, setShowInactivityBanner] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchSessions();
    checkNotifications();
  }, []);

  const checkNotifications = async () => {
    // Check for holiday message (Dec 20-26)
    const now = new Date();
    const month = now.getMonth();
    const date = now.getDate();
    const isHolidayPeriod = month === 11 && date >= 20 && date <= 26;

    if (isHolidayPeriod) {
      const response = await airtableService.listRecords('Templates');
      if (response.records) {
        const holidayTemplate = response.records.find(
          (r: any) => r.fields['Template Name'] === 'Holiday Message'
        );
        if (holidayTemplate) {
          setHolidayMessage(holidayTemplate.fields['Message Body'] || '');
          setShowHolidayBanner(true);
        }
      }
    }

    // Check for inactivity (mock - would check last_active from member record)
    const lastActive = localStorage.getItem('lastActive');
    if (lastActive) {
      const lastActiveDate = new Date(lastActive);
      const hoursSinceActive = (now.getTime() - lastActiveDate.getTime()) / (1000 * 60 * 60);
      
      if (hoursSinceActive > 48) {
        const response = await airtableService.listRecords('Templates');
        if (response.records) {
          const inactivityTemplate = response.records.find(
            (r: any) => r.fields['Template Name'] === 'Inactive 48h Reminder'
          );
          if (inactivityTemplate) {
            setInactivityMessage(inactivityTemplate.fields['Message Body'] || '');
            setShowInactivityBanner(true);
          }
        }
      }
    }
    
    // Update last active
    localStorage.setItem('lastActive', now.toISOString());
  };


  const fetchSessions = async () => {
    setLoading(true);
    const response = await airtableService.listRecords('Presence Operations');
    
    if (response.error) {
      toast({
        title: 'Error loading sessions',
        description: response.error,
        variant: 'destructive'
      });
    } else if (response.records) {
      setSessions(response.records as PresenceOperation[]);
    }
    setLoading(false);
  };

  // Remove the old handleJoinSession function - SessionCard now handles navigation internally


  const filteredSessions = sessions.filter(s => 
    activeTab === 'upcoming' 
      ? (s.fields['Booking Status'] === 'Created' || s.fields['Booking Status'] === 'Pending')
      : s.fields['Booking Status'] === 'Completed'
  );

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <LikeNotification memberId="M00123" />
      

      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">My Dashboard</h1>
          <div className="flex gap-3">
            <Button asChild variant="outline">
              <Link to="/member-profile">Edit Profile</Link>
            </Button>
            <Button asChild variant="outline">
              <Link to="/member-preferences">Preferences</Link>
            </Button>
            <Button asChild className="bg-[#2563EB]">
              <Link to="/host-selection">Book New Session</Link>
            </Button>
          </div>
        </div>


        {showHolidayBanner && (
          <NotificationBanner 
            message={holidayMessage}
            type="success"
            onDismiss={() => setShowHolidayBanner(false)}
          />
        )}

        {showInactivityBanner && (
          <NotificationBanner 
            message={inactivityMessage}
            type="info"
            onDismiss={() => setShowInactivityBanner(false)}
          />
        )}

        <div className="mb-6">
          <MemberVisibilityToggle memberId="M00123" />
        </div>



        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>
                  {activeTab === 'upcoming' ? 'Upcoming Sessions' : 'Completed Sessions'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="flex justify-center py-8">
                    <Loader2 className="h-8 w-8 animate-spin text-[#2563EB]" />
                  </div>
                ) : filteredSessions.length > 0 ? (
                  <div className="space-y-4">
                    {filteredSessions.map(session => (
                      <SessionCard 
                        key={session.id} 
                        operation={session} 
                        userType="member"
                      />

                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-center py-8">
                    No {activeTab} sessions found
                  </p>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      <Footer />
    </div>
  );
}
