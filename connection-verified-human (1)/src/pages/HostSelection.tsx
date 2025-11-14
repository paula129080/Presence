import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HostCard from '@/components/HostCard';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { airtableService, HostRecord } from '@/lib/airtable';
import { useToast } from '@/hooks/use-toast';
import { Search, Loader2 } from 'lucide-react';


const PERSONALITY_TAGS = ['Calm', 'Outgoing', 'Empathetic', 'Analytical', 'Funny', 'Motivator', 'Listener'];
const AGE_GROUPS = ['18-25', '26-35', '36-45', '46-55', '56-65', '65+'];
const CATEGORIES = [
  'Friendship & Connection',
  'Emotional Support',
  'Career & Mentorship',
  'Health & Wellness',
  'General Chat'
];

export default function HostSelection() {
  const navigate = useNavigate();
  const [hosts, setHosts] = useState<HostRecord[]>([]);
  const [filteredHosts, setFilteredHosts] = useState<HostRecord[]>([]);
  const [displayedHosts, setDisplayedHosts] = useState<HostRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedAgeGroup, setSelectedAgeGroup] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [displayCount, setDisplayCount] = useState(20);
  const { toast } = useToast();


  useEffect(() => {
    fetchHosts();
  }, []);

  useEffect(() => {
    filterHosts();
  }, [hosts, searchQuery, selectedTags, selectedAgeGroup, selectedCategory]);

  useEffect(() => {
    // Randomize and paginate filtered hosts
    const randomized = [...filteredHosts].sort(() => Math.random() - 0.5);
    setDisplayedHosts(randomized.slice(0, displayCount));
  }, [filteredHosts, displayCount]);


  const fetchHosts = async () => {
    setLoading(true);
    const response = await airtableService.listRecords('Hosts', undefined, "{Verification Status}='Verified'");

    
    if (response.error) {
      toast({
        title: 'Error loading hosts',
        description: response.error,
        variant: 'destructive'
      });
    } else if (response.records) {
      setHosts(response.records as HostRecord[]);
    }
    setLoading(false);
  };

  const filterHosts = () => {
    let filtered = [...hosts];

    if (searchQuery) {
      filtered = filtered.filter(h => 
        h.fields['Full Name']?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        h.fields['About You (Host Bio)']?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedTags.length > 0) {
      filtered = filtered.filter(h => {
        const hostTags = h.fields['Personality Tags'] || [];
        return selectedTags.some(tag => hostTags.includes(tag));
      });
    }

    if (selectedAgeGroup && selectedAgeGroup !== 'all') {
      filtered = filtered.filter(h => h.fields['Host Age Group'] === selectedAgeGroup);
    }

    if (selectedCategory && selectedCategory !== 'all') {
      filtered = filtered.filter(h => {
        const hostCategories = h.fields['Host Category'] || [];
        return hostCategories.includes(selectedCategory);
      });
    }


    setFilteredHosts(filtered);
  };

  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  const handleSelectHost = (host: HostRecord) => {
    toast({
      title: 'Host Selected',
      description: `Proceeding with ${host.fields['Full Name']}`
    });
    navigate('/plans');
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-3xl font-bold mb-2">Select Your Host</h1>
        <p className="text-gray-600 mb-8">Choose a host based on personality, age, and conversation category</p>

        <div className="mb-8 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              placeholder="Search by name or bio..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium mb-2">Filter by age group:</p>
              <Select value={selectedAgeGroup} onValueChange={setSelectedAgeGroup}>
                <SelectTrigger>
                  <SelectValue placeholder="All ages" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All ages</SelectItem>

                  {AGE_GROUPS.map(age => (
                    <SelectItem key={age} value={age}>{age}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <p className="text-sm font-medium mb-2">Filter by category:</p>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="All categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All categories</SelectItem>

                  {CATEGORIES.map(cat => (
                    <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <p className="text-sm font-medium mb-2">Filter by personality:</p>
            <div className="flex flex-wrap gap-2">
              {PERSONALITY_TAGS.map(tag => (
                <Badge
                  key={tag}
                  variant={selectedTags.includes(tag) ? 'default' : 'outline'}
                  className="cursor-pointer"
                  onClick={() => toggleTag(tag)}
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center py-16">
            <Loader2 className="h-8 w-8 animate-spin text-[#2563EB]" />
          </div>
        ) : displayedHosts.length > 0 ? (
          <>
            <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
              {displayedHosts.map(host => (
                <HostCard key={host.id} host={host} onSelect={handleSelectHost} />
              ))}
            </div>
            {displayedHosts.length < filteredHosts.length && (
              <div className="flex justify-center mt-8">
                <Button onClick={() => setDisplayCount(prev => prev + 20)} variant="outline">
                  Load More Hosts ({filteredHosts.length - displayedHosts.length} remaining)
                </Button>
              </div>
            )}
          </>
        ) : (
          <p className="text-center text-gray-500 py-16">No hosts found matching your criteria</p>
        )}

      </div>

      <Footer />
    </div>
  );
}
