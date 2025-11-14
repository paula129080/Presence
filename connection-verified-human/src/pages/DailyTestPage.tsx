import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/lib/supabase';
import Header from '@/components/Header';

export default function DailyTestPage() {
  const [roomUrl, setRoomUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [response, setResponse] = useState<any>(null);

  const testCreateRoom = async () => {
    setLoading(true);
    setError('');
    setResponse(null);
    
    try {
      const { data, error } = await supabase.functions.invoke('daily-create-room', {
        body: { 
          name: `test-${Date.now()}`,
          properties: {
            max_participants: 2,
            enable_recording: false
          }
        }
      });

      setResponse({ data, error });
      
      if (error) {
        setError(error.message);
      } else if (data?.url) {
        setRoomUrl(data.url);
      } else if (data?.error) {
        setError(data.error);
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-4xl mx-auto p-8">
        <Card>
          <CardHeader>
            <CardTitle>Daily.co Integration Test</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button onClick={testCreateRoom} disabled={loading}>
              {loading ? 'Creating Room...' : 'Test Create Room'}
            </Button>

            {error && (
              <div className="p-4 bg-red-50 text-red-700 rounded">
                <strong>Error:</strong> {error}
              </div>
            )}

            {response && (
              <div className="p-4 bg-gray-100 rounded">
                <strong>Response:</strong>
                <pre className="mt-2 text-xs overflow-auto">
                  {JSON.stringify(response, null, 2)}
                </pre>
              </div>
            )}

            {roomUrl && (
              <div className="space-y-2">
                <p className="font-medium">Room URL: {roomUrl}</p>
                <iframe
                  src={roomUrl}
                  allow="camera; microphone; fullscreen"
                  className="w-full aspect-video rounded"
                />
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
