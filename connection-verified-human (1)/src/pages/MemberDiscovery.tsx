import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import MemberCard from '@/components/MemberCard';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { airtableService, MemberRecord, LikeRecord } from '@/lib/airtable';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Search } from 'lucide-react';

const AGE_GROUPS = ['18-25', '26-35', '36-45', '46-55', '56-65', '65+'];
const CATEGORIES = ['Friendship & Connection', 'Emotional Support', 'Career & Mentorship', 'Health & Wellness', 'General Chat'];

export default function MemberDiscovery() {
  const [members, setMembers] = useState<MemberRecord[]>([]);
  const [filteredMembers, setFilteredMembers] = useState<MemberRecord[]>([]);
  const [displayedMembers, setDisplayedMembers] = useState<MemberRecord[]>([]);
  const [likedMembers, setLikedMembers] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAgeGroup, setSelectedAgeGroup] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [displayCount, setDisplayCount] = useState(20);
  const { toast } = useToast();

  // Mock host ID - in production, get from auth context
  const hostId = 'rec123host';


  useEffect(() => {
    fetchMembersAndLikes();
  }, []);

  useEffect(() => {
    filterMembers();
  }, [members, searchQuery, selectedAgeGroup, selectedCategory]);

  useEffect(() => {
    // Randomize and paginate filtered members
    const randomized = [...filteredMembers].sort(() => Math.random() - 0.5);
    setDisplayedMembers(randomized.slice(0, displayCount));
  }, [filteredMembers, displayCount]);

  const fetchMembersAndLikes = async () => {
    setLoading(true);
    
    // Fetch ALL verified members (extended discovery mode)
    const membersResponse = await airtableService.listRecords('Members');

    if (membersResponse.records) {
      setMembers(membersResponse.records as MemberRecord[]);
    }

    // Fetch existing likes
    const likesResponse = await airtableService.listRecords(
      'Likes',
      undefined,
      `{Host ID}='${hostId}'`
    );

    if (likesResponse.records) {
      const liked = new Set(
        likesResponse.records.map(r => r.fields['Member ID'] as string)
      );
      setLikedMembers(liked);
    }

    setLoading(false);
  };

  const filterMembers = () => {
    let filtered = [...members];

    if (searchQuery) {
      filtered = filtered.filter(m => 
        m.fields['Full Name']?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedAgeGroup && selectedAgeGroup !== 'all') {
      filtered = filtered.filter(m => m.fields['Age Group'] === selectedAgeGroup);
    }

    if (selectedCategory && selectedCategory !== 'all') {
      filtered = filtered.filter(m => {
        const memberCategories = m.fields['Preferred Category'] || [];
        return memberCategories.includes(selectedCategory);
      });
    }

    setFilteredMembers(filtered);
  };


  const handleLike = async (member: MemberRecord) => {
    const memberId = member.id;
    
    if (likedMembers.has(memberId)) {
      toast({ title: 'Already liked', description: `You've already liked ${member.fields['Full Name']}` });
      return;
    }

    const response = await airtableService.createRecord('Likes', {
      'Host ID': hostId,
      'Member ID': memberId,
      'Status': 'Active'
    });

    if (response.error) {
      toast({ title: 'Error', description: response.error, variant: 'destructive' });
    } else {
      setLikedMembers(prev => new Set([...prev, memberId]));
      toast({ 
        title: 'Like sent!', 
        description: `${member.fields['Full Name']} will be notified`
      });
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-3xl font-bold mb-2">Member Discovery</h1>
        <p className="text-gray-600 mb-8">
          Browse verified members and like them to show appreciation
        </p>

        <div className="mb-8 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              placeholder="Search by name..."
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
        </div>

        {loading ? (
          <div className="flex justify-center py-16">
            <Loader2 className="h-8 w-8 animate-spin text-[#2563EB]" />
          </div>
        ) : displayedMembers.length > 0 ? (
          <>
            <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
              {displayedMembers.map(member => (
                <MemberCard 
                  key={member.id} 
                  member={member} 
                  onLike={handleLike}
                  isLiked={likedMembers.has(member.id)}
                />
              ))}
            </div>
            {displayedMembers.length < filteredMembers.length && (
              <div className="flex justify-center mt-8">
                <Button onClick={() => setDisplayCount(prev => prev + 20)} variant="outline">
                  Load More Members ({filteredMembers.length - displayedMembers.length} remaining)
                </Button>
              </div>
            )}
          </>
        ) : (
          <p className="text-center text-gray-500 py-16">
            No members found matching your criteria
          </p>
        )}
      </div>

      <Footer />
    </div>
  );
}
