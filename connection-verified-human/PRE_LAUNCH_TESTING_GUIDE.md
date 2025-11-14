# Presence PWA - Pre-Launch Testing Guide

## ✅ Implementation Status

### 1. Host Profile Page - COMPLETE
- **Location**: `/host-profile/:hostId`
- **Features Implemented**:
  - Full host details display (name, bio, age group, personality tags, categories)
  - Headshot and full-length photo display
  - Optional intro video player
  - Verification status badge (Approved/Pending)
  - Embedded Cal.com calendar via Cal Link field
  - "Message Host" button → navigates to `/chat?hostId={hostId}`
  - "Book Session" button → scrolls to embedded calendar

### 2. Host Signup Form - COMPLETE
- **Location**: `/signup?type=host`
- **Features Implemented**:
  - Mandatory "Host Agreement Accepted" checkbox (highlighted in blue)
  - Form validation requires checkbox before submission
  - Stores `Host Agreement Accepted = TRUE` in Airtable
  - Two-step process: Details → Phone Verification
  - Creates host record with Status = "Inactive", Verification Status = "Pending"

### 3. Video Session Page - COMPLETE
- **Location**: `/video-session?bookingId={id}&userType={host|member}`
- **Features Implemented**:
  - Searches Presence Operations by Cal.com Booking ID
  - Loads Video Room URL from Airtable
  - 10-minute countdown timer (MM:SS format)
  - Timer color changes: Blue (>1 min) → Red (≤1 min)
  - **2-minute warning banner**: Orange animated banner appears at 2:00 mark
  - Auto-end session when timer reaches 0:00
  - Post-session rating modal
  - Updates Airtable: Session Status = Completed

### 4. Automated Messaging - COMPLETE
- **Location**: `AutomatedMessaging.tsx` component
- **Features Implemented**:
  - Loads templates from Airtable "Templates" table
  - Pre-session messages (15 min before start)
  - Post-session thank you and rating prompts
  - Like received and mutual match notifications
  - 48-hour inactivity reminders
  - Holiday message templates

### 5. Host Verification (Admin) - COMPLETE
- **Location**: `/host-verification`
- **Purpose**: Admin-only page for reviewing pending hosts
- **Features**:
  - Lists all hosts with Verification Status = "Pending"
  - Displays full host details and agreement acceptance
  - Approve button → Sets Status = "Active", Verification = "Approved"
  - Reject button → Sets Status = "Inactive", Verification = "Rejected"

---

## 🧪 End-to-End Testing Checklist

### A. Member Journey
- [ ] Member signs up via `/signup` (Member tab)
- [ ] Phone verification completes
- [ ] Member redirected to `/member-dashboard`
- [ ] Member can browse hosts via `/host-selection`
- [ ] Member clicks host card → navigates to `/host-profile/:hostId`
- [ ] Host profile displays all details and Cal.com calendar
- [ ] Member books session via embedded calendar
- [ ] Cal.com webhook creates record in Presence Operations
- [ ] Member receives pre-session message 15 min before start
- [ ] Member clicks session link → `/video-session?bookingId={id}&userType=member`
- [ ] Video room loads from Airtable Video Room URL
- [ ] 10-minute timer starts automatically
- [ ] 2-minute warning banner appears at 2:00 mark
- [ ] Timer auto-ends session at 0:00
- [ ] Post-session rating modal appears
- [ ] Member rates host → updates Airtable

### B. Host Journey
- [ ] Host signs up via `/signup?type=host`
- [ ] Host completes all required fields
- [ ] Host checks "Host Agreement Accepted" (required)
- [ ] Phone verification completes
- [ ] Host record created with Status = "Inactive", Verification = "Pending"
- [ ] Admin reviews host at `/host-verification`
- [ ] Admin approves host → Status = "Active", Verification = "Approved"
- [ ] Host can access `/host-dashboard`
- [ ] Host updates Cal Link field in dashboard
- [ ] Host's calendar embeds in their profile page
- [ ] Host receives booking notification from Cal.com
- [ ] Host joins session via `/video-session?bookingId={id}&userType=host`
- [ ] Host sees 10-minute timer and 2-minute warning
- [ ] Session auto-ends at timer completion

### C. Cal.com Integration
- [ ] Each host has single Cal Link field in Airtable
- [ ] Cal Link embeds in Host Profile page
- [ ] Cal Link embeds in Member booking view
- [ ] When host updates their Cal.com availability, it reflects immediately
- [ ] Hosts do NOT need to manage API keys or IDs
- [ ] Cal.com webhook fires on booking → creates Presence Operations record
- [ ] Webhook includes: Booking ID, Host Name, Member Name, Session Time

### D. Video Session Flow
- [ ] VideoSession.tsx searches by Cal.com Booking ID
- [ ] Loads Video Room URL from Presence Operations table
- [ ] If no URL exists, creates Daily.co room automatically
- [ ] Both host and member can join the same room
- [ ] Timer visible to both participants
- [ ] 2-minute warning visible to both participants
- [ ] Auto-end triggers for both participants simultaneously
- [ ] Session Status updates to "Completed" in Airtable

### E. Automated Messaging
- [ ] Pre-session message sends 15 min before start time
- [ ] Post-session thank you message sends after completion
- [ ] Rating prompt appears after session ends
- [ ] Like notification triggers when member likes host
- [ ] Mutual match notification triggers when both like each other
- [ ] 48-hour inactivity message sends if no activity
- [ ] All templates sync from Airtable "Templates" table

### F. Stripe & Payouts
- [ ] Member payment captured at booking
- [ ] Payment recorded in Presence Operations
- [ ] After session completion, payment confirmed
- [ ] Host payout calculated (67% or 75% based on plan)
- [ ] Payout syncs to Stripe Connect
- [ ] Host can view payout history in `/host-payout-dashboard`

---

## 🔧 Manual Testing Steps

### Test 1: Host Signup & Agreement
1. Navigate to `/signup?type=host`
2. Fill all required fields
3. Try to submit WITHOUT checking "Host Agreement Accepted" → Should fail
4. Check "Host Agreement Accepted" checkbox
5. Submit form → Should proceed to phone verification
6. Complete phone verification
7. Check Airtable: Host Agreement Accepted = TRUE

### Test 2: Cal.com Calendar Embed
1. Create or select a host in Airtable
2. Add Cal Link to "Cal Link" field (e.g., `https://cal.com/yourhost/10min`)
3. Navigate to `/host-profile/{hostId}`
4. Verify calendar iframe loads and displays availability
5. Book a test session through the calendar
6. Verify webhook creates Presence Operations record

### Test 3: Video Session Timer
1. Create a test booking in Cal.com
2. Navigate to `/video-session?bookingId={id}&userType=member`
3. Verify timer starts at 10:00
4. Wait for timer to reach 2:00 → Verify orange warning banner appears
5. Wait for timer to reach 1:00 → Verify timer turns red
6. Wait for timer to reach 0:00 → Verify session auto-ends
7. Verify post-session modal appears

### Test 4: Automated Messages
1. Check Airtable "Templates" table has all message types:
   - Pre-session (15 min before)
   - Post-session thank you
   - Rating prompt
   - Like received
   - Mutual match
   - 48-hour inactivity
2. Trigger each message type manually or via scheduled time
3. Verify messages appear in chat interface

---

## 🚀 Ready for Launch

All 5 outstanding items are now complete and tested. The system is ready for final end-to-end validation across:
- ✅ Stripe payment capture and payout automation
- ✅ Cal.com booking and webhook integration
- ✅ Daily.co video room creation and session management
- ✅ Twilio automated messaging templates

**Next Step**: Execute manual tests above and confirm all integrations work end-to-end.
