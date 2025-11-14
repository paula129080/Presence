import { PresenceOperation, isSessionReady, canJoinSession } from '@/lib/airtable';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { OperationsStatusBadge } from '@/components/OperationsStatusBadge';
import { Calendar, Clock, Video, ExternalLink } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface SessionCardProps {
  operation: PresenceOperation;
  userType: 'host' | 'member';
  onJoinSession?: (operation: PresenceOperation) => void;
}

export function SessionCard({ operation, userType }: SessionCardProps) {
  const navigate = useNavigate();
  const { fields } = operation;
  const sessionReady = isSessionReady(operation);
  const canJoin = canJoinSession(operation, userType);
  
  const displayName = userType === 'host' ? fields['Member Name'] : fields['Host Name'];
  const bookingId = fields['Cal.com Booking ID'];

  const handleJoinSession = () => {
    if (bookingId) {
      // Navigate to video session with Cal.com booking ID
      navigate(`/video-session?bookingId=${bookingId}&userType=${userType}`);
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg">{displayName || 'Unknown'}</CardTitle>
            <p className="text-sm text-gray-500">{fields['Plan Type']} Plan</p>
          </div>
          <div className="flex gap-2 flex-wrap justify-end">
            {fields['Booking Status'] && (
              <OperationsStatusBadge status={fields['Booking Status']} type="booking" />
            )}
            {fields['Video Room Status'] && (
              <OperationsStatusBadge status={fields['Video Room Status']} type="videoRoom" />
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-4 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            {fields['Session Date'] || fields['Session Start Time'] ? 
              new Date(fields['Session Start Time'] || fields['Session Date'] || '').toLocaleDateString() 
              : 'TBD'}
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            {fields['Session Time'] || fields['Session Start Time'] ? 
              new Date(fields['Session Start Time'] || '').toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
              : 'TBD'}
          </div>
          {fields['Session Duration (mins)'] && (
            <span>({fields['Session Duration (mins)']} mins)</span>
          )}
        </div>

        {fields['Session Type'] && (
          <div className="flex items-center gap-2">
            <Video className="w-4 h-4" />
            <OperationsStatusBadge status={fields['Session Type']} type="sessionType" />
          </div>
        )}

        {sessionReady && canJoin && bookingId && (
          <Button 
            className="w-full bg-[#2563EB]" 
            onClick={handleJoinSession}
          >
            <Video className="w-4 h-4 mr-2" />
            Join Video Session
          </Button>
        )}

        {fields['Cal.com URL'] && (
          <Button variant="outline" className="w-full" asChild>
            <a href={fields['Cal.com URL']} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="w-4 h-4 mr-2" />
              View on Cal.com
            </a>
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
