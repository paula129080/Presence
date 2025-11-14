import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { HostRecord } from '@/lib/airtable';
import { User } from 'lucide-react';

interface HostCardProps {
  host: HostRecord;
  onSelect?: (host: HostRecord) => void;
}

export default function HostCard({ host, onSelect }: HostCardProps) {
  const { fields } = host;
  const photoUrl = fields['Profile Photo']?.[0]?.url;
  const personalityTags = fields['Personality Tags'] || [];
  const languages = fields['Languages Spoken'] || [];
  const rebookRate = fields['Rebook Rate (%)'] || 0;

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <CardContent className="p-0">
        <div className="aspect-square bg-gray-100 flex items-center justify-center">
          {photoUrl ? (
            <img src={photoUrl} alt={fields['Full Name']} className="w-full h-full object-cover" />
          ) : (
            <User className="w-16 h-16 text-gray-400" />
          )}
        </div>
        
        <div className="p-4 space-y-3">
          <div>
            <h3 className="font-semibold text-lg">{fields['Full Name']}</h3>
            {languages.length > 0 && (
              <p className="text-sm text-gray-600">{languages.join(', ')}</p>
            )}
          </div>

          {personalityTags.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {personalityTags.map((tag, idx) => (
                <Badge key={idx} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          )}

          {fields['About You (Host Bio)'] && (
            <p className="text-sm text-gray-700 line-clamp-2">
              {fields['About You (Host Bio)']}
            </p>
          )}

          {rebookRate > 0 && (
            <p className="text-xs text-gray-500">
              {rebookRate}% rebook rate
            </p>
          )}

          {onSelect && (
            <Button 
              onClick={() => onSelect(host)} 
              className="w-full bg-[#2563EB] hover:bg-[#1d4ed8]"
            >
              Select Host
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
