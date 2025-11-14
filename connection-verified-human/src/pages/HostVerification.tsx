import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { airtableService } from '@/lib/airtable';
import { useToast } from '@/hooks/use-toast';
import { CheckCircle, XCircle, Clock } from 'lucide-react';

export default function HostVerification() {
  const navigate = useNavigate();
  const [hosts, setHosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    loadPendingHosts();
  }, []);

  const loadPendingHosts = async () => {
    try {
      const response = await airtableService.getRecords('Hosts', {
        filterByFormula: "{Verification Status} = 'Pending'"
      });
      setHosts(response.records || []);
    } catch (err) {
      toast({ title: 'Error', description: 'Failed to load hosts', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (hostId: string) => {
    try {
      await airtableService.updateRecord('Hosts', hostId, {
        'Verification Status': 'Approved',
        'Status': 'Active'
      });
      toast({ title: 'Success', description: 'Host approved and activated' });
      loadPendingHosts();
    } catch (err) {
      toast({ title: 'Error', description: 'Failed to approve host', variant: 'destructive' });
    }
  };

  const handleReject = async (hostId: string) => {
    try {
      await airtableService.updateRecord('Hosts', hostId, {
        'Verification Status': 'Rejected',
        'Status': 'Inactive'
      });
      toast({ title: 'Rejected', description: 'Host application rejected' });
      loadPendingHosts();
    } catch (err) {
      toast({ title: 'Error', description: 'Failed to reject host', variant: 'destructive' });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Host Verification</h1>
          <p className="text-gray-600">Admin-only: Review and approve pending host applications</p>
        </div>

        {loading ? (
          <p className="text-center py-8">Loading...</p>
        ) : hosts.length === 0 ? (
          <Card><CardContent className="py-8 text-center text-gray-500">No pending hosts</CardContent></Card>
        ) : (
          <div className="space-y-4">
            {hosts.map(host => (
              <Card key={host.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>{host.fields['Full Name']}</CardTitle>
                      <p className="text-sm text-gray-600">{host.fields['Email']}</p>
                    </div>
                    <Badge variant="outline"><Clock className="w-3 h-3 mr-1" />Pending</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4 text-sm">
                    <div><strong>Mobile:</strong> {host.fields['Mobile Number']}</div>
                    <div><strong>Timezone:</strong> {host.fields['Country / Time Zone']}</div>
                    <div><strong>Languages:</strong> {host.fields['Languages Spoken']?.join(', ')}</div>
                    <div><strong>Hours/Week:</strong> {host.fields['Availability (Hours per Week)']}</div>
                  </div>
                  <div><strong>Bio:</strong> {host.fields['About You (Host Bio)']}</div>
                  <div><strong>Personality:</strong> {host.fields['Personality Tags']?.join(', ')}</div>
                  <div className="flex gap-2 text-xs">
                    <Badge variant={host.fields['Community Pledge Signed'] ? 'default' : 'secondary'}>
                      Pledge: {host.fields['Community Pledge Signed'] ? 'Yes' : 'No'}
                    </Badge>
                    <Badge variant={host.fields['Host Agreement Accepted'] ? 'default' : 'secondary'}>
                      Agreement: {host.fields['Host Agreement Accepted'] ? 'Yes' : 'No'}
                    </Badge>
                  </div>
                  <div className="flex gap-2 pt-4">
                    <Button onClick={() => handleApprove(host.id)} className="bg-green-600 hover:bg-green-700">
                      <CheckCircle className="w-4 h-4 mr-2" />Approve
                    </Button>
                    <Button onClick={() => handleReject(host.id)} variant="destructive">
                      <XCircle className="w-4 h-4 mr-2" />Reject
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
