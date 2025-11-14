import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/lib/supabase';
import { Loader2, CheckCircle, XCircle, AlertCircle, RefreshCw } from 'lucide-react';

export default function SystemStatus() {
  const [status, setStatus] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const checkStatus = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('system-integrity-check', {
        body: {}
      });

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

  const getStatusIcon = (status: string) => {
    if (status === 'success' || status === 'configured' || status === 'healthy') {
      return <CheckCircle className="h-5 w-5 text-green-600" />;
    }
    if (status === 'error' || status === 'degraded') {
      return <XCircle className="h-5 w-5 text-red-600" />;
    }
    return <AlertCircle className="h-5 w-5 text-yellow-600" />;
  };

  const getStatusBadge = (status: string) => {
    if (status === 'success' || status === 'configured' || status === 'healthy') {
      return <Badge className="bg-green-100 text-green-800">Operational</Badge>;
    }
    if (status === 'error' || status === 'degraded') {
      return <Badge variant="destructive">Error</Badge>;
    }
    return <Badge variant="secondary">Not Configured</Badge>;
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">System Status</h1>
          <Button onClick={checkStatus} disabled={loading}>
            <RefreshCw className={`mr-2 h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </div>

        {loading && !status ? (
          <div className="flex justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-[#2563EB]" />
          </div>
        ) : status ? (
          <>
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  {getStatusIcon(status.overall)}
                  Overall System Status
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Status:</span>
                    {getStatusBadge(status.overall)}
                  </div>
                  <div className="text-sm text-gray-600">
                    Last checked: {new Date(status.timestamp).toLocaleString()}
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid gap-4">
              {Object.entries(status.integrations || {}).map(([service, check]: [string, any]) => (
                <Card key={service}>
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        {getStatusIcon(check.status)}
                        <div>
                          <h3 className="font-semibold capitalize">{service}</h3>
                          <p className="text-sm text-gray-600">{check.message}</p>
                        </div>
                      </div>
                      {getStatusBadge(check.status)}
                    </div>
                    {check.statusCode && (
                      <p className="text-xs text-gray-500 mt-2">Status Code: {check.statusCode}</p>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </>
        ) : (
          <p className="text-center text-gray-600">Unable to load system status</p>
        )}
      </div>

      <Footer />
    </div>
  );
}
