# Host Registry Schema v1.2

## Overview
Updated schema for Presence Host Registry with Personality Tags for enhanced member-host matching.

## Schema Fields

### Core Identity
- **Host ID**: Auto Number (e.g., H00123)
- **Full Name**: Single line text (Required)
- **Email**: Email field (Required, used for Stripe Connect)
- **Mobile Number**: Phone field (Required, used for Twilio Verify)

### Profile Media
- **Profile Photo**: Attachment (.jpg/.png)
- **Full-Length Photo**: Attachment (.jpg/.png)
- **Intro Video**: Attachment/URL (10-30 sec, mandatory verification)

### Profile Information
- **About You (Host Bio)**: Long text, rich text enabled, 500 char limit
- **Languages Spoken**: Multi-select (English, Spanish, French, German, Japanese, Mandarin, Hindi, Arabic)
- **Country / Time Zone**: Single select (AEST, PST, EST, GMT, CET, JST, IST)
- **Personality Tags**: Multi-select (up to 3) - Calm, Outgoing, Empathetic, Analytical, Funny, Motivator, Listener

### Verification & Status
- **Verification Status**: Single select (Pending/Verified/Failed)
- **Community Pledge Signed**: Checkbox (Required)
- **Status**: Single select (Active/Inactive/Suspended)

### Payment Integration
- **Stripe Connect ID**: Single line text (Auto-populated)
- **Stripe Payout Status**: Single select (Active/Pending/Suspended)
- **Presence Share (AUD)**: Formula field
- **Host Share (AUD)**: Formula field

### Performance Metrics
- **Availability (Hours per Week)**: Number
- **Rebook Rate (%)**: Formula field
- **Host Rating (Paused)**: Number (retained but not displayed)

### System Fields
- **Join Date**: Created Time (Auto)
- **Last Active**: Last Modified Time (Auto)
- **Notes**: Long text (Admin field)

## Integration Points

### Linked Tables
- Presence Operations → Linked Host
- Bookings → Linked Host
- Audit Log → Linked Host

### PWA Integration
- Onboarding form collects all v1.2 fields
- Personality tags displayed on host cards
- Members can filter hosts by personality tags
- Tags shown as: "Emily J – Calm · Listener · Empathetic"

### Airtable Sync
- Creates record on host verification submission
- Updates verification status via admin approval
- Syncs Stripe Connect ID on payout setup

## Personality Tags Usage

### Purpose
Replace public host ratings with personality-based matching

### Display
- Shown on host profile cards below photo/bio
- Used in member search/filter interface
- Maximum 3 tags per host

### Available Tags
Calm, Outgoing, Empathetic, Analytical, Funny, Motivator, Listener

## Notes
- Host Rating field paused but retained in schema
- Personality Tags are primary matching mechanism
- All hosts must select at least 1 tag during onboarding
