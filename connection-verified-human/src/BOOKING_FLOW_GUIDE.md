# 📅 Host Booking Flow - End-to-End Guide

## Complete User Journey: Member → Host → Session

### Flow Overview
```
Member Dashboard → Host Selection → Plan Selection → Payment (Stripe) → 
Booking Confirmation → Cal.com Scheduling → Video Session (Daily.co) → 
Post-Session Rating
```

---

## 1️⃣ Host Selection (`/host-selection`)
**File**: `src/pages/HostSelection.tsx`

**Features**:
- Fetches active hosts from Airtable `Hosts` table
- Real-time search by name or bio
- Filter by personality tags (Calm, Empathetic, Funny, etc.)
- Click host card → Navigate to `/plans`

**Airtable Integration**:
```typescript
airtableService.listRecords('Hosts', undefined, "{Status}='Active'")
```

---

## 2️⃣ Plan Selection (`/plans`)
**File**: `src/pages/Plans.tsx`

**Options**:
- **Adhoc**: $18 AUD, 1 session, 67% host / 33% platform
- **Weekly**: $40 AUD, 3 sessions, 75% host / 25% platform

**Action**: Select plan → Opens Stripe payment modal

**Next Step**: Integrate Stripe Checkout (already configured via `stripe-payment-confirm` edge function)

---

## 3️⃣ Payment Processing (Stripe)
**Edge Function**: `stripe-payment-confirm`

**Webhook Flow**:
1. Stripe `checkout.session.completed` webhook fires
2. Creates record in Airtable `Presence Operations` table
3. Sends SMS confirmation via Twilio
4. Returns booking ID to frontend

**Metadata Passed**:
- `member_id`: Member's Airtable record ID
- `host_id`: Host's Airtable record ID
- `plan_type`: "Adhoc" or "Weekly"

---

## 4️⃣ Booking Confirmation & Scheduling
**Component**: `BookingCalendar.tsx`

**Cal.com Integration**:
- Edge function: `calcom-create-booking`
- Creates booking with selected host's Cal.com account
- Returns booking URL and confirmation

**Airtable Update**:
```typescript
{
  'Booking Status': 'Created',
  'Cal.com Booking ID': bookingId,
  'Cal.com URL': bookingUrl,
  'Session Start Time': startTime
}
```

---

## 5️⃣ Video Session Creation
**Edge Function**: `daily-create-room`

**Triggered**: 15 minutes before session start time

**Creates**:
- Daily.co video room
- Updates `Presence Operations` with room URL
- Sends reminder SMS via Twilio

**Airtable Update**:
```typescript
{
  'Video Room URL': roomUrl,
  'Video Room Status': 'Active'
}
```

---

## 6️⃣ Join Session (`/video-session`)
**File**: `src/pages/VideoSession.tsx`

**Features**:
- Displays pre-session prompts from `Templates` table
- Embeds Daily.co iframe
- Tracks join status (Host Joined / Member Joined)
- Post-session reflection prompts

**Member Dashboard Integration**:
- Shows "Join Session" button when room is active
- Updates `Member Joined: true` in Airtable

---

## 7️⃣ Post-Session Flow
**Component**: `RatingModal.tsx`

**Actions**:
1. Member rates host (1-5 stars) - currently paused
2. "Rebook" button → Returns to `/host-selection`
3. SMS thank-you message sent via Twilio
4. Updates `Booking Status: 'Completed'` in Airtable

---

## 🔄 Automation Triggers Active

| Event | Trigger | Action |
|-------|---------|--------|
| Payment Success | Stripe webhook | Create Presence Operation + SMS |
| Session Upcoming | 15 min before | Create Daily.co room + SMS reminder |
| Session Complete | Daily.co webhook | Send thank-you SMS + trigger payout |
| Host Liked Member | PWA interaction | Show "Host Liked You" banner |

---

## ✅ Testing Checklist

### Phase 1: Host Selection
- [ ] Load active hosts from Airtable
- [ ] Search functionality works
- [ ] Personality tag filters work
- [ ] Host card click navigates to `/plans`

### Phase 2: Payment
- [ ] Stripe modal opens with correct plan
- [ ] Payment creates Presence Operation record
- [ ] Confirmation SMS sent to member

### Phase 3: Booking
- [ ] Cal.com booking created
- [ ] Booking URL stored in Airtable
- [ ] Member receives booking confirmation

### Phase 4: Video Session
- [ ] Daily.co room created 15 min before
- [ ] Member can join from dashboard
- [ ] Pre/post-session prompts display
- [ ] Join status tracked in Airtable

### Phase 5: Completion
- [ ] Session marked complete
- [ ] Thank-you SMS sent
- [ ] Rebook option available

---

## 🛠️ Integration Status

✅ **Complete**:
- Airtable sync (Members, Hosts, Presence Operations)
- Stripe payment processing
- Twilio SMS (verification, reminders, confirmations)
- Cal.com booking API
- Daily.co video rooms

⚠️ **Pending**:
- Live Stripe webhook testing
- Cal.com booking confirmation flow
- Daily.co room auto-creation trigger
- Host payout automation

---

## 📞 Support Contacts
- **Airtable**: Base ID configured
- **Stripe**: Test mode active, webhook endpoint set
- **Twilio**: Verify service configured
- **Cal.com**: API key set
- **Daily.co**: API key set

Ready for end-to-end testing! 🚀
