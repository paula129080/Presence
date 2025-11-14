# Presence PWA User Flow Documentation
## Detailed Screen-by-Screen Guide

**Purpose:** Visual guide to all user journeys (in lieu of screenshots)  
**Date:** November 13, 2025

---

## 🧑 Member Journey: Complete Flow

### Screen 1: Home Page (`/`)
**What User Sees:**
- Hero section with "Connect with verified hosts"
- "Join as Member" and "Become a Host" buttons
- Features section
- How it works
- Footer with links

**User Action:** Clicks "Join as Member" → redirects to `/signup?type=member`

---

### Screen 2: Member Signup (`/signup?type=member`)
**What User Sees:**
- Tabs: [Member] [Host]
- Form fields:
  - Full Name
  - Email
  - Mobile Number
  - Country
  - Time Zone
  - Language Preference
  - Gender (optional)
  - Interests
  - About You (text area)
  - Referral Source
  - ☑ Community Pledge checkbox
  - ☑ Member Agreement checkbox
- Blue "Continue to Verification" button

**User Action:** Fills form → clicks Continue → advances to phone verification

---

### Screen 3: Phone Verification
**What User Sees:**
- "Verify your phone number" heading
- Phone number display (from signup)
- 6-digit code input boxes
- "Send Code" button
- "Verify" button
- Twilio SMS sent to phone

**User Action:** 
1. Clicks "Send Code"
2. Receives SMS with 6-digit code
3. Enters code
4. Clicks "Verify"
5. Record created in Airtable "Members" table
6. Redirects to `/member-preferences`

---

### Screen 4: Member Preferences (`/member-preferences`)
**What User Sees:**
- "Set Your Preferences" heading
- Age Group slider (18-25, 26-35, etc.)
- Category checkboxes:
  - Friendship & Connection
  - Emotional Support
  - Career & Mentorship
  - Health & Wellness
  - General Chat
- Personality tag badges (Calm, Outgoing, Empathetic, etc.)
- "Save Preferences" button

**User Action:** Selects preferences → clicks Save → redirects to `/host-selection`

---

### Screen 5: Host Selection (`/host-selection`)
**What User Sees:**
- "Select Your Host" heading
- Search bar with magnifying glass icon
- Filter dropdowns:
  - Age Group (All ages, 18-25, 26-35, etc.)
  - Category (All categories, Friendship, etc.)
- Personality tag filter badges
- Grid of host cards (3-4 columns):
  - Host photo (circular avatar)
  - Host name
  - Age group
  - Personality tags (badges)
  - Categories (badges)
  - "View Profile" button
- Only shows hosts with Status = "Active"

**User Action:** Clicks host card → redirects to `/host-profile/:hostId`

---

### Screen 6: Host Profile (`/host-profile/:hostId`)
**What User Sees:**
- Header with navigation
- Host profile card:
  - Large circular avatar (headshot)
  - Full-length photo below
  - Host name with green checkmark (if verified)
  - Age group
  - Bio text
  - Personality tags (badges)
  - Categories (badges)
  - Intro video player (if uploaded)
- Two large buttons:
  - [Message Host] (blue)
  - [Book Session] (outlined)
- Embedded Cal.com calendar (iframe, 600px height)
  - Shows host's available time slots
  - Member can select date/time
  - Click to book

**User Action:** 
1. Watches intro video
2. Scrolls to calendar
3. Selects available time slot
4. Cal.com modal opens
5. Enters booking details
6. Redirects to Stripe payment

---

### Screen 7: Stripe Payment
**What User Sees:**
- Stripe Checkout page
- Session details (host name, date, time)
- Price: $10 AUD
- Payment form (card details)
- "Pay Now" button

**User Action:** 
1. Enters card details
2. Clicks "Pay Now"
3. Stripe processes payment
4. Webhook fires → creates Presence Operation record
5. Redirects to `/member-dashboard`

---

### Screen 8: Member Dashboard (`/member-dashboard`)
**What User Sees:**
- "My Dashboard" heading
- Top right buttons:
  - [Edit Profile]
  - [Preferences]
  - [Book New Session] (blue)
- Tabs: [Upcoming] [Completed]
- Session cards showing:
  - Host name and photo
  - Date and time
  - Status badge (Created, Pending, Completed)
  - [Join Session] button (if upcoming)
- Holiday message banner (if Dec 20-26)
- Inactivity reminder banner (if 48+ hours)
- Like notification (if host liked member)

**User Action:** Clicks [Join Session] → redirects to `/video-session?bookingId=xxx&userType=member`

---

### Screen 9: Video Session (`/video-session`)
**What User Sees:**
- "Video Session with [Host Name]" heading
- Top right corner:
  - **Countdown timer: "10:00"** (blue background)
  - [Report] button
- Large video iframe (Daily.co embedded)
  - Shows both participants
  - Camera and mic controls
- **At 2:00 mark:**
  - Orange animated banner appears
  - "Session ending soon — rebook your host?"
- **At 0:00:**
  - Overlay: "Session Time Complete"
  - Video disabled
- Right sidebar:
  - Session prompts/conversation starters
  - "How are you feeling today?"
  - "What brought you here?"
- Bottom center:
  - Red [End Session] button

**User Action:** 
1. Chats with host for 10 minutes
2. Timer counts down: 10:00 → 9:59 → ... → 2:00 (warning) → 0:00
3. Session auto-ends
4. Rating modal appears

---

### Screen 10: Rating Modal
**What User Sees:**
- Modal overlay
- "Rate Your Session with [Host Name]"
- 5-star rating selector
- Text area: "Share your feedback (optional)"
- [Skip] button
- [Submit Rating] button

**User Action:** 
1. Selects stars (1-5)
2. Writes feedback (optional)
3. Clicks Submit
4. Modal closes
5. Returns to Member Dashboard

---

## 🧑‍💼 Host Journey: Complete Flow

### Screen 1: Host Signup (`/signup?type=host`)
**What User Sees:**
- Tabs: [Member] [Host]
- "Become a Host" heading
- Form sections:

**Basic Information Card:**
- Full Name
- Email
- Mobile Number

**About You Card:**
- Bio (500 char max with counter)
- Languages Spoken (badge selector)
- Time Zone (dropdown)
- Personality Tags (select up to 3, shows "2/3 selected")
- Availability (Hours per Week)

**Verification Media Card:**
- Profile Photo upload (dashed border box)
  - Shows checkmark when uploaded
- Full-Length Photo upload
  - Shows checkmark when uploaded
- Intro Video upload (10-30 seconds)
  - Shows checkmark when uploaded
  - **MANDATORY**

**Agreements:**
- **Blue highlighted box:**
  - ☑ **"I accept the Host Agreement and understand my responsibilities as a Presence host"**
  - **REQUIRED checkbox**
- White box:
  - ☑ "I agree to the Community Pledge..."

**Submit Button:**
- [Submit for Verification] (disabled until all required fields filled)

**User Action:** 
1. Fills all fields
2. Uploads headshot, full photo, intro video
3. Checks Host Agreement box (blue)
4. Checks Community Pledge box
5. Clicks Submit
6. Advances to phone verification
7. After verification: Record created with Status="Pending", Verification="Pending"
8. Redirects to `/host-dashboard`

---

### Screen 2: Host Dashboard (Pending State)
**What User Sees:**
- "Host Dashboard" heading
- Orange banner: "Your application is under review. We'll notify you within 24-48 hours."
- Stats cards (all showing 0):
  - Total Earnings: $0.00
  - Completed Sessions: 0
  - Upcoming: 0
- Empty state: "No sessions yet"
- Disabled calendar section

**User Action:** Waits for admin approval

---

### Screen 3: Admin Verification (`/host-verification`)
**Admin Sees:**
- "Host Verification" heading
- "Admin-only: Review and approve pending host applications"
- List of pending host cards:
  - Host name and email
  - "Pending" badge
  - Mobile, timezone, languages, hours/week
  - Bio text
  - Personality tags
  - Agreement badges:
    - "Pledge: Yes" (green)
    - **"Agreement: Yes"** (green) ← confirms Host Agreement accepted
  - [Approve] button (green)
  - [Reject] button (red)

**Admin Action:** 
1. Reviews application
2. Verifies Host Agreement = Yes
3. Clicks [Approve]
4. Host record updated: Status="Active", Verification="Approved"
5. Host receives notification

---

### Screen 4: Host Dashboard (Active State)
**What User Sees:**
- "Host Dashboard" heading
- [View Full Analytics] button (top right)
- Stats cards:
  - Total Earnings: $67.00 (or $75.00)
  - Completed Sessions: 5
  - Upcoming: 2
- "Your Sessions" card:
  - List of session cards
  - Member name, date, time
  - [Join Session] button
- **"Your Calendar" card:**
  - "Manage your availability on Cal.com"
  - **Embedded Cal.com iframe (600px height)**
  - Shows host's calendar
  - Host can update availability directly
- Right sidebar:
  - Host Promotion Hub
  - Referral link
  - Referral count

**User Action:** 
1. Views upcoming sessions
2. Updates calendar availability
3. Clicks [Join Session] when member books

---

### Screen 5: Host Video Session
**What Host Sees:**
- Same as Member video session
- Timer: "10:00" → countdown
- Video iframe with member
- 2-minute warning at 2:00
- Auto-end at 0:00
- Post-session message
- Rating modal (rates member)

---

## 🔒 Privacy Verification

### What Members CANNOT See:
- ❌ Other member profiles
- ❌ Member Registry table
- ❌ Member browsing page
- ❌ Other members' sessions
- ❌ Host personal data (only public profile)

### What Hosts CANNOT See:
- ❌ Other host profiles
- ❌ Host Registry table
- ❌ Host browsing page
- ❌ Member profiles (except booked members)
- ❌ Other hosts' earnings

### What Members CAN See:
- ✅ Active, verified host profiles only
- ✅ Host public info: name, photo, video, bio, tags
- ✅ Host calendar (for booking)
- ✅ Their own sessions only

### What Hosts CAN See:
- ✅ Their own dashboard
- ✅ Their own sessions
- ✅ Their own earnings
- ✅ Booked member names (for confirmed sessions)
- ✅ Their own calendar

---

## 💬 Automated Messaging Examples

### Pre-Session Message (15 min before)
**Appears as:** Blue banner at top of dashboard
**Message:** "Your session with [Host Name] starts in 15 minutes. Click 'Join Session' when ready."
**Dismissible:** Yes

### Post-Session Message
**Appears as:** Toast notification
**Message:** "Thanks for your chat with [Host Name]! You can rebook anytime from your dashboard."
**Duration:** 5 seconds

### Like Received
**Appears as:** Pink banner with heart icon
**Message:** "[Host Name] enjoyed your session and would love to chat again!"
**Action button:** [Rebook Now]

### Mutual Like
**Appears as:** Pink banner with filled heart
**Message:** "It's a match! You and [Host Name] both want to reconnect. Book your next session."
**Action button:** [Book Again]

### Holiday Message (Dec 20-26)
**Appears as:** Green banner
**Message:** "Happy Holidays from Presence! We're here for you throughout the season."
**Dismissible:** Yes

### Inactivity Reminder (48+ hours)
**Appears as:** Blue banner
**Message:** "We miss you! Book a session with your favorite host or discover someone new."
**Action button:** [Browse Hosts]

---

## 🎯 Key Implementation Files

| Screen | File Path | Key Features |
|--------|-----------|--------------|
| Home | `src/pages/Home.tsx` | Hero, CTA buttons |
| Signup | `src/pages/Signup.tsx` | Member/Host tabs, phone verification |
| Host Form | `src/components/HostOnboardingForm.tsx` | Host Agreement checkbox (blue) |
| Host Selection | `src/pages/HostSelection.tsx` | Filters, search, host cards |
| Host Profile | `src/pages/HostProfile.tsx` | Cal.com embed, booking |
| Member Dashboard | `src/pages/MemberDashboard.tsx` | Sessions, notifications |
| Host Dashboard | `src/pages/HostDashboard.tsx` | Calendar embed, earnings |
| Video Session | `src/pages/VideoSession.tsx` | Timer, 2-min warning, auto-end |
| Admin Verification | `src/pages/HostVerification.tsx` | Approve/reject hosts |
| Messaging | `src/components/AutomatedMessaging.tsx` | Template loading, triggers |

---

## ✅ Verification Checklist

- [x] Host Agreement checkbox visible and highlighted (blue)
- [x] Host Agreement stored in Airtable as TRUE
- [x] Cal.com calendar embedded in Host Profile
- [x] Cal.com calendar embedded in Host Dashboard
- [x] 10-minute countdown timer visible to both users
- [x] Timer color changes (blue → red at 1 min)
- [x] 2-minute warning banner appears
- [x] Session auto-ends at 0:00
- [x] Pre-session messages trigger
- [x] Post-session messages trigger
- [x] Like notifications appear
- [x] Members can only see hosts
- [x] Hosts can only see their dashboard
- [x] No member browsing exists
- [x] All interactions are Host ↔ Member pairs

**Status:** ALL VERIFIED ✅
