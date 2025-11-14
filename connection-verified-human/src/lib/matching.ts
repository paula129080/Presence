import { HostRecord, MemberRecord } from './airtable';

export interface MatchScore {
  hostId: string;
  score: number;
  matchReasons: string[];
}

/**
 * Enhanced Personality Matching Algorithm (v1.2)
 * Matches members with hosts based on personality tags, languages, age group, and categories
 */
export const calculateMatchScore = (
  host: HostRecord,
  memberPreferences: {
    personalityTags?: string[];
    languages?: string[];
    timezone?: string;
    memberAgeGroup?: string;
    preferredHostAgeGroups?: string[];
    preferredCategories?: string[];
  }
): MatchScore => {
  let score = 0;
  const matchReasons: string[] = [];

  // Personality tag matching (35 points)
  const hostTags = host.fields['Personality Tags'] || [];
  const preferredTags = memberPreferences.personalityTags || [];
  
  const tagMatches = hostTags.filter(tag => preferredTags.includes(tag));
  if (tagMatches.length > 0) {
    const tagScore = (tagMatches.length / Math.max(preferredTags.length, 1)) * 35;
    score += tagScore;
    matchReasons.push(`Matches ${tagMatches.length} personality trait${tagMatches.length > 1 ? 's' : ''}: ${tagMatches.join(', ')}`);
  }

  // Language matching (20 points)
  const hostLanguages = host.fields['Languages Spoken'] || [];
  const preferredLanguages = memberPreferences.languages || [];
  
  const languageMatches = hostLanguages.filter(lang => preferredLanguages.includes(lang));
  if (languageMatches.length > 0) {
    score += 20;
    matchReasons.push(`Speaks ${languageMatches.join(', ')}`);
  }

  // Age group matching (25 points)
  const hostAgeGroup = host.fields['Host Age Group'];
  const preferredAgeGroups = memberPreferences.preferredHostAgeGroups || [];
  
  if (hostAgeGroup && preferredAgeGroups.includes(hostAgeGroup)) {
    score += 25;
    matchReasons.push(`Age group: ${hostAgeGroup}`);
  }

  // Category matching (20 points)
  const hostCategories = host.fields['Host Category'] || [];
  const preferredCategories = memberPreferences.preferredCategories || [];
  
  const categoryMatches = hostCategories.filter(cat => preferredCategories.includes(cat));
  if (categoryMatches.length > 0) {
    const categoryScore = (categoryMatches.length / Math.max(preferredCategories.length, 1)) * 20;
    score += categoryScore;
    matchReasons.push(`Specializes in: ${categoryMatches.join(', ')}`);
  }

  // Timezone compatibility (10 points)
  if (memberPreferences.timezone && host.fields['Country / Time Zone']?.includes(memberPreferences.timezone)) {
    score += 10;
    matchReasons.push('Compatible timezone');
  }

  // Bonus: High rebook rate (10 points)
  if ((host.fields['Rebook Rate (%)'] || 0) > 70) {
    score += 10;
    matchReasons.push('High rebook rate');
  }

  return {
    hostId: host.id,
    score: Math.round(score),
    matchReasons
  };
};

/**
 * Get recommended hosts for a member based on preferences
 */
export const getRecommendedHosts = (
  hosts: HostRecord[],
  memberPreferences: {
    personalityTags?: string[];
    languages?: string[];
    timezone?: string;
    memberAgeGroup?: string;
    preferredHostAgeGroups?: string[];
    preferredCategories?: string[];
  },
  limit: number = 5
): MatchScore[] => {
  const activeHosts = hosts.filter(h => h.fields['Status'] === 'Active' && h.fields['Verification Status'] === 'Verified');
  
  const scores = activeHosts.map(host => calculateMatchScore(host, memberPreferences));
  
  return scores
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
};
