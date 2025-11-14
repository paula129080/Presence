import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { supabase } from '@/lib/supabase';
import { Loader2, CheckCircle, XCircle } from 'lucide-react';

export default function StripeTestPage() {
  const [paymentIntentId, setPaymentIntentId] = useState('');
  const [recordId, setRecordId] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const testPaymentConfirm = async () => {
    if (!paymentIntentId || !recordId) {
      setResult({ error: 'Both Payment Intent ID and Record ID are required' });
      return;
    }

    setLoading(true);
    setResult(null);

    try {
      const { data, error } = await supabase.functions.invoke('stripe-payment-confirm', {
        body: { paymentIntentId, recordId }
      });

      if (error) throw error;
      setResult(data);
    } catch (err: any) {
      setResult({ error: err.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Stripe Payment Confirmation Test</h1>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Test Payment Confirmation</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="paymentIntentId">Payment Intent ID</Label>
              <Input
                id="paymentIntentId"
                placeholder="pi_xxxxxxxxxxxxx"
                value={paymentIntentId}
                onChange={(e) => setPaymentIntentId(e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="recordId">Airtable Record ID</Label>
              <Input
                id="recordId"
                placeholder="recXXXXXXXXXXXXXX"
                value={recordId}
                onChange={(e) => setRecordId(e.target.value)}
              />
            </div>

            <Button onClick={testPaymentConfirm} disabled={loading}>
              {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
              Test Payment Confirmation
            </Button>
          </CardContent>
        </Card>

        {result && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {result.error ? (
                  <XCircle className="h-5 w-5 text-red-500" />
                ) : (
                  <CheckCircle className="h-5 w-5 text-green-500" />
                )}
                Result
              </CardTitle>
            </CardHeader>
            <CardContent>
              <pre className="bg-gray-100 p-4 rounded overflow-auto text-xs">
                {JSON.stringify(result, null, 2)}
              </pre>
            </CardContent>
          </Card>
        )}
      </div>
      <Footer />
    </div>
  );
}
