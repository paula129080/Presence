// Domain configuration for routing
export const DOMAINS = {
  PUBLIC: 'presencejoin.co',
  ADMIN: 'presencegroup.net',
  LOCALHOST: 'localhost'
} as const;

// Detect current domain
export const getCurrentDomain = (): string => {
  if (typeof window === 'undefined') return DOMAINS.LOCALHOST;
  return window.location.hostname;
};

// Check if current domain is public-facing
export const isPublicDomain = (): boolean => {
  const domain = getCurrentDomain();
  return domain.includes(DOMAINS.PUBLIC) || domain === DOMAINS.LOCALHOST;
};

// Check if current domain is admin
export const isAdminDomain = (): boolean => {
  const domain = getCurrentDomain();
  return domain.includes(DOMAINS.ADMIN);
};

// Get the appropriate redirect URL
export const getPublicUrl = (): string => {
  return `https://${DOMAINS.PUBLIC}`;
};

export const getAdminUrl = (): string => {
  return `https://${DOMAINS.ADMIN}`;
};
