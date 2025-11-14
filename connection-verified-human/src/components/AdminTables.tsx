import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { PresenceOperation, MemberRecord, HostRecord } from '@/lib/airtable';

interface AdminTablesProps {
  recentPayments: PresenceOperation[];
  recentBookings: PresenceOperation[];
  newMembers: MemberRecord[];
  newHosts: HostRecord[];
}

export default function AdminTables({ recentPayments, recentBookings, newMembers, newHosts }: AdminTablesProps) {
  return (
    <div className="grid md:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Recent Payments</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentPayments.slice(0, 5).map(payment => (
              <div key={payment.id} className="flex justify-between items-center p-3 border rounded">
                <div>
                  <p className="font-medium text-sm">{payment.fields['Member Name']}</p>
                  <p className="text-xs text-gray-500">{payment.fields['Plan Type']}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold">${payment.fields['Amount (AUD)']?.toFixed(2)}</p>
                  <Badge variant={payment.fields['Payment Status'] === 'Completed' ? 'default' : 'secondary'}>
                    {payment.fields['Payment Status']}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>New Members Today</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {newMembers.slice(0, 5).map(member => (
              <div key={member.id} className="flex justify-between items-center p-3 border rounded">
                <div>
                  <p className="font-medium text-sm">{member.fields['Full Name']}</p>
                  <p className="text-xs text-gray-500">{member.fields['Country']}</p>
                </div>
                <Badge>{member.fields['Verification Status']}</Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
