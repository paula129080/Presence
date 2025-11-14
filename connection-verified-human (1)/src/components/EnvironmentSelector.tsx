import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const environments = [
  { name: 'The Beach', tone: 'Relaxed, conversational', color: 'bg-blue-100' },
  { name: 'The Bar', tone: 'Social, evening feel', color: 'bg-amber-100' },
  { name: 'The Cabin', tone: 'Reflective, warm', color: 'bg-orange-100' },
  { name: 'The Garden', tone: 'Bright, neutral', color: 'bg-green-100' },
  { name: 'The Studio', tone: 'Minimalist, focused', color: 'bg-gray-100' }
];

interface EnvironmentSelectorProps {
  selected: string;
  onSelect: (env: string) => void;
}

export default function EnvironmentSelector({ selected, onSelect }: EnvironmentSelectorProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Choose Your Space</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {environments.map((env) => (
          <Button
            key={env.name}
            variant={selected === env.name ? 'default' : 'outline'}
            className={`w-full justify-start ${selected === env.name ? 'bg-[#2563EB]' : ''}`}
            onClick={() => onSelect(env.name)}
          >
            <div className={`w-3 h-3 rounded-full ${env.color} mr-2`} />
            <div className="text-left">
              <div className="font-semibold text-sm">{env.name}</div>
              <div className="text-xs opacity-75">{env.tone}</div>
            </div>
          </Button>
        ))}
      </CardContent>
    </Card>
  );
}
