import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Calendar, MessageCircle, CheckCircle, Video, Loader2 } from 'lucide-react';
import { airtableService } from '@/lib/airtable';

export default function HostProfile() {
  const { hostId } = useParams();
  const navigate = useNavigate();
  const [host, setHost] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (hostId) loadHost();
  }, [hostId]);

  const loadHost = async () => {
    try {
      const response = await airtableService.getRecord('Host Registry', hostId!);
      if (response.record) setHost(response.record.fields);
    } catch (error) {
      console.error('Error loading host:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-[#2563EB]" />
      </div>
    );
  }

  if (!host) return <div className="min-h-screen bg-white"><Header /><p className="text-center py-20">Host not found</p></div>;

  const calLink = host['Cal Link'] || '';
  const isVerified = host['Verification Status'] === 'Approved';

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-5xl mx-auto px-4 py-8">
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex flex-col items-center gap-4">
                <Avatar className="w-32 h-32">
                  <AvatarImage src={host['Headshot Photo']?.[0]?.url} />
                  <AvatarFallback>{host['Host Name']?.[0]}</AvatarFallback>
                </Avatar>
                {host['Full Length Photo']?.[0]?.url && (
                  <img src={host['Full Length Photo'][0].url} alt="Full" className="w-32 h-48 object-cover rounded-lg" />
                )}
              </div>

              <div className="flex-1">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
                      {host['Host Name']}
                      {isVerified && <CheckCircle className="w-6 h-6 text-green-600" />}
                    </h1>
                    <p className="text-gray-600">{host['Age Group']}</p>
                  </div>
                </div>

                <p className="text-gray-700 mb-4">{host['Bio']}</p>

                <div className="space-y-3">
                  <div>
                    <p className="text-sm font-medium text-gray-600 mb-1">Personality</p>
                    <div className="flex flex-wrap gap-2">
                      {host['Personality Tags']?.map((tag: string) => (
                        <Badge key={tag} variant="secondary">{tag}</Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="text-sm font-medium text-gray-600 mb-1">Categories</p>
                    <div className="flex flex-wrap gap-2">
                      {host['Categories']?.map((cat: string) => (
                        <Badge key={cat}>{cat}</Badge>
                      ))}
                    </div>
                  </div>

                  {host['Intro Video']?.[0]?.url && (
                    <div>
                      <p className="text-sm font-medium text-gray-600 mb-2">Intro Video</p>
                      <video src={host['Intro Video'][0].url} controls className="w-full max-w-md rounded-lg" />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-2 gap-4">
          <Button size="lg" onClick={() => navigate(`/chat?hostId=${hostId}`)} className="bg-[#4285B9] hover:bg-[#3367a0]">
            <MessageCircle className="mr-2" />
            Message Host
          </Button>
          <Button size="lg" variant="outline" onClick={() => {
            const el = document.getElementById('booking-calendar');
            el?.scrollIntoView({ behavior: 'smooth' });
          }}>
            <Calendar className="mr-2" />
            Book Session
          </Button>
        </div>

        {calLink && (
          <Card className="mt-6" id="booking-calendar">
            <CardHeader>
              <CardTitle>Book a Session</CardTitle>
            </CardHeader>
            <CardContent>
              <iframe
                src={calLink}
                width="100%"
                height="600"
                frameBorder="0"
                className="rounded-lg"
              />
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
