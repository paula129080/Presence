# Help Desk & Templates Integration

## Overview
This document outlines the integration of the new Help Desk Prompts table and expanded Templates system into the Presence PWA.

## 1. Help Desk Prompts Table

### Airtable Schema
- **Table Name**: `Help Desk Prompts`
- **Fields**:
  - `Topic` (Single line text) - The help topic/question
  - `Category` (Single select) - Member / Host / General
  - `Default Response` (Long text) - The support response message
  - `Contact Escalation` (Email) - support@presence.app
  - `Priority` (Single select) - Normal / Urgent / Safety
  - `Linked Template` (Linked record) - Optional link to Templates table

### PWA Integration
- **Component**: `src/pages/HelpDesk.tsx`
- **Functionality**: 
  - Fetches all prompts from Airtable on page load
  - Displays prompts grouped by Category (Member/Host/General)
  - Searchable accordion interface
  - Shows urgent items with alert icon
  - Displays contact escalation email when available
  - Read-only mode (no ticketing logic yet)

## 2. Templates Table Expansion

### New PWA Templates Added
1. **Host Liked You**
   - Type: PWA Banner
   - Trigger: Host clicks "Like"
   - Message: "{{host_name}} liked your profile — you can rebook or start a new chat anytime."

2. **Mutual Like**
   - Type: PWA Banner
   - Trigger: Both Host + Member like each other
   - Message: "It's a match! You and {{host_name}} both liked each other. You can rebook directly."

3. **Pre-Session Prompt**
   - Type: PWA Popup
   - Trigger: When session starts
   - Message: "Take a deep breath — Presence is for kind, open conversations."

4. **Post-Session Reflection**
   - Type: PWA Popup
   - Trigger: After session ends
   - Message: "How did that chat feel? Remember — small moments can mean a lot."

### Existing SMS Templates Retained
All previous Twilio/SMS templates remain active:
- Verification Code
- Welcome Message
- Booking Confirmation
- Pre-Session Reminder
- Session Complete
- Inactive 48h Reminder
- Holiday Message
- Host Availability Alert
- Feedback Request
- Safety Reminder

## 3. Component Updates

### LikeNotification (`src/components/LikeNotification.tsx`)
- Fetches "Host Liked You" and "Mutual Like" templates from Airtable
- Replaces {{host_name}} placeholder with actual host name
- Displays appropriate banner based on like type (single vs mutual)

### SessionPrompts (`src/components/SessionPrompts.tsx`)
- Fetches "Pre-Session Prompt" and "Post-Session Reflection" from Airtable
- Displays prompts based on session stage (pre/active/post)
- Falls back to default prompts if Airtable fetch fails

### ConversationTemplates (`src/components/ConversationTemplates.tsx`)
- Fetches all templates with Type = 'PWA Popup', 'PWA Banner', or 'Chat'
- Supports both SMS and PWA template types in same table
- Used in Chat interface for conversation starters

## 4. Testing Checklist

- [ ] Help Desk page loads prompts from Airtable
- [ ] Prompts are grouped by Category correctly
- [ ] Search functionality filters prompts
- [ ] Like notifications display correct template messages
- [ ] Pre-session prompt appears when session starts
- [ ] Post-session reflection appears when session ends
- [ ] Chat templates load from Airtable
- [ ] SMS templates still work via Twilio integration

## 5. Future Enhancements (Phase 2)
- Live ticketing system integration
- SMS escalation via Twilio for urgent issues
- Admin dashboard for managing help prompts
- Template analytics and usage tracking
