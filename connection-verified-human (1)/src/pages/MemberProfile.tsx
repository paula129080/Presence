import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { airtableService, MemberRecord } from '@/lib/airtable';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Camera, Save, Eye, EyeOff } from 'lucide-react';


const INTERESTS = ['Reading', 'Music', 'Sports', 'Travel', 'Cooking', 'Art', 'Technology', 'Nature', 'Fitness', 'Meditation'];

export default function MemberProfile() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [profile, setProfile] = useState<MemberRecord | null>(null);
  const [formData, setFormData] = useState({
    'Full Name': '',
    'Email': '',
    'Mobile Number': '',
    'About You': '',
    'Interests': [] as string[],
    'Country': '',
    'Time Zone': '',
    'Language Preference': 'English'
  });

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    const memberId = localStorage.getItem('memberId') || 'rec_demo_member';
    const response = await airtableService.getRecord('Members', memberId);
    
    if (response.records && response.records[0]) {
      const memberData = response.records[0] as MemberRecord;
      setProfile(memberData);
      setFormData({
        'Full Name': memberData.fields['Full Name'] || '',
        'Email': memberData.fields['Email'] || '',
        'Mobile Number': memberData.fields['Mobile Number'] || '',
        'About You': memberData.fields['About You'] || '',
        'Interests': memberData.fields['Interests'] || [],
        'Country': memberData.fields['Country'] || '',
        'Time Zone': memberData.fields['Time Zone'] || '',
        'Language Preference': memberData.fields['Language Preference'] || 'English'
      });
    }
    setLoading(false);
  };

  const handleSave = async () => {
    if (!profile) return;
    setSaving(true);
    
    const response = await airtableService.updateRecord('Members', profile.id, formData);
    
    if (response.error) {
      toast({ title: 'Error', description: response.error, variant: 'destructive' });
    } else {
      toast({ title: 'Success', description: 'Profile updated successfully' });
    }
    setSaving(false);
  };

  const toggleInterest = (interest: string) => {
    setFormData(prev => ({
      ...prev,
      'Interests': prev.Interests.includes(interest)
        ? prev.Interests.filter(i => i !== interest)
        : [...prev.Interests, interest]
    }));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-[#2563EB]" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <div className="max-w-3xl mx-auto px-4 py-16">
        <h1 className="text-3xl font-bold mb-8">My Profile</h1>
        
        <Card>
          <CardHeader>
            <CardTitle>Profile Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <Label>Full Name</Label>
              <Input value={formData['Full Name']} onChange={(e) => setFormData({...formData, 'Full Name': e.target.value})} />
            </div>
            <div>
              <Label>Email</Label>
              <Input type="email" value={formData['Email']} onChange={(e) => setFormData({...formData, 'Email': e.target.value})} />
            </div>
            <div>
              <Label>Mobile Number</Label>
              <Input value={formData['Mobile Number']} onChange={(e) => setFormData({...formData, 'Mobile Number': e.target.value})} />
            </div>
            <div>
              <Label>About You (500 chars)</Label>
              <Textarea maxLength={500} value={formData['About You']} onChange={(e) => setFormData({...formData, 'About You': e.target.value})} />
            </div>
            <div>
              <Label>Interests</Label>
              <div className="flex flex-wrap gap-2 mt-2">
                {INTERESTS.map(interest => (
                  <Badge key={interest} variant={formData.Interests.includes(interest) ? 'default' : 'outline'} className="cursor-pointer" onClick={() => toggleInterest(interest)}>
                    {interest}
                  </Badge>
                ))}
              </div>
            </div>
            <div className="flex gap-4">
              <Button onClick={handleSave} disabled={saving} className="bg-[#2563EB]">
                {saving ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Save className="h-4 w-4 mr-2" />}
                Save Changes
              </Button>
              <Button variant="outline" onClick={() => navigate('/member-dashboard')}>Cancel</Button>
            </div>
          </CardContent>
        </Card>
      </div>
      <Footer />
    </div>
  );
}
