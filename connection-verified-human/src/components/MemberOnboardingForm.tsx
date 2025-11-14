import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';

interface MemberFormData {
  name: string;
  email: string;
  timeZone: string;
  language: string;
  gender: string;
  interests: string[];
  aboutYou: string;
  referralSource: string;
  communityPledge: boolean;
  memberAgreement: boolean;
  ageRange: string;
  personalityTags: string[];
}


interface Props {
  onSubmit: (data: MemberFormData) => void;
  initialData?: Partial<MemberFormData>;
  ageRanges?: string[];
  personalityTags?: string[];
  loading?: boolean;
}

const COUNTRIES = ['Australia', 'Singapore', 'USA', 'UK', 'Canada', 'New Zealand'];
const TIMEZONES = ['AEST', 'PST', 'GMT', 'SGT', 'EST', 'NZST'];
const LANGUAGES = ['English', 'Spanish', 'Hindi', 'Mandarin', 'French', 'Other'];
const INTERESTS = ['Fitness', 'Music', 'Wellness', 'Technology', 'Art', 'Reading', 'Travel', 'Gaming'];
// Generate age options from 18 to 100
const AGE_OPTIONS = Array.from({ length: 83 }, (_, i) => (i + 18).toString());



export function MemberOnboardingForm({ onSubmit, initialData, ageRanges = [], personalityTags = [], loading }: Props) {

  const [formData, setFormData] = useState<MemberFormData>({
    name: initialData?.name || '',
    email: initialData?.email || '',
    timeZone: initialData?.timeZone || '',
    language: initialData?.language || 'English',
    gender: initialData?.gender || '',
    interests: initialData?.interests || [],
    aboutYou: initialData?.aboutYou || '',
    referralSource: initialData?.referralSource || '',
    communityPledge: initialData?.communityPledge || false,
    memberAgreement: initialData?.memberAgreement || false,
    ageRange: initialData?.ageRange || '',
    personalityTags: initialData?.personalityTags || []
  });

  const handleInterestToggle = (interest: string) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }));
  };

  const handleTagToggle = (tag: string) => {
    setFormData(prev => ({
      ...prev,
      personalityTags: prev.personalityTags.includes(tag)
        ? prev.personalityTags.filter(t => t !== tag)
        : [...prev.personalityTags, tag]
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div>
          <Label htmlFor="name">Name *</Label>
          <Input id="name" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} required />
        </div>

        <div>
          <Label htmlFor="email">Email *</Label>
          <Input id="email" type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} required />
        </div>

        <div>
          <Label>Age *</Label>
          <Select value={formData.ageRange} onValueChange={(v) => setFormData({...formData, ageRange: v})} required>
            <SelectTrigger><SelectValue placeholder="Select age" /></SelectTrigger>
            <SelectContent>
              {AGE_OPTIONS.map(age => <SelectItem key={age} value={age}>{age}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label>Time Zone *</Label>
          <Select value={formData.timeZone} onValueChange={(v) => setFormData({...formData, timeZone: v})}>
            <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
            <SelectContent>{TIMEZONES.map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}</SelectContent>
          </Select>
        </div>


        <div>
          <Label>Language Preference</Label>
          <Select value={formData.language} onValueChange={(v) => setFormData({...formData, language: v})}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>{LANGUAGES.map(l => <SelectItem key={l} value={l}>{l}</SelectItem>)}</SelectContent>
          </Select>
        </div>

        <div>
          <Label>Personality Tags (Optional)</Label>
          <div className="flex flex-wrap gap-2 mt-2">
            {personalityTags.map(tag => (
              <Badge
                key={tag}
                variant={formData.personalityTags.includes(tag) ? 'default' : 'outline'}
                className="cursor-pointer"
                onClick={() => handleTagToggle(tag)}
              >
                {tag}
              </Badge>
            ))}
          </div>
        </div>

        <div>
          <Label>Interests (Select all that apply)</Label>
          <div className="grid grid-cols-2 gap-2 mt-2">
            {INTERESTS.map(interest => (
              <div key={interest} className="flex items-center space-x-2">
                <Checkbox checked={formData.interests.includes(interest)} onCheckedChange={() => handleInterestToggle(interest)} />
                <label className="text-sm">{interest}</label>
              </div>
            ))}
          </div>
        </div>

        <div>
          <Label htmlFor="aboutYou">About You (500 characters max) *</Label>
          <Textarea id="aboutYou" value={formData.aboutYou} onChange={(e) => setFormData({...formData, aboutYou: e.target.value.slice(0, 500)})} maxLength={500} placeholder="Tell us about yourself..." rows={4} required />
          <p className="text-xs text-gray-500 mt-1">{formData.aboutYou.length}/500</p>
        </div>

        <div>
          <Label htmlFor="referral">How did you hear about us?</Label>
          <Input id="referral" value={formData.referralSource} onChange={(e) => setFormData({...formData, referralSource: e.target.value})} placeholder="TikTok, Instagram, Friend..." />
        </div>

        <div className="space-y-3 border-t pt-4">
          <div className="flex items-start space-x-2">
            <Checkbox id="pledge" checked={formData.communityPledge} onCheckedChange={(checked) => setFormData({...formData, communityPledge: checked === true})} required />
            <label htmlFor="pledge" className="text-sm">I agree to the Community Pledge *</label>
          </div>
          <div className="flex items-start space-x-2">
            <Checkbox id="agreement" checked={formData.memberAgreement} onCheckedChange={(checked) => setFormData({...formData, memberAgreement: checked === true})} required />
            <label htmlFor="agreement" className="text-sm">I accept the Member Agreement *</label>
          </div>
        </div>
      </div>

      <Button type="submit" className="w-full bg-[#E53935]" disabled={!formData.communityPledge || !formData.memberAgreement || loading}>
        {loading ? 'Submitting...' : 'Complete Registration'}
      </Button>
    </form>
  );
}
