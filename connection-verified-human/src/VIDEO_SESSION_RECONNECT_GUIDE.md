# Video Session Reconnection - Complete Guide

## ✅ What Was Fixed

### 1. VideoSession.tsx Updated
- Now accepts `bookingId` parameter (Cal.com booking ID) instead of Airtable record ID
- Searches Airtable using `{Cal.com Booking ID}='xxx'` filter formula
- Displays video room URL created by Cal.com webhook
- Falls back to manual room creation if webhook didn't fire

### 2. SessionCard.tsx Updated
- Now navigates to `/video-session?bookingId={Cal.com Booking ID}&userType={host/member}`
- Removed direct window.open of video URL
- Properly passes booking context to video session page

### 3. HostDashboard.tsx Updated
- Updated to use Cal.com bookingId instead of Airtable record ID
- Displays host's Cal.com calendar inline for availability management

### 4. MemberDashboard.tsx Updated
- Removed old handleJoinSession function
- SessionCard now handles navigation internally

## 🔄 Complete Flow

### When Member Books via Cal.com:
1. Member clicks "Book" on embedded Cal.com calendar
2. Cal.com creates booking with unique booking ID (uid)
3. Cal.com webhook fires → `calcom-webhook-handler` function
4. Handler creates Daily.co room
5. Handler stores in Airtable Presence Operations:
   - `Cal.com Booking ID`: booking uid
   - `Video Room URL`: Daily.co room URL
   - `Booking Status`: 'Created'
   - `Video Room Status`: 'Active'

### When User Joins Session:
1. User clicks "Join Video Session" in their dashboard
2. SessionCard navigates to `/video-session?bookingId={uid}&userType={host/member}`
3. VideoSession.tsx searches Airtable for booking by Cal.com Booking ID
4. Displays video room URL in iframe
5. Updates joined status for that user type

## 🧪 Testing Instructions

### Test URL Format:
```
/video-session?bookingId={Cal.com_booking_uid}&userType=member
/video-session?bookingId={Cal.com_booking_uid}&userType=host
```

### To Test Complete Flow:
1. Create test booking in Cal.com
2. Note the booking UID from Cal.com webhook payload
3. Verify Airtable Presence Operations has record with:
   - Cal.com Booking ID = booking UID
   - Video Room URL = Daily.co URL
4. Navigate to video session page with booking ID
5. Verify video iframe loads

## 📋 Airtable Requirements

### Presence Operations Table Must Have:
- `Cal.com Booking ID` (text field)
- `Video Room URL` (URL field)
- `Video Room Status` (single select: Not Created, Active, Ended)
- `Booking Status` (single select: Pending, Created, Cancelled, Completed)
- `Host Joined` (checkbox)
- `Member Joined` (checkbox)
- `Session Start Time` (date/time)
- `Member Name` (text)
- `Host Name` (text)

## 🔗 Cal.com Webhook Configuration

### Webhook URL:
```
https://api.databasepad.com/functions/v1/calcom-webhook-handler
```

### Events to Subscribe:
- BOOKING_CREATED
- BOOKING_RESCHEDULED

### Webhook Payload Fields Used:
- `uid` or `id` → Cal.com Booking ID
- `startTime` → Session Start Time
- `endTime` → Session End Time
- `attendees[0].email` → Member Email
- `attendees[0].name` → Member Name
- `user.email` or `organizer.email` → Host Email

## ✅ Automated Message Flow

Messages are triggered via Twilio (configured in webhook):
- **Pre-session**: 1 hour before (from Templates table)
- **Post-session**: After session ends (from Templates table)

Templates table should have:
- "Pre-Session Reminder" template
- "Post-Session Thank You" template
- "Holiday Message" template
- "Inactive 48h Reminder" template

## 🎯 Next Steps for Testing

1. **Create Test Booking**: Book via Cal.com embedded calendar
2. **Verify Webhook**: Check Supabase logs for calcom-webhook-handler execution
3. **Check Airtable**: Verify Presence Operations record created with Video Room URL
4. **Test Video Join**: Navigate to video-session page with booking ID
5. **Verify Both Users**: Test with both userType=host and userType=member

## 🚨 Troubleshooting

### Video Session Shows Spinner:
- Check browser console for errors
- Verify bookingId parameter is present in URL
- Check Airtable for matching Cal.com Booking ID
- Verify Video Room URL field is populated

### Webhook Not Firing:
- Check Cal.com webhook configuration
- Verify webhook URL is correct
- Check Supabase function logs
- Test webhook manually with test payload

### Room Not Created:
- Check Daily.co API key is set in Supabase secrets
- Verify Daily.co account has room creation enabled
- Check function logs for Daily.co API errors
