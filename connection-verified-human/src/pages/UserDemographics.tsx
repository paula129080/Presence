import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { airtableService, MemberRecord, HostRecord } from '@/lib/airtable';
import { Loader2, Users, Globe, Calendar, TrendingUp } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

const COLORS = ['#2563EB', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899'];

export default function UserDemographics() {
  const [loading, setLoading] = useState(true);
  const [countryData, setCountryData] = useState<any[]>([]);
  const [genderData, setGenderData] = useState<any[]>([]);
  const [ageData, setAgeData] = useState<any[]>([]);
  const [stats, setStats] = useState({
    totalMembers: 0,
    totalHosts: 0,
    avgAge: 0,
    growthRate: 0
  });

  useEffect(() => {
    fetchDemographics();
  }, []);

  const fetchDemographics = async () => {
    setLoading(true);
    
    const [membersRes, hostsRes] = await Promise.all([
      airtableService.listRecords('Member Registry'),
      airtableService.listRecords('Host Registry')
    ]);

    if (membersRes.records && hostsRes.records) {
      const members = membersRes.records as MemberRecord[];
      const hosts = hostsRes.records as HostRecord[];
      
      processCountryData(members, hosts);
      processGenderData(members, hosts);
      processAgeData(members, hosts);
      
      const totalUsers = members.length + hosts.length;
      const avgAge = calculateAverageAge([...members, ...hosts]);
      const growth = calculateGrowthRate(members, hosts);
      
      setStats({
        totalMembers: members.length,
        totalHosts: hosts.length,
        avgAge,
        growthRate: growth
      });
    }
    
    setLoading(false);
  };

  const processCountryData = (members: MemberRecord[], hosts: HostRecord[]) => {
    const countryCounts: Record<string, number> = {};
    
    [...members, ...hosts].forEach(user => {
      const country = user.fields['Country'] || 'Unknown';
      countryCounts[country] = (countryCounts[country] || 0) + 1;
    });
    
    const data = Object.entries(countryCounts)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 6);
    
    setCountryData(data);
  };

  const processGenderData = (members: MemberRecord[], hosts: HostRecord[]) => {
    const genderCounts: Record<string, number> = {};
    
    [...members, ...hosts].forEach(user => {
      const gender = user.fields['Gender'] || 'Not Specified';
      genderCounts[gender] = (genderCounts[gender] || 0) + 1;
    });
    
    const data = Object.entries(genderCounts).map(([name, value]) => ({ name, value }));
    setGenderData(data);
  };

  const processAgeData = (members: MemberRecord[], hosts: HostRecord[]) => {
    const ageBuckets = {
      '18-24': 0,
      '25-34': 0,
      '35-44': 0,
      '45-54': 0,
      '55-64': 0,
      '65+': 0
    };
    
    [...members, ...hosts].forEach(user => {
      const age = user.fields['Age'];
      if (age) {
        if (age < 25) ageBuckets['18-24']++;
        else if (age < 35) ageBuckets['25-34']++;
        else if (age < 45) ageBuckets['35-44']++;
        else if (age < 55) ageBuckets['45-54']++;
        else if (age < 65) ageBuckets['55-64']++;
        else ageBuckets['65+']++;
      }
    });
    
    const data = Object.entries(ageBuckets).map(([name, value]) => ({ name, value }));
    setAgeData(data);
  };

  const calculateAverageAge = (users: any[]) => {
    const ages = users.map(u => u.fields['Age']).filter(Boolean);
    return ages.length > 0 ? Math.round(ages.reduce((a, b) => a + b, 0) / ages.length) : 0;
  };

  const calculateGrowthRate = (members: MemberRecord[], hosts: HostRecord[]) => {
    const lastMonth = new Date();
    lastMonth.setMonth(lastMonth.getMonth() - 1);
    const lastMonthStr = lastMonth.toISOString();
    
    const recentUsers = [...members, ...hosts].filter(u => u.createdTime >= lastMonthStr);
    const totalUsers = members.length + hosts.length;
    
    return totalUsers > 0 ? Math.round((recentUsers.length / totalUsers) * 100) : 0;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex justify-center items-center h-96">
          <Loader2 className="h-12 w-12 animate-spin text-[#2563EB]" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">User Demographics</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Members</CardTitle>
              <Users className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalMembers}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Hosts</CardTitle>
              <Users className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalHosts}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Average Age</CardTitle>
              <Calendar className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.avgAge} years</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">30-Day Growth</CardTitle>
              <TrendingUp className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.growthRate}%</div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5" />
                Country Distribution
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={countryData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {countryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Gender Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={genderData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {genderData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Age Group Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={ageData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {ageData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
