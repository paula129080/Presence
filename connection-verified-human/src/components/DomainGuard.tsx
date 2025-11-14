import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { isPublicDomain, isAdminDomain, getPublicUrl, getAdminUrl } from '@/lib/domainConfig';

// Admin and Host routes (presencegroup.net only)
const ADMIN_ROUTES = [
  '/admin-dashboard',
  '/airtable-admin',
  '/integration-admin',
  '/system-status',
  '/refund-management',
  '/user-demographics',
  '/host-dashboard',
  '/host-verification',
  '/host-analytics',
  '/host-payout',
  '/host-profile',
  '/signup?type=host' // Host signup only on admin domain
];


export const DomainGuard = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const currentPath = location.pathname;
    const isAdminRoute = ADMIN_ROUTES.some(route => currentPath.startsWith(route));

    // If on public domain but trying to access admin route
    if (isPublicDomain() && isAdminRoute) {
      // Redirect to admin domain with same path
      window.location.href = `${getAdminUrl()}${currentPath}`;
      return;
    }

    // If on admin domain but trying to access non-admin route
    if (isAdminDomain() && !isAdminRoute) {
      // Redirect to public domain with same path
      window.location.href = `${getPublicUrl()}${currentPath}`;
      return;
    }
  }, [location.pathname, navigate]);

  return <>{children}</>;
};
