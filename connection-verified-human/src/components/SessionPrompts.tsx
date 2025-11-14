import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MessageSquare, Clock } from 'lucide-react';
import { airtableService } from '@/lib/airtable';

interface SessionPromptsProps {
  sessionStage: 'pre' | 'active' | 'post';
  onUsePrompt?: (text: string) => void;
  onComplete?: () => void;
}

interface Prompt {
  text: string;
  type: string;
}

const defaultPrePrompts = [
  { text: "Take a deep breath — Presence is for kind, open conversations.", type: "Reminder" }
];

const defaultPostPrompts = [
  { text: "How did that chat feel? Remember — small moments can mean a lot.", type: "Reflection" }
];

const defaultActivePrompts = [
  { text: "Share one thing that made you smile this week.", type: "Positive Focus" },
  { text: "If you could relive one day, which would it be?", type: "Reflection" },
  { text: "What's something you're looking forward to?", type: "Future Focus" }
];

export default function SessionPrompts({ sessionStage, onUsePrompt, onComplete }: SessionPromptsProps) {
  const [prePrompts, setPrePrompts] = useState<Prompt[]>(defaultPrePrompts);
  const [postPrompts, setPostPrompts] = useState<Prompt[]>(defaultPostPrompts);
  const [activePrompts] = useState<Prompt[]>(defaultActivePrompts);

  useEffect(() => {
    loadTemplates();
  }, []);

  const loadTemplates = async () => {
    try {
      const response = await airtableService.listRecords(
        'Templates',
        undefined,
        `OR({Template Name}='Pre-Session Prompt', {Template Name}='Post-Session Reflection')`
      );
      
      if (response.records) {
        response.records.forEach(r => {
          const name = r.fields['Template Name'];
          const message = r.fields['Message Body'] || '';
          const type = r.fields['Type'] || 'Prompt';
          
          if (name === 'Pre-Session Prompt' && message) {
            setPrePrompts([{ text: message, type }]);
          }
          if (name === 'Post-Session Reflection' && message) {
            setPostPrompts([{ text: message, type }]);
          }
        });
      }
    } catch (error) {
      console.error('Error loading session templates:', error);
    }
  };

  const prompts = sessionStage === 'pre' ? prePrompts 
    : sessionStage === 'post' ? postPrompts 
    : activePrompts;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center text-base">
          {sessionStage === 'pre' ? <Clock className="w-4 h-4 mr-2" /> : <MessageSquare className="w-4 h-4 mr-2" />}
          {sessionStage === 'pre' ? 'Pre-Session Prompts' : sessionStage === 'post' ? 'Closing Prompts' : 'Conversation Starters'}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {prompts.map((prompt, idx) => (
          <div key={idx} className="p-2 bg-gray-50 rounded">
            <p className="text-xs font-semibold text-[#2563EB] mb-1">{prompt.type}</p>
            <p className="text-sm mb-2">{prompt.text}</p>
            {onUsePrompt && sessionStage === 'active' && (
              <Button size="sm" variant="outline" onClick={() => onUsePrompt(prompt.text)} className="text-xs">
                Use This
              </Button>
            )}
          </div>
        ))}
        {sessionStage === 'post' && onComplete && (
          <Button onClick={onComplete} className="w-full mt-2 bg-[#2563EB]">
            Complete Session
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
