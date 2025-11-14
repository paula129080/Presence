import { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Bell, Heart, MessageCircle } from 'lucide-react';
import { airtableService } from '@/lib/airtable';
import { toast } from 'sonner';

interface Message {
  id: string;
  type: string;
  message: string;
  trigger: string;
}

interface AutomatedMessagingProps {
  sessionStatus: 'pre-session' | 'active' | 'post-session';
  userType: 'member' | 'host';
  isLiked?: boolean;
  isMutualLike?: boolean;
}

export default function AutomatedMessaging({ sessionStatus, userType, isLiked, isMutualLike }: AutomatedMessagingProps) {
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    loadMessages();
  }, [sessionStatus, isLiked, isMutualLike]);

  const loadMessages = async () => {
    try {
      let filter = '';
      
      if (sessionStatus === 'pre-session') {
        filter = `{Trigger}='Pre-Session'`;
      } else if (sessionStatus === 'post-session') {
        filter = `{Trigger}='Post-Session'`;
      } else if (isLiked) {
        filter = `{Trigger}='Like Received'`;
      } else if (isMutualLike) {
        filter = `{Trigger}='Mutual Like'`;
      }

      const response = await airtableService.listRecords('Templates', undefined, filter);
      
      if (response.records) {
        const msgs: Message[] = response.records.map(r => ({
          id: r.id,
          type: r.fields['Type'] || 'PWA Banner',
          message: r.fields['Message Body'] || '',
          trigger: r.fields['Trigger'] || ''
        }));
        
        setMessages(msgs);
        
        // Show toast for each message
        msgs.forEach(msg => {
          if (msg.type === 'PWA Banner') {
            toast.info(msg.message, { duration: 5000 });
          }
        });
      }
    } catch (error) {
      console.error('Error loading automated messages:', error);
    }
  };

  if (messages.length === 0) return null;

  return (
    <div className="space-y-2">
      {messages.map((msg) => (
        <Card key={msg.id} className="bg-blue-50 border-blue-200">
          <CardContent className="p-3 flex items-start gap-2">
            {msg.trigger === 'Like Received' && <Heart className="w-4 h-4 text-red-500 mt-0.5" />}
            {msg.trigger === 'Mutual Like' && <Heart className="w-4 h-4 text-red-500 mt-0.5 fill-red-500" />}
            {(msg.trigger === 'Pre-Session' || msg.trigger === 'Post-Session') && <MessageCircle className="w-4 h-4 text-blue-600 mt-0.5" />}
            <p className="text-sm text-gray-700">{msg.message}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
