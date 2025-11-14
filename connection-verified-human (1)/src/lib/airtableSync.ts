import { airtableService, MemberRecord, HostRecord, PresenceOperation } from './airtable';

export interface SyncResult {
  success: boolean;
  recordsUpdated: number;
  error?: string;
}

// Enhanced Airtable sync service with caching and batch operations
class AirtableSyncService {
  private cache: Map<string, { data: any; timestamp: number }> = new Map();
  private CACHE_TTL = 5 * 60 * 1000; // 5 minutes

  // Get cached data or fetch fresh
  async getCached<T>(key: string, fetcher: () => Promise<T>): Promise<T> {
    const cached = this.cache.get(key);
    if (cached && Date.now() - cached.timestamp < this.CACHE_TTL) {
      return cached.data as T;
    }
    
    const data = await fetcher();
    this.cache.set(key, { data, timestamp: Date.now() });
    return data;
  }

  // Clear cache for specific key or all
  clearCache(key?: string) {
    if (key) {
      this.cache.delete(key);
    } else {
      this.cache.clear();
    }
  }

  // Sync member profile from Airtable
  async syncMemberProfile(memberId: string): Promise<MemberRecord | null> {
    const response = await airtableService.getRecord('Members', memberId);
    if (response.records && response.records[0]) {
      return response.records[0] as MemberRecord;
    }
    return null;
  }

  // Sync all active hosts
  async syncActiveHosts(): Promise<HostRecord[]> {
    return this.getCached('active-hosts', async () => {
      const response = await airtableService.listRecords('Hosts', undefined, "{Status}='Active'");
      return (response.records || []) as HostRecord[];
    });
  }

  // Sync member sessions
  async syncMemberSessions(memberEmail: string): Promise<PresenceOperation[]> {
    const formula = `{Member Name}='${memberEmail}'`;
    const response = await airtableService.listRecords('Presence Operations', undefined, formula);
    return (response.records || []) as PresenceOperation[];
  }

  // Batch update multiple records
  async batchUpdate(table: string, updates: Array<{ id: string; fields: Record<string, any> }>): Promise<SyncResult> {
    let updated = 0;
    for (const update of updates) {
      const response = await airtableService.updateRecord(table, update.id, update.fields);
      if (!response.error) updated++;
    }
    return { success: true, recordsUpdated: updated };
  }

  // Real-time sync trigger (called after user actions)
  async triggerSync(table: string, recordId: string) {
    this.clearCache(`${table}-${recordId}`);
    return await airtableService.getRecord(table, recordId);
  }
}

export const syncService = new AirtableSyncService();
