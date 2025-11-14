import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/lib/supabase';
import { Loader2, CheckCircle, XCircle, AlertCircle, RefreshCw, Play } from 'lucide-react';
import { Input } from '@/components/ui/input';

export default function IntegrationAdmin() {
  const [status, setStatus] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [testResults, setTestResults] = useState<any>({});
  const [testPhone, setTestPhone] = useState('+61400000000');

  const checkStatus = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('system-integrity-check');
      if (error) throw error;
      setStatus(data);
    } catch (err) {
      console.error('Status check failed:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkStatus();
  }, []);

  const testTwilio = async () => {
    setTestResults({ ...testResults, twilio: { loading: true } });
    try {
      const { data, error } = await supabase.functions.invoke('twilio-verify-send', {
        body: { phoneNumber: testPhone }
      });
      setTestResults({ ...testResults, twilio: { success: !error, data, error } });
    } catch (err: any) {
      setTestResults({ ...testResults, twilio: { success: false, error: err.message } });
    }
  };

  const integrations = [
    { name: 'Airtable', endpoint: 'airtable-sync', description: 'Member & host data sync' },
    { name: 'Twilio', endpoint: 'twilio-verify-send', description: 'SMS verification' },
    { name: 'Cal.com', endpoint: 'calcom-create-booking', description: 'Booking links' },
    { name: 'Daily.co', endpoint: 'daily-create-room', description: 'Video rooms' },
    { name: 'Stripe', endpoint: 'stripe-payment-confirm', description: 'Payment processing' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Integration Admin</h1>
          <Button onClick={checkStatus} disabled={loading}>
            <RefreshCw className={`mr-2 h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </div>

        {status && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>System Health</CardTitle>
            </CardHeader>
            <CardContent>
              <Badge variant={status.overall === 'healthy' ? 'default' : 'destructive'}>
                {status.overall}
              </Badge>
              <p className="text-sm text-gray-600 mt-2">Last: {new Date(status.timestamp).toLocaleString()}</p>
            </CardContent>
          </Card>
        )}

        <div className="grid md:grid-cols-2 gap-4">
          {integrations.map(int => (
            <Card key={int.name}>
              <CardHeader>
                <CardTitle className="text-lg">{int.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-2">{int.description}</p>
                <p className="text-xs font-mono bg-gray-100 p-2 rounded">{int.endpoint}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}