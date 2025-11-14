import { Badge } from '@/components/ui/badge';

interface StatusBadgeProps {
  status: string;
  type: 'booking' | 'payment' | 'notification' | 'videoRoom' | 'sessionType';
}

export function OperationsStatusBadge({ status, type }: StatusBadgeProps) {
  const getVariant = () => {
    if (type === 'booking') {
      switch (status) {
        case 'Completed': return 'default';
        case 'Created': return 'secondary';
        case 'Pending': return 'outline';
        case 'Cancelled': return 'destructive';
        default: return 'outline';
      }
    }
    
    if (type === 'payment') {
      switch (status) {
        case 'Completed': return 'default';
        case 'Processing': return 'secondary';
        case 'Pending': return 'outline';
        case 'Failed': return 'destructive';
        case 'Refunded': return 'outline';
        default: return 'outline';
      }
    }

    if (type === 'videoRoom') {
      switch (status) {
        case 'Active': return 'default';
        case 'Ended': return 'outline';
        case 'Not Created': return 'secondary';
        default: return 'outline';
      }
    }

    if (type === 'sessionType') {
      return 'secondary';
    }
    
    return 'outline';
  };

  return (
    <Badge variant={getVariant()} className="capitalize">
      {status}
    </Badge>
  );
}

