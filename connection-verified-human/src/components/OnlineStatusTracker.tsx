import { useEffect, useContext } from 'react';
import { AppContext } from '@/contexts/AppContext';
import { airtableService } from '@/lib/airtable';

export default function OnlineStatusTracker() {
  const { currentUser, userType } = useContext(AppContext);

  useEffect(() => {
    if (!currentUser) return;

    // Update "Last Active" timestamp every 2 minutes
    const updateStatus = async () => {
      const table = userType === 'host' ? 'Host Registry' : 'Member Registry';
      const timestamp = new Date().toISOString();
      
      await airtableService.updateRecord(table, currentUser.id, {
        'Last Active': timestamp
      });
    };

    // Initial update
    updateStatus();

    // Update every 2 minutes
    const interval = setInterval(updateStatus, 2 * 60 * 1000);

    // Cleanup on unmount
    return () => {
      clearInterval(interval);
      // Mark as offline when component unmounts
      const table = userType === 'host' ? 'Host Registry' : 'Member Registry';
      airtableService.updateRecord(table, currentUser.id, {
        'Last Active': new Date(Date.now() - 15 * 60 * 1000).toISOString() // 15 mins ago
      });
    };
  }, [currentUser, userType]);

  return null; // This component doesn't render anything
}
