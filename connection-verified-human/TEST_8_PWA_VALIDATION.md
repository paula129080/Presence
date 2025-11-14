# Test 8: PWA Interaction Flow Validation

## Overview
Complete end-to-end validation of Presence PWA user experience and data flow.

---

## 🧪 Test 8.1: Member Onboarding

### Components
- `src/pages/Signup.tsx` - Multi-step signup flow
- `src/components/MemberOnboardingForm.tsx` - Registration form
- `src/components/PhoneVerification.tsx` - Twilio verification

### Test Steps
1. Navigate to `/signup`
2. Select "Member" tab
3. Fill in member details:
   - Full Name
   - Email
   - Password
   - Date of Birth
   - Gender
   - Location
   - About You (bio)
   - Interests (checkboxes)
   - Photo upload (optional)
4. Click "Continue to Verification"
5. Enter phone number
6. Receive SMS verification code via Twilio
7. Enter code and verify

### Expected Results
✅ Form validates all required fields  
✅ Password shows strength indicator  
✅ Photo upload preview displays  
✅ SMS code sent via Twilio Verify  
✅ Member record created in Airtable "Member Registry"  
✅ Record includes: Member ID, Full Name, Email, Phone, DOB, Gender, Location, About You, Interests, Photo URL  
✅ Redirect to `/member-preferences` after verification

### Airtable Verification
Check "Member Registry" table for new record with all fields populated.

---

## 🧪 Test 8.2: Host Onboarding

### Components
- `src/pages/HostVerification.tsx` - Host application
- `src/components/HostOnboardingForm.tsx` - Host registration form

### Test Steps
1. Navigate to `/host-verification`
2. Fill in host details:
   - Full Name
   - Email
   - Phone
   - Bio (200+ chars)
   - Personality Tags (select multiple)
   - Timezone
   - Availability
   - Video Introduction URL (YouTube/Vimeo)
3. Submit application

### Expected Results
✅ Form validates bio length (200+ chars)  
✅ Personality tags allow multiple selections  
✅ Video URL validates format  
✅ Host record created in Airtable "Host Registry"  
✅ Record includes: Host ID, Full Name, Email, Phone, Bio, Personality Tags, Timezone, Availability, Video URL  
✅ Verification Status = "Pending"  
✅ Success toast notification displayed

### Airtable Verification
Check "Host Registry" table for new record with Verification Status = "Pending".

---

## 🧪 Test 8.3: Booking Flow

### Components
- `src/pages/HostSelection.tsx` - Host browsing
- `src/components/HostCard.tsx` - Individual host cards
- `src/components/BookingCalendar.tsx` - Scheduling
- Stripe integration via `stripe-checkout` edge function
- Cal.com integration via `calcom-create-booking` edge function

### Test Steps
1. Login as member → Navigate to `/host-selection`
2. Browse available hosts (cards display photo, bio, personality tags)
3. Click "Book Session" on a host card
4. Select date and time in calendar
5. Choose plan (Adhoc $50 or Weekly $40)
6. Click "Proceed to Payment"
7. Complete Stripe checkout (test mode)
8. Confirm payment success

### Expected Results
✅ Host cards display all host information  
✅ Calendar shows available time slots  
✅ Plan selection updates price display  
✅ Stripe checkout opens in test mode  
✅ Payment success triggers webhook  
✅ Record created in "Presence Operations" table  
✅ Cal.com booking created automatically  
✅ Daily.co video room URL generated  
✅ Member receives booking confirmation (check SMS if Twilio configured)  
✅ Booking appears in Member Dashboard "Upcoming" tab

### Airtable Verification
Check "Presence Operations" for new record with:
- Transaction ID (Stripe payment_intent_id)
- Host ID, Member ID
- Plan Type (Adhoc/Weekly)
- Amount ($50/$40)
- Payment Status = "Succeeded"
- Booking Status = "Created"
- Video Room URL (Daily.co link)
- Cal.com Booking ID

---

## 🧪 Test 8.4: Session Experience

### Components
- `src/pages/VideoSession.tsx` - Video call interface
- `src/components/SessionPrompts.tsx` - Pre/post prompts
- `src/components/RatingModal.tsx` - Post-session rating

### Test Steps
1. From Member Dashboard, click "Join Session" on upcoming booking
2. View pre-session prompt (from Airtable Templates)
3. Click "Start Session"
4. Video room loads (Daily.co iframe)
5. Conduct test session
6. Click "End Session"
7. View post-session reflection prompt
8. Complete reflection
9. Rate host (1-5 stars)
10. Submit rating

### Expected Results
✅ Pre-session prompt displays from Airtable Templates (Type = "PWA Popup", Trigger = "Session Start")  
✅ Daily.co video room loads in iframe  
✅ "Member Joined" updates to true in Airtable  
✅ Post-session prompt displays from Templates (Trigger = "Session Complete")  
✅ Rating modal appears after reflection  
✅ Rating saves to Airtable  
✅ Session status updates to "Completed"  
✅ `stripe-payment-confirm` edge function triggered  
✅ Host payout calculated (67% Adhoc / 75% Weekly)  
✅ Redirect to Member Dashboard

### Airtable Verification
Check "Presence Operations" record:
- Video Room Status = "Ended"
- Booking Status = "Completed"
- Member Rating = [1-5]
- Host Share = $33.50 (Adhoc) or $30 (Weekly)

---

## 🧪 Test 8.5: Messaging Layer

### Components
- `src/components/LikeNotification.tsx` - Like notifications
- `src/components/NotificationBanner.tsx` - System messages

### Test Steps

#### A. Host Liked Member
1. Manually create record in Airtable "Likes" table:
   - Host ID = [test host]
   - Member ID = [test member]
   - Status = "Host Liked"
2. Refresh Member Dashboard
3. Banner should appear: "Host [Name] liked you!"

#### B. Mutual Like
1. Update "Likes" record:
   - Status = "Mutual"
2. Refresh Member Dashboard
3. Banner should appear: "It's a match! You and [Host Name] both liked each other."

#### C. Holiday Message (Dec 20-26 only)
1. Set system date to Dec 23
2. Add Template to Airtable:
   - Template Name = "Holiday Message"
   - Type = "PWA Banner"
   - Message Body = "Happy Holidays from Presence! 🎄"
3. Refresh Member Dashboard
4. Holiday banner displays

#### D. 48h Inactivity Reminder
1. Set localStorage lastActive to 3 days ago
2. Add Template to Airtable:
   - Template Name = "Inactive 48h Reminder"
   - Type = "PWA Banner"
   - Message Body = "We miss you! Book your next session."
3. Refresh Member Dashboard
4. Inactivity banner displays

### Expected Results
✅ LikeNotification fetches from Airtable "Likes" table  
✅ Host name placeholder {{host_name}} replaced correctly  
✅ Banners dismissible (X button)  
✅ NotificationBanner pulls from "Templates" table  
✅ Holiday message only shows Dec 20-26  
✅ Inactivity check uses localStorage lastActive  
✅ All messages styled correctly (success/info variants)

---

## 🧪 Test 8.6: UX Consistency Check

### Navigation Flow
1. **Member Journey**:
   - Signup → Preferences → Host Selection → Booking → Payment → Dashboard → Video Session → Rating → Dashboard
2. **Host Journey**:
   - Application → Verification Pending → Dashboard → View Bookings → Join Session → Complete Session

### Components to Test
- `src/components/Header.tsx` - Navigation bar
- `src/components/Footer.tsx` - Footer links
- `src/pages/MemberDashboard.tsx` - Member view
- `src/pages/HostDashboard.tsx` - Host view

### Test Steps
1. Navigate between all pages using header links
2. Test "Book New Session" button from dashboard
3. Test "Edit Profile" and "Preferences" links
4. Verify footer links (About, How It Works, Privacy, Terms)
5. Check mobile responsiveness (resize browser)
6. Test logout functionality

### Expected Results
✅ All navigation links functional  
✅ Header displays correct user type (Member/Host)  
✅ Dashboard tabs switch correctly (Upcoming/Completed)  
✅ Footer links navigate to static pages  
✅ Mobile menu works (hamburger icon)  
✅ Logout clears session and redirects to home  
✅ No broken links or 404 errors  
✅ Consistent styling across all pages

---

## 📊 Airtable Sync Verification

After completing all tests, verify data integrity:

### Member Registry
- All test members created
- Phone verified = true
- All profile fields populated

### Host Registry
- All test hosts created
- Verification Status = "Pending" or "Approved"
- Bio, tags, video URL present

### Presence Operations
- All bookings recorded
- Payment Status = "Succeeded"
- Video Room URLs generated
- Completed sessions have ratings
- Host Share calculated correctly

### Templates
- Pre-session prompts (Type = "PWA Popup")
- Post-session prompts (Type = "PWA Popup")
- Like notifications (Type = "PWA Banner")
- Holiday/Inactivity messages (Type = "PWA Banner")

### Likes
- Host Liked and Mutual records created
- Timestamps accurate

---

## 🐛 Issue Reporting Template

If any test fails, document:

```
Test: [Test Number and Name]
Component: [File path]
Expected: [What should happen]
Actual: [What actually happened]
Steps to Reproduce:
1. [Step 1]
2. [Step 2]
3. [Step 3]

Airtable Check: [What's in Airtable vs. expected]
Console Errors: [Browser console errors]
```

---

## ✅ Test Completion Checklist

- [ ] Test 8.1: Member Onboarding
- [ ] Test 8.2: Host Onboarding
- [ ] Test 8.3: Booking Flow
- [ ] Test 8.4: Session Experience
- [ ] Test 8.5: Messaging Layer (all 4 scenarios)
- [ ] Test 8.6: UX Consistency Check
- [ ] Airtable data integrity verified
- [ ] No console errors
- [ ] Mobile responsiveness confirmed

---

## 🚀 Ready for Beta Launch

Once all tests pass:
1. Document any edge cases discovered
2. Confirm Stripe Connect payouts in test mode
3. Verify Twilio SMS delivery rates
4. Test with multiple concurrent users
5. Prepare production environment variables
6. Schedule beta user onboarding
