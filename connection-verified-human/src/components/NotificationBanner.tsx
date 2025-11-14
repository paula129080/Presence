import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface NotificationBannerProps {
  message: string;
  type?: 'info' | 'warning' | 'success';
  onDismiss?: () => void;
}

export default function NotificationBanner({ 
  message, 
  type = 'info', 
  onDismiss 
}: NotificationBannerProps) {
  const bgColors = {
    info: 'bg-blue-50 border-blue-200',
    warning: 'bg-amber-50 border-amber-200',
    success: 'bg-green-50 border-green-200'
  };

  const textColors = {
    info: 'text-blue-900',
    warning: 'text-amber-900',
    success: 'text-green-900'
  };

  return (
    <div className={`${bgColors[type]} border rounded-lg p-4 mb-6 flex items-center justify-between`}>
      <p className={`${textColors[type]} text-sm flex-1`}>
        {message}
      </p>
      {onDismiss && (
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={onDismiss}
          className="ml-4"
        >
          <X className="w-4 h-4" />
        </Button>
      )}
    </div>
  );
}
