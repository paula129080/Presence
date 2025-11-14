import { supabase } from './supabase';

export interface AirtableRecord {
  id: string;
  fields: Record<string, any>;
  createdTime: string;
}

export interface AirtableResponse {
  records?: AirtableRecord[];
  error?: string;
}

// Presence Operations table schema (updated 2025-11-12 with session handling & Stripe metadata)
export interface PresenceOperation {
  id: string;
  fields: {
    // Status fields
    'Booking Status'?: 'Pending' | 'Created' | 'Cancelled' | 'Completed';
    'Payment Status'?: 'Pending' | 'Processing' | 'Completed' | 'Failed' | 'Refunded';
    'Notification Status'?: string;
    
    // Basic info
    'Host Name'?: string;
    'Member Name'?: string;
    'Session Date'?: string;
    'Session Time'?: string;
    'Plan Type'?: 'Adhoc' | 'Weekly';
    'Amount'?: number;
    'Amount (AUD)'?: number;
    
    // Stripe integration fields
    'Transaction ID'?: string;
    'Linked Member'?: string[]; // Array of Airtable record IDs
    'Linked Host'?: string[]; // Array of Airtable record IDs
    'Payout Date'?: string;
    'Presence Share (AUD)'?: number;
    'Host Share (AUD)'?: number;
    
    // Cal.com integration fields
    'Cal.com Booking ID'?: string;
    'Cal.com URL'?: string;
    'Session Start Time'?: string;
    'Session Duration (mins)'?: number;
    
    // Video session fields
    'Video Room URL'?: string;
    'Video Room Status'?: 'Not Created' | 'Active' | 'Ended';
    'Session Type'?: 'Video' | 'Phone' | 'In-Person';
    'Host Joined'?: boolean;
    'Member Joined'?: boolean;
    
    [key: string]: any; // Allow additional fields
  };
  createdTime: string;
}

// Member Registry schema (v1.2 - updated 2025-11-13 with Age Group & Category Preferences)
export interface MemberRecord {
  id: string;
  fields: {
    'Member ID'?: number; // Auto number
    'Full Name': string;
    'Email': string;
    'Mobile Number': string;
    'Profile Photo / AI Image'?: any[]; // Attachment field
    'About You'?: string; // Long text, 500 char limit
    'Verification Status'?: 'Pending' | 'Verified' | 'Failed';
    'Member Agreement Accepted'?: boolean;
    'Member Type'?: 'Host' | 'Member';
    'Country'?: string;
    'Time Zone'?: string;
    'Language Preference'?: string;
    'Gender (Optional)'?: 'Male' | 'Female' | 'Non-binary' | 'Prefer not to say';
    'Interests'?: string[]; // Multi-select
    'Community Pledge Signed'?: boolean;
    'Join Date'?: string; // Created Time
    'Status'?: 'Active' | 'Inactive' | 'Suspended';
    'Stripe Customer ID'?: string;
    'Last Active'?: string; // Last Modified Time
    'Referral Source'?: string;
    'Notes'?: string;
    // New matching fields (v1.2)
    'Member Age Group'?: string; // Single select: 18-25, 26-35, 36-45, 46-55, 56-65, 65+
    'Preferred Host Age Group'?: string[]; // Multi-select
    'Preferred Categories'?: string[]; // Multi-select: Friendship & Connection, Emotional Support, Career & Mentorship, Health & Wellness, General Chat
    'Personality Tags'?: string[]; // Multi-select for member's own personality
    [key: string]: any;
  };
  createdTime: string;
}


// Host Registry schema (v1.4 - updated 2025-11-13 with Cal Link)
export interface HostRecord {
  id: string;
  fields: {
    'Host ID'?: number; // Auto number
    'Full Name': string;
    'Email': string;
    'Mobile Number': string;
    'Profile Photo'?: any[]; // Attachment field
    'Full-Length Photo'?: any[]; // Attachment field
    'Intro Video'?: any[] | string; // Attachment or URL
    'About You (Host Bio)'?: string; // Long text, 500 char limit
    'Languages Spoken'?: string[]; // Multi-select
    'Country / Time Zone'?: string;
    'Verification Status'?: 'Pending' | 'Verified' | 'Failed';
    'Community Pledge Signed'?: boolean;
    'Personality Tags'?: string[]; // Multi-select: Calm, Outgoing, Empathetic, Analytical, Funny, Motivator, Listener
    'Stripe Connect ID'?: string;
    'Stripe Payout Status'?: 'Active' | 'Pending' | 'Suspended';
    'Availability (Hours per Week)'?: number;
    'Rebook Rate (%)'?: number; // Formula field
    'Host Rating (Paused)'?: number;
    'Presence Share (AUD)'?: number; // Formula field
    'Host Share (AUD)'?: number; // Formula field
    'Status'?: 'Active' | 'Inactive' | 'Suspended';
    'Join Date'?: string; // Created Time
    'Last Active'?: string; // Last Modified Time
    'Notes'?: string;
    // New matching fields (v1.3)
    'Host Age Group'?: string; // Single select: 18-25, 26-35, 36-45, 46-55, 56-65, 65+
    'Host Category'?: string[]; // Multi-select: Friendship & Connection, Emotional Support, Career & Mentorship, Health & Wellness, General Chat
    // Cal.com integration (v1.4)
    'Cal Link'?: string; // URL field: https://cal.com/presence/{host-username}
    [key: string]: any;
  };
  createdTime: string;
}



// Refunds table schema (v1.0 - added 2025-11-13)
export interface RefundRecord {
  id: string;
  fields: {
    'Transaction ID'?: string;
    'Member (Linked)'?: string[]; // Array of Airtable record IDs
    'Host (Linked)'?: string[]; // Array of Airtable record IDs
    'Plan Type'?: 'Adhoc' | 'Weekly';
    'Refund Amount (AUD)'?: number;
    'Refund Reason'?: string; // Long text
    'Refund Date'?: string;
    'Refund Status'?: 'Pending' | 'Processed' | 'Failed';
    'Presence Share Adjusted (AUD)'?: number; // Formula field
    'Host Share Adjusted (AUD)'?: number; // Formula field
    'Admin Notes'?: string; // Long text
    [key: string]: any;
  };
  createdTime: string;
}


// Likes table schema (v1.0 - added 2025-11-13)
export interface LikeRecord {
  id: string;
  fields: {
    'Host ID'?: string; // Linked to Hosts table
    'Host Name'?: string; // Lookup from Hosts
    'Member ID'?: string; // Linked to Members table
    'Member Name'?: string; // Lookup from Members
    'Is Mutual'?: boolean; // Checkbox - true if member also liked host
    'Created Time'?: string; // Auto timestamp
    'Status'?: 'Active' | 'Dismissed';
    [key: string]: any;
  };
  createdTime: string;
}




// Helper to check if booking is active
export const isActiveBooking = (operation: PresenceOperation): boolean => {
  const status = operation.fields['Booking Status'];
  return status === 'Pending' || status === 'Created';
};

// Helper to check if payment is complete
export const isPaymentComplete = (operation: PresenceOperation): boolean => {
  return operation.fields['Payment Status'] === 'Completed';
};

// Helper to check if session is ready to join
export const isSessionReady = (operation: PresenceOperation): boolean => {
  return !!(
    operation.fields['Video Room URL'] && 
    operation.fields['Video Room Status'] === 'Active' &&
    operation.fields['Booking Status'] === 'Created'
  );
};

// Helper to check if user can join session
export const canJoinSession = (operation: PresenceOperation, userType: 'host' | 'member'): boolean => {
  if (!isSessionReady(operation)) return false;
  
  if (userType === 'host') {
    return !operation.fields['Host Joined'];
  } else {
    return !operation.fields['Member Joined'];
  }
};




export const airtableService = {
  async listRecords(table: string, viewName?: string, filterFormula?: string): Promise<AirtableResponse> {
    try {
      const { data, error } = await supabase.functions.invoke('airtable-sync', {
        body: { action: 'list', table, view: viewName, filterByFormula: filterFormula }
      });
      
      if (error) return { error: error.message || 'Failed to fetch records' };
      return data || { records: [] };
    } catch (err) {
      return { error: 'Network error: Unable to connect to service' };
    }
  },



  async getRecord(table: string, recordId: string): Promise<AirtableResponse> {
    try {
      const { data, error } = await supabase.functions.invoke('airtable-sync', {
        body: { action: 'get', table, recordId }
      });
      
      if (error) return { error: error.message || 'Failed to fetch record' };
      return data || { records: [] };
    } catch (err) {
      return { error: 'Network error: Unable to connect to service' };
    }
  },

  async createRecord(table: string, fields: Record<string, any>): Promise<AirtableResponse> {
    try {
      const { data, error } = await supabase.functions.invoke('airtable-sync', {
        body: { action: 'create', table, data: fields }
      });
      
      if (error) return { error: error.message || 'Failed to create record' };
      return data || { records: [] };
    } catch (err) {
      return { error: 'Network error: Unable to connect to service' };
    }
  },

  async updateRecord(table: string, recordId: string, fields: Record<string, any>): Promise<AirtableResponse> {
    try {
      const { data, error } = await supabase.functions.invoke('airtable-sync', {
        body: { action: 'update', table, recordId, data: fields }
      });
      
      if (error) return { error: error.message || 'Failed to update record' };
      return data || { records: [] };
    } catch (err) {
      return { error: 'Network error: Unable to connect to service' };
    }
  },

  async deleteRecord(table: string, recordId: string): Promise<AirtableResponse> {
    try {
      const { data, error } = await supabase.functions.invoke('airtable-sync', {
        body: { action: 'delete', table, recordId }
      });
      
      if (error) return { error: error.message || 'Failed to delete record' };
      return data || { records: [] };
    } catch (err) {
      return { error: 'Network error: Unable to connect to service' };
    }
  }
};
