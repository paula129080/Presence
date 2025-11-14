import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { airtableService, PresenceOperation } from '@/lib/airtable';
import { DollarSign, TrendingUp, Calendar, Download } from 'lucide-react';

export default function HostPayoutDashboard() {
  const [operations, setOperations] = useState<PresenceOperation[]>([]);
  const [earnings, setEarnings] = useState({
    totalEarned: 0,
    hostShare: 0,
    presenceShare: 0,
    pendingPayout: 0
  });

  useEffect(() => {
    loadEarnings();
  }, []);

  const loadEarnings = async () => {
    // In production, filter by logged-in host
    const response = await airtableService.listRecords('Presence Operations');
    if (response.records) {
      const ops = response.records as PresenceOperation[];
      const completed = ops.filter(o => o.fields['Payment Status'] === 'Completed');
      
      const total = completed.reduce((sum, o) => sum + (o.fields['Amount (AUD)'] || 0), 0);
      const hostShare = completed.reduce((sum, o) => sum + (o.fields['Host Share (AUD)'] || 0), 0);
      const presenceShare = completed.reduce((sum, o) => sum + (o.fields['Presence Share (AUD)'] || 0), 0);
      
      setOperations(completed);
      setEarnings({
        totalEarned: total,
        hostShare,
        presenceShare,
        pendingPayout: hostShare
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Host Earnings</h1>
        
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Your Share</CardTitle>
              <DollarSign className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">${earnings.hostShare.toFixed(2)}</div>
              <p className="text-xs text-gray-500 mt-1">Total earned</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Presence Share</CardTitle>
              <TrendingUp className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">${earnings.presenceShare.toFixed(2)}</div>
              <p className="text-xs text-gray-500 mt-1">Platform fee</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Pending Payout</CardTitle>
              <Calendar className="h-4 w-4 text-orange-500" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">${earnings.pendingPayout.toFixed(2)}</div>
              <Button size="sm" className="mt-2">Request Payout</Button>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader className="flex items-center justify-between">
            <CardTitle>Earnings History</CardTitle>
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {operations.map(op => (
                <div key={op.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p className="font-medium">Session with {op.fields['Member Name']}</p>
                    <p className="text-sm text-gray-500">{op.fields['Session Start Time']}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-green-600">+${(op.fields['Host Share (AUD)'] || 0).toFixed(2)}</p>
                    <p className="text-xs text-gray-500">Total: ${(op.fields['Amount (AUD)'] || 0).toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
