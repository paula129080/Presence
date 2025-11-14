import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import OnlineStatusTracker from './OnlineStatusTracker';
import OnlineNotificationBanner from './OnlineNotificationBanner';

const AppLayout: React.FC = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    navigate('/');
  }, [navigate]);

  return (
    <>
      <OnlineStatusTracker />
      <OnlineNotificationBanner />
    </>
  );
};

export default AppLayout;
