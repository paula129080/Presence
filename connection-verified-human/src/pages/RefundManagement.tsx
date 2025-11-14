import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { airtableService, PresenceOperation, RefundRecord } from '@/lib/airtable';
import { supabase } from '@/lib/supabase';
import { DollarSign, AlertCircle, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';

export default function RefundManagement() {
  const [operations, setOperations] = useState<PresenceOperation[]>([]);
  const [refunds, setRefunds] = useState<RefundRecord[]>([]);
  const [selectedOp, setSelectedOp] = useState<PresenceOperation | null>(null);
  const [refundReason, setRefundReason] = useState('');
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const opsResponse = await airtableService.listRecords('Presence Operations');
    const refundsResponse = await airtableService.listRecords('Refunds');
    
    if (opsResponse.records) {
      setOperations(opsResponse.records as PresenceOperation[]);
    }
    if (refundsResponse.records) {
      setRefunds(refundsResponse.records as RefundRecord[]);
    }
  };

  const handleRefund = async () => {
    if (!selectedOp || !refundReason) return;
    
    setProcessing(true);
    try {
      const { data, error } = await supabase.functions.invoke('stripe-refund', {
        body: {
          transactionId: selectedOp.fields['Transaction ID'],
          amount: selectedOp.fields['Amount (AUD)'],
          reason: refundReason
        }
      });

      if (error) throw error;

      await airtableService.createRecord('Refunds', {
        'Transaction ID': selectedOp.fields['Transaction ID'],
        'Refund Amount (AUD)': selectedOp.fields['Amount (AUD)'],
        'Refund Reason': refundReason,
        'Refund Status': 'Processed',
        'Refund Date': new Date().toISOString()
      });

      await airtableService.updateRecord('Presence Operations', selectedOp.id, {
        'Payment Status': 'Refunded'
      });

      toast.success('Refund processed successfully');
      loadData();
      setSelectedOp(null);
      setRefundReason('');
    } catch (error) {
      console.error('Refund error:', error);
      toast.error('Failed to process refund');
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Refund Management</h1>
        
        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Completed Sessions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {operations.filter(o => o.fields['Payment Status'] === 'Completed').map(op => (
                  <div key={op.id} className="flex items-center justify-between p-3 border rounded">
                    <div>
                      <p className="font-medium">{op.fields['Member Name']}</p>
                      <p className="text-sm text-gray-500">${op.fields['Amount (AUD)']}</p>
                    </div>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button size="sm" variant="outline" onClick={() => setSelectedOp(op)}>
                          Refund
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Process Refund</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div>
                            <p className="text-sm font-medium">Amount: ${op.fields['Amount (AUD)']}</p>
                          </div>
                          <Textarea
                            placeholder="Reason for refund"
                            value={refundReason}
                            onChange={(e) => setRefundReason(e.target.value)}
                          />
                          <Button onClick={handleRefund} disabled={processing} className="w-full">
                            {processing ? 'Processing...' : 'Confirm Refund'}
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Refund History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {refunds.map(refund => (
                  <div key={refund.id} className="p-3 border rounded">
                    <div className="flex items-center justify-between mb-2">
                      <p className="font-medium">${refund.fields['Refund Amount (AUD)']}</p>
                      <Badge variant="secondary">{refund.fields['Refund Status']}</Badge>
                    </div>
                    <p className="text-sm text-gray-600">{refund.fields['Refund Reason']}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
