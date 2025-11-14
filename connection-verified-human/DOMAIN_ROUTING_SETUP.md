# Domain Routing Configuration

## Overview
The application now supports domain-based routing to separate public-facing features from internal admin tools.

## Domain Configuration

### presencejoin.co (Public Domain)
**Purpose:** User and host-facing application

**Accessible Routes:**
- Landing page and marketing pages
- Member signup, login, onboarding
- Host signup, login, verification
- Session booking and video calls
- Member and host dashboards
- Chat and communication
- PWA installation
- All informational pages

**Blocked Routes:**
- `/admin-dashboard`
- `/airtable-admin`
- `/integration-admin`
- `/system-status`
- `/refund-management`
- `/user-demographics`

### presencegroup.net (Admin Domain)
**Purpose:** Internal team administration

**Accessible Routes:**
- `/admin-dashboard` - Main admin interface
- `/airtable-admin` - Airtable sync management
- `/integration-admin` - Integration tools
- `/system-status` - System monitoring
- `/refund-management` - Refund processing
- `/user-demographics` - Analytics

**Blocked Routes:**
- All public-facing routes redirect to presencejoin.co

## Implementation Details

### Files Modified
1. `src/lib/domainConfig.ts` - Domain detection utilities
2. `src/components/DomainGuard.tsx` - Route protection component
3. `src/App.tsx` - Integrated DomainGuard into routing

### How It Works
1. **Domain Detection:** On page load, the app detects the current domain
2. **Route Validation:** DomainGuard checks if the current route is allowed on the domain
3. **Automatic Redirect:** If route is not allowed, user is redirected to the correct domain

### Localhost Behavior
- On localhost, all routes are accessible for development
- No redirects occur during local development

## Deployment Requirements

### DNS Configuration
Both domains must point to the same deployment:
- `presencejoin.co` → Your deployment URL
- `presencegroup.net` → Same deployment URL

### No Additional Configuration Needed
The routing logic is handled entirely in the React application. No server-side configuration is required.

## Testing

### Test Public Domain
1. Visit `https://presencejoin.co`
2. Navigate to any public route (should work)
3. Try accessing `/admin-dashboard` (should redirect to presencegroup.net)

### Test Admin Domain
1. Visit `https://presencegroup.net/admin-dashboard`
2. Admin dashboard should load
3. Try accessing `/plans` (should redirect to presencejoin.co)

## Security Notes
- Admin routes are protected at the routing level
- Additional authentication should be implemented for admin pages
- Consider adding IP whitelisting for admin domain at infrastructure level
