import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MessageCircle, Heart, Bell } from 'lucide-react';

export default function MessageFlowPreview() {
  const messageFlows = [
    {
      trigger: 'Pre-Session',
      type: 'PWA Banner',
      icon: Bell,
      color: 'bg-blue-100 text-blue-700',
      messages: [
        { to: 'Member', text: 'Take a deep breath — your Presence chat starts soon' },
        { to: 'Host', text: 'Your session starts in 5 minutes. Review member preferences.' }
      ]
    },
    {
      trigger: 'Post-Session',
      type: 'PWA Popup',
      icon: MessageCircle,
      color: 'bg-green-100 text-green-700',
      messages: [
        { to: 'Member', text: 'How did that chat feel? You can rebook anytime.' },
        { to: 'Host', text: 'Session complete! Rate your experience.' }
      ]
    },
    {
      trigger: 'Like Received',
      type: 'SMS',
      icon: Heart,
      color: 'bg-pink-100 text-pink-700',
      messages: [
        { to: 'Host', text: 'Great news! A member liked your session. They may rebook soon.' }
      ]
    },
    {
      trigger: 'Mutual Like',
      type: 'PWA Banner',
      icon: Heart,
      color: 'bg-red-100 text-red-700',
      messages: [
        { to: 'Both', text: 'You both loved this session! Book again anytime.' }
      ]
    }
  ];

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Automated Message Flow</h2>
      <p className="text-gray-600">Messages are pulled from Airtable Templates table and triggered automatically</p>
      
      {messageFlows.map((flow, idx) => {
        const Icon = flow.icon;
        return (
          <Card key={idx}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Icon className="w-5 h-5" />
                {flow.trigger}
                <Badge className={flow.color}>{flow.type}</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {flow.messages.map((msg, i) => (
                <div key={i} className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-xs font-semibold text-gray-500 mb-1">To: {msg.to}</p>
                  <p className="text-sm">{msg.text}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
