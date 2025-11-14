import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { airtableService, PresenceOperation } from '@/lib/airtable';
import { DollarSign, Users, TrendingUp, Calendar } from 'lucide-react';

export default function HostAnalytics() {
  const [operations, setOperations] = useState<PresenceOperation[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalSessions: 0,
    totalEarnings: 0,
    rebookRate: 0,
    upcomingSessions: 0
  });

  useEffect(() => {
    loadAnalytics();
  }, []);

  const loadAnalytics = async () => {
    try {
      const result = await airtableService.listRecords('Presence Operations');
      if (result.records) {
        const ops = result.records as PresenceOperation[];
        setOperations(ops);

        const completed = ops.filter(op => op.fields['Booking Status'] === 'Completed');
        const upcoming = ops.filter(op => op.fields['Booking Status'] === 'Pending' || op.fields['Booking Status'] === 'Created');
        const totalEarnings = completed.reduce((sum, op) => sum + (op.fields['Host Share (AUD)'] || 0), 0);

        setStats({
          totalSessions: completed.length,
          totalEarnings,
          rebookRate: 75, // This would come from host record
          upcomingSessions: upcoming.length
        });
      }
    } catch (error) {
      console.error('Failed to load analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="p-8">Loading analytics...</div>;
  }

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">Host Analytics Dashboard</h1>

      <div className="grid md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Sessions</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalSessions}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Earnings</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${stats.totalEarnings.toFixed(2)}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Rebook Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.rebookRate}%</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Upcoming</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.upcomingSessions}</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Sessions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {operations.slice(0, 10).map((op) => (
              <div key={op.id} className="flex justify-between items-center border-b pb-3">
                <div>
                  <p className="font-medium">{op.fields['Member Name']}</p>
                  <p className="text-sm text-muted-foreground">
                    {op.fields['Session Date']} at {op.fields['Session Time']}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-medium">${op.fields['Host Share (AUD)']?.toFixed(2) || '0.00'}</p>
                  <p className="text-sm text-muted-foreground">{op.fields['Booking Status']}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
