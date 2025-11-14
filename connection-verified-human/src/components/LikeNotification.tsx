import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Heart, X } from 'lucide-react';
import { airtableService } from '@/lib/airtable';

interface LikeNotificationProps {
  memberId: string;
}

interface LikeRecord {
  id: string;
  hostName: string;
  hostId: string;
  isMutual: boolean;
  timestamp: string;
}

interface Template {
  name: string;
  message: string;
}

export default function LikeNotification({ memberId }: LikeNotificationProps) {
  const [likes, setLikes] = useState<LikeRecord[]>([]);
  const [dismissed, setDismissed] = useState<Set<string>>(new Set());
  const [templates, setTemplates] = useState<{ hostLiked: string; mutualLike: string }>({
    hostLiked: '{{host_name}} liked your profile — you can rebook or start a new chat anytime.',
    mutualLike: 'It\'s a match! You and {{host_name}} both liked each other. You can rebook directly.'
  });

  useEffect(() => {
    loadTemplates();
    loadLikes();
  }, [memberId]);

  const loadTemplates = async () => {
    try {
      const response = await airtableService.listRecords(
        'Templates',
        undefined,
        `OR({Template Name}='Host Liked You', {Template Name}='Mutual Like')`
      );
      
      if (response.records) {
        const templateData: { [key: string]: string } = {};
        response.records.forEach(r => {
          const name = r.fields['Template Name'];
          const message = r.fields['Message Body'] || '';
          if (name === 'Host Liked You') templateData.hostLiked = message;
          if (name === 'Mutual Like') templateData.mutualLike = message;
        });
        
        if (templateData.hostLiked || templateData.mutualLike) {
          setTemplates(prev => ({ ...prev, ...templateData }));
        }
      }
    } catch (error) {
      console.error('Error loading templates:', error);
    }
  };

  const loadLikes = async () => {
    try {
      const response = await airtableService.listRecords(
        'Likes',
        undefined,
        `{Member ID}='${memberId}'`
      );
      
      if (response.records) {
        const likeData: LikeRecord[] = response.records.map(r => ({
          id: r.id,
          hostName: r.fields['Host Name'] || 'Unknown Host',
          hostId: r.fields['Host ID'] || '',
          isMutual: r.fields['Is Mutual'] || false,
          timestamp: r.fields['Created Time'] || new Date().toISOString()
        }));
        setLikes(likeData);
      }
    } catch (error) {
      console.error('Error loading likes:', error);
    }
  };

  const handleDismiss = (likeId: string) => {
    setDismissed(prev => new Set([...prev, likeId]));
  };

  const getMessage = (like: LikeRecord) => {
    const template = like.isMutual ? templates.mutualLike : templates.hostLiked;
    return template.replace(/\{\{host_name\}\}/g, like.hostName);
  };

  const visibleLikes = likes.filter(like => !dismissed.has(like.id));

  if (visibleLikes.length === 0) return null;

  return (
    <div className="fixed top-20 right-4 z-50 space-y-2 max-w-sm">
      {visibleLikes.map(like => (
        <Card key={like.id} className={`${like.isMutual ? 'border-pink-500 bg-pink-50' : 'border-blue-500 bg-blue-50'} shadow-lg`}>
          <CardContent className="p-4">
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-3">
                <Heart className={`w-6 h-6 ${like.isMutual ? 'fill-pink-500 text-pink-500' : 'text-blue-500'}`} />
                <div>
                  <p className="font-semibold text-sm">
                    {like.isMutual ? 'Mutual Match!' : 'New Like'}
                  </p>
                  <p className="text-sm text-gray-700">
                    {getMessage(like)}
                  </p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleDismiss(like.id)}
                className="h-6 w-6 p-0"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
            {like.isMutual && (
              <Button size="sm" className="w-full mt-3 bg-pink-500 hover:bg-pink-600">
                Book a Session
              </Button>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
