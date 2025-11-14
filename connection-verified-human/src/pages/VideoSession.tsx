import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PhoneOff, Flag, Loader2, Clock } from 'lucide-react';
import SessionPrompts from '@/components/SessionPrompts';
import RatingModal from '@/components/RatingModal';
import { supabase } from '@/lib/supabase';
import { airtableService } from '@/lib/airtable';

export default function VideoSession() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const bookingId = searchParams.get('bookingId'); // Cal.com booking ID
  const userType = searchParams.get('userType') || 'member'; // 'host' or 'member'
  
  const [roomUrl, setRoomUrl] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');
  const [sessionStage, setSessionStage] = useState<'pre' | 'active' | 'post'>('pre');
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [partnerName, setPartnerName] = useState('');
  const [operationRecordId, setOperationRecordId] = useState<string>('');
  const [timeRemaining, setTimeRemaining] = useState<number>(600); // 10 minutes in seconds
  const [timerActive, setTimerActive] = useState(false);


  // Countdown timer effect - starts when video room loads
  useEffect(() => {
    if (roomUrl && sessionStage === 'active') {
      setTimerActive(true);
    }
  }, [roomUrl, sessionStage]);

  // Timer countdown logic
  useEffect(() => {
    if (!timerActive || timeRemaining <= 0) {
      if (timeRemaining === 0 && sessionStage === 'active') {
        // Auto-end session when timer reaches 0
        handleEndSession();
      }
      return;
    }

    const interval = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          setTimerActive(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [timerActive, timeRemaining, sessionStage]);

  // Format time as MM:SS
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    if (bookingId) {
      loadSession();
    } else {
      setError('No booking ID provided');
      setLoading(false);
    }
  }, [bookingId]);


  const loadSession = async () => {
    try {
      console.log('Loading session for booking ID:', bookingId);
      
      // Search for session by Cal.com Booking ID
      const filterFormula = `{Cal.com Booking ID}='${bookingId}'`;
      const response = await airtableService.listRecords('Presence Operations', undefined, filterFormula);
      
      console.log('Airtable response:', response);
      
      if (response.error) {
        setError(`Failed to load session: ${response.error}`);
        setLoading(false);
        return;
      }
      
      if (response.records && response.records.length > 0) {
        const session = response.records[0];
        setOperationRecordId(session.id);
        
        console.log('Session found:', session.fields);
        
        // Set partner name based on user type
        if (userType === 'host') {
          setPartnerName(session.fields['Member Name'] || 'Member');
        } else {
          setPartnerName(session.fields['Host Name'] || 'Host');
        }
        
        // Check if video room exists (should be created by Cal.com webhook)
        if (session.fields['Video Room URL']) {
          console.log('Video Room URL found:', session.fields['Video Room URL']);
          setRoomUrl(session.fields['Video Room URL']);
          setSessionStage('active');
          
          // Update joined status for this user type
          const updateField = userType === 'host' ? 'Host Joined' : 'Member Joined';
          await airtableService.updateRecord('Presence Operations', session.id, {
            [updateField]: true
          });
        } else {
          console.log('No Video Room URL found, creating room...');
          setError('Video room not ready yet. Creating room now...');
          setTimeout(() => createVideoRoom(), 1000);
        }
      } else {
        setError('Session not found. Please check your booking confirmation.');
      }
    } catch (error) {
      console.error('Error loading session:', error);
      setError('Failed to load session details');
    } finally {
      setLoading(false);
    }
  };




  const createVideoRoom = async () => {
    try {
      setError('');
      console.log('Creating Daily.co room for booking:', bookingId);
      
      const { data, error } = await supabase.functions.invoke('daily-create-room', {
        body: { 
          name: `presence-${bookingId}`,
          properties: {
            max_participants: 2,
            enable_recording: false,
            enable_screenshare: true,
            enable_chat: true,
            start_video_off: false,
            start_audio_off: false
          }
        }
      });

      console.log('Daily.co response:', data, 'Error:', error);

      if (error) {
        console.error('Supabase function error:', error);
        setError(`Failed to create room: ${error.message}`);
        return;
      }
      
      if (data?.error) {
        console.error('Daily.co API error:', data.error);
        setError(`Daily.co error: ${data.error}`);
        return;
      }
      
      if (data?.url) {
        console.log('Room URL received:', data.url);
        setRoomUrl(data.url);
        
        // Update Airtable with room URL using the operationRecordId
        if (operationRecordId) {
          await airtableService.updateRecord('Presence Operations', operationRecordId, {
            'Video Room URL': data.url,
            'Video Room Status': 'Active',
            'Member Joined': true
          });
        }
        
        setSessionStage('active');
      } else {
        console.error('No URL in response:', data);
        setError('No room URL returned from Daily.co');
      }
    } catch (error: any) {
      console.error('Error creating video room:', error);
      setError(`Error: ${error.message || 'Unknown error'}`);
    }
  };



  const handleEndSession = async () => {
    setSessionStage('post');
  };

  const handleCompleteSession = async () => {
    try {
      // Update session status using operationRecordId
      if (operationRecordId) {
        await airtableService.updateRecord('Presence Operations', operationRecordId, {
          'Video Room Status': 'Ended',
          'Booking Status': 'Completed'
        });
        
        // Trigger payment confirmation
        await supabase.functions.invoke('stripe-payment-confirm', {
          body: { bookingId }
        });
      }
      
      setShowRatingModal(true);
    } catch (error) {
      console.error('Error completing session:', error);
    }
  };


  const handleRatingClose = () => {
    setShowRatingModal(false);
    // Navigate based on user type
    navigate(userType === 'host' ? '/host-dashboard' : '/member-dashboard');
  };


  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-[#2563EB]" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Video Session with {partnerName}</span>
                  <div className="flex items-center gap-3">
                    {/* Countdown Timer Display */}
                    {timerActive && sessionStage === 'active' && (
                      <div className={`flex items-center gap-2 px-4 py-2 rounded-lg font-mono text-lg font-bold ${
                        timeRemaining <= 60 ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'
                      }`}>
                        <Clock className="w-5 h-5" />
                        {formatTime(timeRemaining)}
                      </div>
                    )}
                    <Button variant="outline" size="sm">
                      <Flag className="w-4 h-4 mr-1" />
                      Report
                    </Button>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {error ? (
                  <div className="aspect-video bg-red-50 rounded-lg flex flex-col items-center justify-center p-6 text-center">
                    <p className="text-red-600 font-medium mb-4">{error}</p>
                    {userType === 'member' && (
                      <Button onClick={createVideoRoom} variant="outline">
                        Retry Connection
                      </Button>
                    )}
                  </div>
                ) : roomUrl && sessionStage === 'active' ? (
                  <div className="relative">
                    {/* 2-minute warning banner */}
                    {timeRemaining <= 120 && timeRemaining > 0 && (
                      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-10 bg-orange-500 text-white px-6 py-3 rounded-lg shadow-lg animate-pulse">
                        <p className="font-semibold text-center">
                          Session ending soon — rebook your host?
                        </p>
                      </div>
                    )}
                    
                    <iframe
                      src={roomUrl}
                      allow="camera; microphone; fullscreen"
                      className="w-full aspect-video rounded-lg"
                    />
                    
                    {timeRemaining === 0 && (
                      <div className="absolute inset-0 bg-black/50 rounded-lg flex items-center justify-center">
                        <div className="bg-white p-6 rounded-lg text-center">
                          <h3 className="text-xl font-bold text-gray-900 mb-2">Session Time Complete</h3>
                          <p className="text-gray-600">Your 10-minute session has ended.</p>
                        </div>
                      </div>
                    )}
                  </div>

                ) : (
                  <div className="aspect-video bg-gray-100 rounded-lg flex flex-col items-center justify-center">
                    <Loader2 className="w-8 h-8 animate-spin text-[#2563EB] mb-2" />
                    <p className="text-gray-600">Connecting to video room...</p>
                  </div>
                )}

                <div className="mt-4 flex justify-center">
                  <Button onClick={handleEndSession} variant="destructive" size="lg">
                    <PhoneOff className="mr-2" />
                    End Session
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>



          <div className="space-y-4">
            <SessionPrompts 
              sessionStage={sessionStage} 
              onComplete={sessionStage === 'post' ? handleCompleteSession : undefined}
            />
          </div>
        </div>
      </div>

      <RatingModal open={showRatingModal} onClose={handleRatingClose} hostName={partnerName} />

    </div>
  );
}
