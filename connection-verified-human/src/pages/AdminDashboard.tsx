import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';

import AdminMetrics from '@/components/AdminMetrics';
import AdminTables from '@/components/AdminTables';
import AdminCharts from '@/components/AdminCharts';

import AdminTools from '@/components/AdminTools';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { airtableService, PresenceOperation, MemberRecord, HostRecord } from '@/lib/airtable';

export default function AdminDashboard() {
  const [operations, setOperations] = useState<PresenceOperation[]>([]);
  const [members, setMembers] = useState<MemberRecord[]>([]);
  const [hosts, setHosts] = useState<HostRecord[]>([]);
  
  const [metrics, setMetrics] = useState({
    activeWeeklySubscriptions: 0,
    activeAdhocPurchases: 0,
    dailyRevenue: 0,
    weeklyRevenue: 0,
    monthlyRevenue: 0,
    presenceShare: 0,
    hostShare: 0,
    hostsOnline: 0,
    membersOnline: 0,
    sessionsInProgress: 0,
    sessionsToday: 0,
    newMembersToday: 0,
    newHostsToday: 0
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const [opsRes, membersRes, hostsRes] = await Promise.all([
      airtableService.listRecords('Presence Operations'),
      airtableService.listRecords('Member Registry'),
      airtableService.listRecords('Host Registry')
    ]);
    
    if (opsRes.records) {
      const ops = opsRes.records as PresenceOperation[];
      setOperations(ops);
      
      const today = new Date().toISOString().split('T')[0];
      const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
      
      const todayOps = ops.filter(o => o.createdTime.startsWith(today));
      const weekOps = ops.filter(o => o.createdTime >= weekAgo);
      
      setMetrics(prev => ({
        ...prev,
        activeWeeklySubscriptions: ops.filter(o => o.fields['Plan Type'] === 'Weekly' && o.fields['Payment Status'] === 'Completed').length,
        activeAdhocPurchases: ops.filter(o => o.fields['Plan Type'] === 'Adhoc' && o.fields['Payment Status'] === 'Completed').length,
        dailyRevenue: todayOps.reduce((sum, o) => sum + (o.fields['Amount (AUD)'] || 0), 0),
        weeklyRevenue: weekOps.reduce((sum, o) => sum + (o.fields['Amount (AUD)'] || 0), 0),
        monthlyRevenue: ops.reduce((sum, o) => sum + (o.fields['Amount (AUD)'] || 0), 0),
        presenceShare: ops.reduce((sum, o) => sum + (o.fields['Presence Share (AUD)'] || 0), 0),
        hostShare: ops.reduce((sum, o) => sum + (o.fields['Host Share (AUD)'] || 0), 0),
        sessionsToday: todayOps.length,
        sessionsInProgress: ops.filter(o => o.fields['Booking Status'] === 'Created').length
      }));
    }
    
    if (membersRes.records) {
      const mems = membersRes.records as MemberRecord[];
      setMembers(mems);
      const today = new Date().toISOString().split('T')[0];
      setMetrics(prev => ({
        ...prev,
        newMembersToday: mems.filter(m => m.createdTime.startsWith(today)).length
      }));
    }
    
    if (hostsRes.records) {
      const hsts = hostsRes.records as HostRecord[];
      setHosts(hsts);
      const today = new Date().toISOString().split('T')[0];
      setMetrics(prev => ({
        ...prev,
        newHostsToday: hsts.filter(h => h.createdTime.startsWith(today)).length
      }));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <Link 
            to="/user-demographics" 
            className="px-4 py-2 bg-[#2563EB] text-white rounded-md hover:bg-[#1d4ed8] transition"
          >
            View Demographics
          </Link>
        </div>
        
        <AdminMetrics metrics={metrics} />

        
        <Tabs defaultValue="charts" className="mt-8">
          <TabsList>
            <TabsTrigger value="charts">Analytics</TabsTrigger>
            <TabsTrigger value="tables">Recent Activity</TabsTrigger>
            <TabsTrigger value="tools">Admin Tools</TabsTrigger>
          </TabsList>
          
          <TabsContent value="charts" className="mt-6">
            <AdminCharts />
          </TabsContent>

          
          <TabsContent value="tables" className="mt-6">
            <AdminTables 
              recentPayments={operations.filter(o => o.fields['Payment Status'] === 'Completed')}
              recentBookings={operations}
              newMembers={members}
              newHosts={hosts}
            />
          </TabsContent>
          
          <TabsContent value="tools" className="mt-6">
            <AdminTools />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

