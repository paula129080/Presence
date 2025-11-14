import { useState } from 'react';
import { airtableService } from '@/lib/airtable';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { OperationsStatusBadge } from '@/components/OperationsStatusBadge';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function AirtableAdmin() {
  const [tableName, setTableName] = useState('Presence Operations');
  const [viewName, setViewName] = useState<string>('');
  const [records, setRecords] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();


  const fetchRecords = async () => {
    setLoading(true);
    const response = await airtableService.listRecords(
      tableName, 
      viewName || undefined
    );

    
    if (response.error) {
      toast({
        title: 'Error',
        description: response.error,
        variant: 'destructive'
      });
    } else if (response.records) {
      setRecords(response.records);
      toast({
        title: 'Success',
        description: `Loaded ${response.records.length} records`
      });
    }
    setLoading(false);
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">Airtable Integration</h1>
      
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Database Connection</CardTitle>
          <CardDescription>
            Connected to: Presence – Host & Members System
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex gap-4">
              <Input
                placeholder="Table name (e.g., Hosts, Members)"
                value={tableName}
                onChange={(e) => setTableName(e.target.value)}
                className="flex-1"
              />
              <Input
                placeholder="View name (optional, e.g., Payment Confirmed)"
                value={viewName}
                onChange={(e) => setViewName(e.target.value)}
                className="flex-1"
              />
              <Button onClick={fetchRecords} disabled={loading}>
                {loading ? 'Loading...' : 'Fetch Records'}
              </Button>
            </div>
            <p className="text-sm text-gray-600">
              💡 Use view filters to fetch specific records (e.g., "Payment Confirmed" view shows only records with Payment Status = Completed and Booking Status ≠ Created)
            </p>
          </div>
        </CardContent>
      </Card>


      {records.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Records from {tableName}</CardTitle>
            <CardDescription>
              {tableName === 'Presence Operations' && 
                'Showing all fields including Cal.com, video session, and status fields (updated 2025-11-12)'}
            </CardDescription>
          </CardHeader>

          <CardContent>
            <div className="space-y-4">
              {records.map((record) => (
                <div key={record.id} className="border p-4 rounded-lg bg-white shadow-sm">
                  <div className="flex justify-between items-start mb-3">
                    <p className="text-sm text-gray-500">ID: {record.id}</p>
                    <div className="flex gap-2 flex-wrap">
                      {record.fields['Booking Status'] && (
                        <OperationsStatusBadge 
                          status={record.fields['Booking Status']} 
                          type="booking" 
                        />
                      )}
                      {record.fields['Payment Status'] && (
                        <OperationsStatusBadge 
                          status={record.fields['Payment Status']} 
                          type="payment" 
                        />
                      )}
                      {record.fields['Notification Status'] && (
                        <Badge variant="outline">{record.fields['Notification Status']}</Badge>
                      )}
                    </div>
                  </div>
                  <pre className="text-sm bg-gray-50 p-3 rounded overflow-auto max-h-96">
                    {JSON.stringify(record.fields, null, 2)}
                  </pre>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

    </div>
  );
}
