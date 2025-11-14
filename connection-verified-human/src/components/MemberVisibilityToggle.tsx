import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { airtableService } from '@/lib/airtable';
import { useToast } from '@/hooks/use-toast';
import { Eye, EyeOff } from 'lucide-react';

interface MemberVisibilityToggleProps {
  memberId: string;
}

export default function MemberVisibilityToggle({ memberId }: MemberVisibilityToggleProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchVisibilityStatus();
  }, [memberId]);

  const fetchVisibilityStatus = async () => {
    const response = await airtableService.getRecord('Member Registry', memberId);
    if (response.record) {
      setIsVisible(response.record.fields['Online Visibility'] !== false);
    }
  };

  const handleToggle = async (checked: boolean) => {
    setLoading(true);
    const response = await airtableService.updateRecord('Member Registry', memberId, {
      'Online Visibility': checked,
      'Visibility Updated': new Date().toISOString()
    });

    if (response.error) {
      toast({
        title: 'Error',
        description: 'Failed to update visibility settings',
        variant: 'destructive'
      });
    } else {
      setIsVisible(checked);
      toast({
        title: 'Settings Updated',
        description: checked 
          ? 'You will now appear online to hosts you\'ve connected with' 
          : 'You will not appear online to anyone',
      });
    }
    setLoading(false);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {isVisible ? <Eye className="h-5 w-5" /> : <EyeOff className="h-5 w-5" />}
          Online Visibility
        </CardTitle>
        <CardDescription>
          Control whether hosts you've connected with can see when you're online
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <Label htmlFor="visibility-toggle" className="cursor-pointer">
            {isVisible ? 'Visible to connected hosts' : 'Hidden from all hosts'}
          </Label>
          <Switch
            id="visibility-toggle"
            checked={isVisible}
            onCheckedChange={handleToggle}
            disabled={loading}
          />
        </div>
        <p className="text-sm text-gray-500 mt-4">
          When enabled, hosts you've had sessions with will be notified when you come online. 
          This helps facilitate spontaneous connections and rebookings.
        </p>
      </CardContent>
    </Card>
  );
}
