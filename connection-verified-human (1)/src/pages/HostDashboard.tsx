import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HostPromotionHub from '@/components/HostPromotionHub';
import { SessionCard } from '@/components/SessionCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { airtableService, PresenceOperation, HostRecord } from '@/lib/airtable';
import { useToast } from '@/hooks/use-toast';
import { DollarSign, Loader2, Calendar } from 'lucide-react';


export default function HostDashboard() {
  const [sessions, setSessions] = useState<PresenceOperation[]>([]);
  const [hostData, setHostData] = useState<HostRecord | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();


  useEffect(() => {
    fetchSessions();
    fetchHostData();
  }, []);

  const fetchHostData = async () => {
    // In production, get actual host ID from auth context
    const response = await airtableService.listRecords('Hosts', 1, "{Status}='Active'");
    if (response.records && response.records.length > 0) {
      setHostData(response.records[0] as HostRecord);
    }
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
  const handleJoinSession = async (operation: PresenceOperation) => {
    try {
      const bookingId = operation.fields['Cal.com Booking ID'];
      
      if (!bookingId) {
        toast({
          title: 'Error',
          description: 'No booking ID found for this session',
          variant: 'destructive'
        });
        return;
      }
      
      // Navigate to VideoSession page with bookingId and userType
      window.location.href = `/video-session?bookingId=${bookingId}&userType=host`;
      
      toast({
        title: 'Joining session',
        description: 'Loading video room...'
      });
    } catch (error) {
      console.error('Error joining session:', error);
    }
  };



  const totalEarnings = sessions.reduce((sum, s) => s.fields.Amount || 0, 0);
  const completedCount = sessions.filter(s => s.fields['Booking Status'] === 'Completed').length;
  const upcomingCount = sessions.filter(s => s.fields['Booking Status'] === 'Created').length;

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Host Dashboard</h1>
          <Button asChild>
            <Link to="/host-analytics">View Full Analytics</Link>
          </Button>
        </div>


        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="grid md:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Total Earnings</CardTitle>
                  <DollarSign className="h-4 w-4 text-[#E53935]" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">${totalEarnings.toFixed(2)}</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Completed Sessions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{completedCount}</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Upcoming</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{upcomingCount}</div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Your Sessions</CardTitle>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="flex justify-center py-8">
                    <Loader2 className="h-8 w-8 animate-spin text-[#2563EB]" />
                  </div>
                ) : sessions.length > 0 ? (
                  <div className="space-y-4">
                    {sessions.map(session => (
                      <SessionCard 
                        key={session.id} 
                        operation={session} 
                        userType="host"
                        onJoinSession={handleJoinSession}
                      />
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-center py-8">No sessions found</p>
                )}
              </CardContent>
            </Card>

            {hostData?.fields['Cal Link'] && (
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>Your Calendar</CardTitle>
                  <Calendar className="h-5 w-5 text-[#2563EB]" />
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-4">
                    Manage your availability on Cal.com. Members will see this calendar when booking with you.
                  </p>
                  <iframe 
                    src={hostData.fields['Cal Link']} 
                    width="100%" 
                    height="600" 
                    frameBorder="0"
                    className="rounded-lg border"
                  />
                </CardContent>
              </Card>
            )}
          </div>

          <div className="lg:col-span-1">
            <HostPromotionHub hostId="HST-12345" referralCount={7} />
          </div>
        </div>
      </div>


      <Footer />
    </div>
  );
}
