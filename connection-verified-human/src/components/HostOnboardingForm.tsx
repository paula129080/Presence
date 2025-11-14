import { useState } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Upload, CheckCircle } from 'lucide-react';

const PERSONALITY_TAGS = ['Calm', 'Outgoing', 'Empathetic', 'Analytical', 'Funny', 'Motivator', 'Listener'];
const LANGUAGES = ['English', 'Spanish', 'French', 'German', 'Japanese', 'Mandarin', 'Hindi', 'Arabic'];
const TIMEZONES = ['AEST', 'PST', 'EST', 'GMT', 'CET', 'JST', 'IST'];
const AGE_RANGES = ['18-25', '26-35', '36-45', '46-55', '56-65', '65+'];
const SKILLS_INTERESTS = ['Fitness', 'Music', 'Wellness', 'Technology', 'Art', 'Teaching', 'Coaching', 'Mentoring', 'Creative Arts', 'Business'];

interface HostOnboardingFormProps {
  onSubmit: (data: any) => void;
  loading?: boolean;
}

export default function HostOnboardingForm({ onSubmit, loading }: HostOnboardingFormProps) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    mobile: '',
    bio: '',
    languages: [] as string[],
    timezone: '',
    ageRange: '',
    skillsInterests: [] as string[],
    personalityTags: [] as string[],
    hoursPerWeek: '',
    pledgeSigned: false,
    hostAgreementAccepted: false
  });


  const [profilePhoto, setProfilePhoto] = useState<File | null>(null);
  const [fullPhoto, setFullPhoto] = useState<File | null>(null);
  const [introVideo, setIntroVideo] = useState<File | null>(null);

  const toggleLanguage = (lang: string) => {
    setFormData(prev => ({
      ...prev,
      languages: prev.languages.includes(lang)
        ? prev.languages.filter(l => l !== lang)
        : [...prev.languages, lang]
    }));
  };

  const toggleTag = (tag: string) => {
    if (formData.personalityTags.includes(tag)) {
      setFormData(prev => ({
        ...prev,
        personalityTags: prev.personalityTags.filter(t => t !== tag)
      }));
    } else if (formData.personalityTags.length < 3) {
      setFormData(prev => ({
        ...prev,
        personalityTags: [...prev.personalityTags, tag]
      }));
    }
  };

  const toggleSkill = (skill: string) => {
    setFormData(prev => ({
      ...prev,
      skillsInterests: prev.skillsInterests.includes(skill)
        ? prev.skillsInterests.filter(s => s !== skill)
        : [...prev.skillsInterests, skill]
    }));
  };


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ ...formData, profilePhoto, fullPhoto, introVideo });
  };

  const canSubmit = formData.fullName && formData.email && formData.mobile && 
    formData.bio && formData.languages.length > 0 && formData.timezone &&
    formData.personalityTags.length > 0 && profilePhoto && fullPhoto && 
    introVideo && formData.pledgeSigned && formData.hostAgreementAccepted;


  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Basic Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>Full Name *</Label>
            <Input value={formData.fullName} onChange={e => setFormData({...formData, fullName: e.target.value})} required />
          </div>
          <div>
            <Label>Email *</Label>
            <Input type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} required />
          </div>
          <div>
            <Label>Mobile Number *</Label>
            <Input value={formData.mobile} onChange={e => setFormData({...formData, mobile: e.target.value})} required />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>About You</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>Age Range *</Label>
            <select 
              value={formData.ageRange} 
              onChange={e => setFormData({...formData, ageRange: e.target.value})}
              className="w-full border rounded-md p-2"
              required
            >
              <option value="">Select age range</option>
              {AGE_RANGES.map(range => <option key={range} value={range}>{range}</option>)}
            </select>
          </div>

          <div>
            <Label>Bio (500 characters max) *</Label>
            <Textarea 
              value={formData.bio} 
              onChange={e => setFormData({...formData, bio: e.target.value.slice(0, 500)})} 
              placeholder="Tell members about yourself..."
              maxLength={500}
              rows={4}
            />
            <p className="text-xs text-gray-500 mt-1">{formData.bio.length}/500</p>
          </div>

          <div>
            <Label>Skills / Interests (Select all that apply)</Label>
            <div className="flex flex-wrap gap-2 mt-2">
              {SKILLS_INTERESTS.map(skill => (
                <Badge
                  key={skill}
                  variant={formData.skillsInterests.includes(skill) ? 'default' : 'outline'}
                  className="cursor-pointer"
                  onClick={() => toggleSkill(skill)}
                >
                  {skill}
                </Badge>
              ))}
            </div>
          </div>

          <div>
            <Label>Languages Spoken * (Select all that apply)</Label>
            <div className="flex flex-wrap gap-2 mt-2">
              {LANGUAGES.map(lang => (
                <Badge
                  key={lang}
                  variant={formData.languages.includes(lang) ? 'default' : 'outline'}
                  className="cursor-pointer"
                  onClick={() => toggleLanguage(lang)}
                >
                  {lang}
                </Badge>
              ))}
            </div>
          </div>

          <div>
            <Label>Time Zone *</Label>
            <select 
              value={formData.timezone} 
              onChange={e => setFormData({...formData, timezone: e.target.value})}
              className="w-full border rounded-md p-2"
              required
            >
              <option value="">Select timezone</option>
              {TIMEZONES.map(tz => <option key={tz} value={tz}>{tz}</option>)}
            </select>
          </div>

          <div>
            <Label>Personality Tags * (Select up to 3)</Label>
            <div className="flex flex-wrap gap-2 mt-2">
              {PERSONALITY_TAGS.map(tag => (
                <Badge
                  key={tag}
                  variant={formData.personalityTags.includes(tag) ? 'default' : 'outline'}
                  className="cursor-pointer"
                  onClick={() => toggleTag(tag)}
                >
                  {tag}
                </Badge>
              ))}
            </div>
            <p className="text-xs text-gray-500 mt-1">{formData.personalityTags.length}/3 selected</p>
          </div>

          <div>
            <Label>Availability (Hours per Week)</Label>
            <Input 
              type="number" 
              value={formData.hoursPerWeek} 
              onChange={e => setFormData({...formData, hoursPerWeek: e.target.value})} 
              placeholder="e.g., 10"
            />
          </div>
        </CardContent>
      </Card>


      <Card>
        <CardHeader>
          <CardTitle>Verification Media</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>Profile Photo *</Label>
            <div className="border-2 border-dashed rounded-lg p-4 text-center">
              <input type="file" accept="image/*" onChange={e => setProfilePhoto(e.target.files?.[0] || null)} className="hidden" id="profile" />
              <label htmlFor="profile" className="cursor-pointer">
                {profilePhoto ? <CheckCircle className="w-8 h-8 mx-auto text-green-600 mb-1" /> : <Upload className="w-8 h-8 mx-auto text-gray-400 mb-1" />}
                <p className="text-sm">{profilePhoto?.name || 'Upload headshot'}</p>
              </label>
            </div>
          </div>

          <div>
            <Label>Full-Length Photo *</Label>
            <div className="border-2 border-dashed rounded-lg p-4 text-center">
              <input type="file" accept="image/*" onChange={e => setFullPhoto(e.target.files?.[0] || null)} className="hidden" id="full" />
              <label htmlFor="full" className="cursor-pointer">
                {fullPhoto ? <CheckCircle className="w-8 h-8 mx-auto text-green-600 mb-1" /> : <Upload className="w-8 h-8 mx-auto text-gray-400 mb-1" />}
                <p className="text-sm">{fullPhoto?.name || 'Upload full photo'}</p>
              </label>
            </div>
          </div>

          <div>
            <Label>Intro Video (10-30 seconds) *</Label>
            <div className="border-2 border-dashed rounded-lg p-4 text-center">
              <input type="file" accept="video/*" onChange={e => setIntroVideo(e.target.files?.[0] || null)} className="hidden" id="video" />
              <label htmlFor="video" className="cursor-pointer">
                {introVideo ? <CheckCircle className="w-8 h-8 mx-auto text-green-600 mb-1" /> : <Upload className="w-8 h-8 mx-auto text-gray-400 mb-1" />}
                <p className="text-sm">{introVideo?.name || 'Upload intro video'}</p>
              </label>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex items-start space-x-3 border rounded-lg p-4 bg-blue-50 border-blue-200">
        <Checkbox 
          checked={formData.hostAgreementAccepted} 
          onCheckedChange={c => setFormData({...formData, hostAgreementAccepted: c === true})} 
        />
        <p className="text-sm font-medium">I accept the Host Agreement and understand my responsibilities as a Presence host *</p>
      </div>

      <div className="flex items-start space-x-3 border rounded-lg p-4">
        <Checkbox checked={formData.pledgeSigned} onCheckedChange={c => setFormData({...formData, pledgeSigned: c === true})} />
        <p className="text-sm">I agree to the Community Pledge and will uphold respect, empathy, and privacy *</p>
      </div>


      <Button type="submit" disabled={!canSubmit || loading} className="w-full bg-[#4285B9] hover:bg-[#3367a0]">
        {loading ? 'Submitting...' : 'Submit for Verification'}
      </Button>
    </form>
  );
}
