import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';
import { airtableService } from '@/lib/airtable';
import { Loader2 } from 'lucide-react';

export default function AdminCharts() {
  const [revenueData, setRevenueData] = useState<any[]>([]);
  const [sessionData, setSessionData] = useState<any[]>([]);
  const [subscriptionData, setSubscriptionData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchChartData();
  }, []);

  const fetchChartData = async () => {
    setLoading(true);
    
    // Fetch payments for revenue chart
    const paymentsResponse = await airtableService.listRecords('Payments');
    if (paymentsResponse.records) {
      const dailyRevenue = processRevenueData(paymentsResponse.records);
      setRevenueData(dailyRevenue);
    }

    // Fetch operations for session chart
    const opsResponse = await airtableService.listRecords('Presence Operations');
    if (opsResponse.records) {
      const dailySessions = processSessionData(opsResponse.records);
      setSessionData(dailySessions);
    }

    // Fetch subscriptions for growth chart
    const subsResponse = await airtableService.listRecords('Subscriptions');
    if (subsResponse.records) {
      const growth = processSubscriptionData(subsResponse.records);
      setSubscriptionData(growth);
    }

    setLoading(false);
  };

  const processRevenueData = (payments: any[]) => {
    const last7Days = Array.from({ length: 7 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - (6 - i));
      return date.toISOString().split('T')[0];
    });

    return last7Days.map(date => ({
      date: new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      revenue: payments
        .filter(p => p.fields['Payment Date']?.startsWith(date))
        .reduce((sum, p) => sum + (parseFloat(p.fields['Amount'] || '0')), 0)
    }));
  };

  const processSessionData = (operations: any[]) => {
    const last7Days = Array.from({ length: 7 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - (6 - i));
      return date.toISOString().split('T')[0];
    });

    return last7Days.map(date => ({
      date: new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      sessions: operations.filter(op => 
        op.fields['Session Date']?.startsWith(date) && 
        op.fields['Booking Status'] === 'Completed'
      ).length
    }));
  };

  const processSubscriptionData = (subscriptions: any[]) => {
    const last30Days = Array.from({ length: 30 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - (29 - i));
      return date.toISOString().split('T')[0];
    });

    let cumulative = 0;
    return last30Days.filter((_, i) => i % 5 === 0).map(date => {
      cumulative += subscriptions.filter(s => 
        s.fields['Start Date']?.startsWith(date)
      ).length;
      return {
        date: new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        total: cumulative
      };
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-[#2563EB]" />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Revenue (Last 7 Days)</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Line type="monotone" dataKey="revenue" stroke="#2563EB" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Sessions Per Day</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={sessionData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar dataKey="sessions" fill="#10B981" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle>Subscription Growth (Last 30 Days)</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={subscriptionData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Line type="monotone" dataKey="total" stroke="#8B5CF6" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
