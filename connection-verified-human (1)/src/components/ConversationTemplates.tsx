import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MessageSquare } from 'lucide-react';
import { airtableService } from '@/lib/airtable';

interface Template {
  id: string;
  name: string;
  type: string;
  message: string;
  trigger?: string;
}

const defaultTemplates = [
  { id: '1', name: 'Icebreaker', type: 'Chat', message: "What made you join Presence today?", trigger: '' },
  { id: '2', name: 'Guidance', type: 'Chat', message: "Share one thing that made you smile this week.", trigger: '' },
  { id: '3', name: 'Reflection', type: 'Chat', message: "If you could relive one day, which would it be?", trigger: '' },
  { id: '4', name: 'Close', type: 'Chat', message: "Thanks for your time — would you like to leave a rating?", trigger: '' }
];

export default function ConversationTemplates({ onUseTemplate }: { onUseTemplate: (text: string) => void }) {
  const [templates, setTemplates] = useState<Template[]>(defaultTemplates);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTemplates();
  }, []);

  const loadTemplates = async () => {
    try {
      const response = await airtableService.listRecords(
        'Templates',
        undefined,
        `OR({Type}='PWA Popup', {Type}='PWA Banner', {Type}='Chat')`
      );
      
      if (response.records && response.records.length > 0) {
        const templateData: Template[] = response.records.map(r => ({
          id: r.id,
          name: r.fields['Template Name'] || 'Untitled',
          type: r.fields['Type'] || 'Chat',
          message: r.fields['Message Body'] || '',
          trigger: r.fields['Trigger'] || ''
        })).filter(t => t.message);
        
        if (templateData.length > 0) {
          setTemplates(templateData);
        }
      }
    } catch (error) {
      console.error('Error loading templates:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center text-base">
          <MessageSquare className="w-4 h-4 mr-2" />
          Conversation Prompts
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {loading ? (
          <p className="text-sm text-gray-500">Loading templates...</p>
        ) : (
          templates.map((template) => (
            <div key={template.id} className="p-2 bg-gray-50 rounded">
              <p className="text-xs font-semibold text-[#2563EB] mb-1">{template.name}</p>
              <p className="text-sm mb-2">{template.message}</p>
              <Button size="sm" variant="outline" onClick={() => onUseTemplate(template.message)} className="text-xs">
                Use This
              </Button>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
}
