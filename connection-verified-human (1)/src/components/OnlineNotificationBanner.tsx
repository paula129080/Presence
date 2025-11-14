import { useState, useEffect, useContext } from 'react';
import { AppContext } from '@/contexts/AppContext';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { X, MessageCircle } from 'lucide-react';
import { airtableService } from '@/lib/airtable';
import { useNavigate } from 'react-router-dom';

interface OnlineNotification {
  id: string;
  userName: string;
  userType: 'host' | 'member';
  timestamp: string;
}

export default function OnlineNotificationBanner() {
  const { currentUser, userType } = useContext(AppContext);
  const [notifications, setNotifications] = useState<OnlineNotification[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser) return;

    const checkOnlineUsers = async () => {
      // Get past sessions to find connected users
      const opsRes = await airtableService.listRecords('Presence Operations');
      if (!opsRes.records) return;

      const myName = currentUser.fields['Full Name'];
      const connectedUsers = new Set<string>();

      // Find users we've had sessions with
      opsRes.records.forEach((op: any) => {
        if (userType === 'member' && op.fields['Member Name'] === myName) {
          connectedUsers.add(op.fields['Host Name']);
        } else if (userType === 'host' && op.fields['Host Name'] === myName) {
          connectedUsers.add(op.fields['Member Name']);
        }
      });

      // Check if any connected users are online
      const table = userType === 'member' ? 'Host Registry' : 'Member Registry';
      const usersRes = await airtableService.listRecords(table);
      
      if (usersRes.records) {
        const now = Date.now();
        const onlineUsers = usersRes.records.filter((user: any) => {
          const lastActive = new Date(user.fields['Last Active'] || 0).getTime();
          const isOnline = now - lastActive < 5 * 60 * 1000; // Online if active within 5 mins
          return isOnline && connectedUsers.has(user.fields['Full Name']);
        });

        // Create notifications for newly online users
        const newNotifications = onlineUsers.slice(0, 3).map((user: any) => ({
          id: user.id,
          userName: user.fields['Full Name'],
          userType: userType === 'member' ? 'host' : 'member',
          timestamp: new Date().toISOString()
        }));

        setNotifications(newNotifications);
      }
    };

    checkOnlineUsers();
    const interval = setInterval(checkOnlineUsers, 3 * 60 * 1000); // Check every 3 mins

    return () => clearInterval(interval);
  }, [currentUser, userType]);

  const dismissNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  if (notifications.length === 0) return null;

  return (
    <div className="fixed top-20 right-4 z-50 space-y-2 max-w-md">
      {notifications.map(notif => (
        <Alert key={notif.id} className="bg-blue-50 border-blue-200">
          <AlertDescription className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MessageCircle className="h-4 w-4 text-blue-600" />
              <span className="text-sm">
                {notif.userType === 'host' 
                  ? `Your host ${notif.userName} is now online`
                  : `${notif.userName} is online — you can rebook them anytime`}
              </span>
            </div>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => dismissNotification(notif.id)}
            >
              <X className="h-4 w-4" />
            </Button>
          </AlertDescription>
        </Alert>
      ))}
    </div>
  );
}
