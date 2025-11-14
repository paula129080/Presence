import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MemberRecord } from '@/lib/airtable';
import { User, Heart } from 'lucide-react';

interface MemberCardProps {
  member: MemberRecord;
  onLike?: (member: MemberRecord) => void;
  isLiked?: boolean;
}

export default function MemberCard({ member, onLike, isLiked }: MemberCardProps) {
  const { fields } = member;
  const photoUrl = fields['Profile Photo / AI Image']?.[0]?.url;
  const interests = fields['Interests'] || [];
  const personalityTags = fields['Personality Tags'] || [];

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <CardContent className="p-0">
        <div className="aspect-square bg-gray-100 flex items-center justify-center relative">
          {photoUrl ? (
            <img src={photoUrl} alt={fields['Full Name']} className="w-full h-full object-cover" />
          ) : (
            <User className="w-16 h-16 text-gray-400" />
          )}
        </div>
        
        <div className="p-4 space-y-3">
          <div>
            <h3 className="font-semibold text-lg">{fields['Full Name']}</h3>
            {fields['Member Age Group'] && (
              <p className="text-sm text-gray-600">{fields['Member Age Group']}</p>
            )}
          </div>

          {personalityTags.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {personalityTags.slice(0, 3).map((tag, idx) => (
                <Badge key={idx} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          )}

          {fields['About You'] && (
            <p className="text-sm text-gray-700 line-clamp-2">
              {fields['About You']}
            </p>
          )}

          {onLike && (
            <Button 
              onClick={() => onLike(member)} 
              className={`w-full ${isLiked ? 'bg-pink-500 hover:bg-pink-600' : 'bg-[#2563EB] hover:bg-[#1d4ed8]'}`}
            >
              <Heart className={`w-4 h-4 mr-2 ${isLiked ? 'fill-white' : ''}`} />
              {isLiked ? 'Liked' : 'Like Member'}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
