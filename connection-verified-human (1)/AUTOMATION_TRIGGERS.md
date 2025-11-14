# Automation Triggers Overview

This document outlines the consolidated Trigger → Source → Output mapping for all automations and in-app notifications in the Presence PWA.

## Event Mapping Table

| Event | Trigger Source | Output / Action | Channel / Tool | Notes |
|-------|---------------|-----------------|----------------|-------|
| **New Signup** | Airtable: "Member Created" | Send verification code | Twilio Verify SMS | Triggered automatically when a new member record is created in Airtable. |
| **Verification Success** | Twilio Verify callback | Send Welcome Message | Twilio SMS | Confirms verified mobile number, activates member profile. |
| **Payment Success** | Stripe webhook (checkout.session.completed) | Log transaction in Airtable + send confirmation SMS | Zapier + Twilio SMS | Includes plan_type, member_id, host_id metadata. |
| **Session Upcoming (15 min)** | Cal.com booking reminder | Send reminder with host name and start time | Twilio SMS | Fires 15 minutes before session start. |
| **Session Start (live)** | Daily.co session creation | Display pre-session popup | PWA Popup (Templates: Pre-Session Prompt) | Encourages calm, positive behaviour. |
| **Session Complete** | Daily.co webhook → Airtable update | Send thank-you message and offer rebook | Twilio SMS + PWA Popup (Post-Session Reflection) | Marks chat complete, triggers payout logic. |
| **Host Liked Member** | PWA interaction (Host Like) | Notify member of host interest | PWA Banner (Templates: Host Liked You) | Stored in Airtable "Likes" log. |
| **Mutual Like** | Airtable check (Host + Member like each other) | Show "It's a match!" message | PWA Banner (Templates: Mutual Like) | Optional re-engagement loop. |
| **48 h Inactivity** | Airtable formula (last_active > 2 days) | Send re-engagement message | Twilio SMS (Templates: Inactive 48 h Reminder) | Automated via scheduled Zap. |
| **Holiday Message** | Date condition (Dec 20 – 26) | Display holiday banner | PWA Banner (Templates: Holiday Message) | Emotional seasonal outreach. |
| **Help / Report Selected** | User action in PWA | Display default response from Help Desk Prompts | PWA Modal | No backend routing required yet. |

## Implementation Notes

- All events use existing webhooks and Zaps already tested in Stripe → Airtable → Twilio pipeline
- Presence Operations table remains the central transaction log
- PWA notifications read directly from the Templates table
- No new Twilio numbers or routing logic needed; all use existing Verify + Messaging APIs

## Component Integration

### PhoneVerification.tsx
- Handles "New Signup" and "Verification Success" triggers
- Uses twilio-verify-send and twilio-verify-check edge functions

### VideoSession.tsx
- Handles "Session Start (live)" and "Session Complete" triggers
- Displays pre-session prompts from Templates table
- Triggers post-session reflection and payment confirmation

### LikeNotification.tsx
- Handles "Host Liked Member" and "Mutual Like" triggers
- Fetches banner messages from Templates table

### HelpDesk.tsx
- Handles "Help / Report Selected" trigger
- Displays responses from Help Desk Prompts table

### MemberDashboard.tsx
- Displays holiday messages and inactivity reminders
- Fetches from Templates table based on date/activity conditions
