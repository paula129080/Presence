import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';

const PERSONALITY_TAGS = ['Calm', 'Outgoing', 'Empathetic', 'Analytical', 'Funny', 'Motivator', 'Listener'];
const LANGUAGES = ['English', 'Spanish', 'French', 'German', 'Japanese', 'Mandarin', 'Hindi', 'Arabic'];
const TIMEZONES = ['AEST', 'PST', 'EST', 'GMT', 'CET', 'JST', 'IST'];
const AGE_GROUPS = ['18-25', '26-35', '36-45', '46-55', '56-65', '65+'];
const CATEGORIES = [
  'Friendship & Connection',
  'Emotional Support',
  'Career & Mentorship',
  'Health & Wellness',
  'General Chat'
];

export default function MemberPreferences() {
  const [preferences, setPreferences] = useState({
    personalityTags: [] as string[],
    languages: [] as string[],
    timezone: '',
    memberAgeGroup: '',
    preferredHostAgeGroups: [] as string[],
    preferredCategories: [] as string[]
  });

  const toggleTag = (tag: string) => {
    setPreferences(prev => ({
      ...prev,
      personalityTags: prev.personalityTags.includes(tag)
        ? prev.personalityTags.filter(t => t !== tag)
        : [...prev.personalityTags, tag]
    }));
  };

  const toggleLanguage = (language: string) => {
    setPreferences(prev => ({
      ...prev,
      languages: prev.languages.includes(language)
        ? prev.languages.filter(l => l !== language)
        : [...prev.languages, language]
    }));
  };

  const toggleAgeGroup = (ageGroup: string) => {
    setPreferences(prev => ({
      ...prev,
      preferredHostAgeGroups: prev.preferredHostAgeGroups.includes(ageGroup)
        ? prev.preferredHostAgeGroups.filter(a => a !== ageGroup)
        : [...prev.preferredHostAgeGroups, ageGroup]
    }));
  };

  const toggleCategory = (category: string) => {
    setPreferences(prev => ({
      ...prev,
      preferredCategories: prev.preferredCategories.includes(category)
        ? prev.preferredCategories.filter(c => c !== category)
        : [...prev.preferredCategories, category]
    }));
  };

  const handleSave = () => {
    localStorage.setItem('memberPreferences', JSON.stringify(preferences));
    toast.success('Preferences saved successfully!');
  };

  useEffect(() => {
    const saved = localStorage.getItem('memberPreferences');
    if (saved) {
      setPreferences(JSON.parse(saved));
    }
  }, []);

  return (
    <div className="container mx-auto p-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-2">Member Preferences</h1>
      <p className="text-muted-foreground mb-8">
        Help us match you with the perfect host by setting your preferences
      </p>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Your Age Group</CardTitle>
          </CardHeader>
          <CardContent>
            <Select value={preferences.memberAgeGroup} onValueChange={(val) => setPreferences(prev => ({ ...prev, memberAgeGroup: val }))}>
              <SelectTrigger>
                <SelectValue placeholder="Select your age group" />
              </SelectTrigger>
              <SelectContent>
                {AGE_GROUPS.map(age => (
                  <SelectItem key={age} value={age}>{age}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Preferred Host Age Groups</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {AGE_GROUPS.map(age => (
                <div key={age} className="flex items-center space-x-2">
                  <Checkbox
                    id={`age-${age}`}
                    checked={preferences.preferredHostAgeGroups.includes(age)}
                    onCheckedChange={() => toggleAgeGroup(age)}
                  />
                  <Label htmlFor={`age-${age}`}>{age}</Label>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Conversation Categories</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {CATEGORIES.map(category => (
                <div key={category} className="flex items-center space-x-2">
                  <Checkbox
                    id={`cat-${category}`}
                    checked={preferences.preferredCategories.includes(category)}
                    onCheckedChange={() => toggleCategory(category)}
                  />
                  <Label htmlFor={`cat-${category}`}>{category}</Label>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Preferred Personality Tags</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {PERSONALITY_TAGS.map(tag => (
                <div key={tag} className="flex items-center space-x-2">
                  <Checkbox
                    id={tag}
                    checked={preferences.personalityTags.includes(tag)}
                    onCheckedChange={() => toggleTag(tag)}
                  />
                  <Label htmlFor={tag}>{tag}</Label>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Language Preferences</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {LANGUAGES.map(lang => (
                <div key={lang} className="flex items-center space-x-2">
                  <Checkbox
                    id={lang}
                    checked={preferences.languages.includes(lang)}
                    onCheckedChange={() => toggleLanguage(lang)}
                  />
                  <Label htmlFor={lang}>{lang}</Label>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Time Zone</CardTitle>
          </CardHeader>
          <CardContent>
            <Select value={preferences.timezone} onValueChange={(val) => setPreferences(prev => ({ ...prev, timezone: val }))}>
              <SelectTrigger>
                <SelectValue placeholder="Select your timezone" />
              </SelectTrigger>
              <SelectContent>
                {TIMEZONES.map(tz => (
                  <SelectItem key={tz} value={tz}>{tz}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CardContent>
        </Card>

        <Button onClick={handleSave} size="lg" className="w-full">
          Save Preferences
        </Button>
      </div>
    </div>
  );
}
