import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Download, UserX } from 'lucide-react';
import { airtableService } from '@/lib/airtable';

export default function AdminTools() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchType, setSearchType] = useState<'member' | 'host'>('member');

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    
    const table = searchType === 'member' ? 'Member Registry' : 'Host Registry';
    const filter = `SEARCH("${searchQuery}", LOWER({Full Name} & {Email} & {Mobile Number}))`;
    
    const response = await airtableService.listRecords(table, undefined, filter);
    console.log('Search results:', response);
  };

  const handleExportCSV = (type: string) => {
    console.log(`Exporting ${type} data...`);
    alert(`CSV export for ${type} will be downloaded`);
  };

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Search Users</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Button 
              variant={searchType === 'member' ? 'default' : 'outline'}
              onClick={() => setSearchType('member')}
              size="sm"
            >
              Members
            </Button>
            <Button 
              variant={searchType === 'host' ? 'default' : 'outline'}
              onClick={() => setSearchType('host')}
              size="sm"
            >
              Hosts
            </Button>
          </div>
          <div className="flex gap-2">
            <Input 
              placeholder="Search by name, email, or phone..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Button onClick={handleSearch}>
              <Search className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Export Data</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <Button onClick={() => handleExportCSV('revenue')} className="w-full" variant="outline">
            <Download className="h-4 w-4 mr-2" /> Export Revenue
          </Button>
          <Button onClick={() => handleExportCSV('users')} className="w-full" variant="outline">
            <Download className="h-4 w-4 mr-2" /> Export Users
          </Button>
          <Button onClick={() => handleExportCSV('sessions')} className="w-full" variant="outline">
            <Download className="h-4 w-4 mr-2" /> Export Sessions
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
