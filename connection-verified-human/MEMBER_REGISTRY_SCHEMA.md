# Presence — Membership Registry Schema (v1.1 Final)

**Last Updated:** 2025-11-12  
**Integration Status:** PWA Onboarding Form Aligned ✅

---

## Airtable Table: Members

### Field Specifications

| Field Name | Type | Example / Description | Notes |
|------------|------|----------------------|-------|
| **Member ID** | Auto Number | 00123 | Unique record key |
| **Full Name** | Single line text | Jane Smith | Required |
| **Email** | Email | jane@email.com | Used for Stripe + communication |
| **Mobile Number** | Phone | +61 412 345 678 | Used for Twilio Verify |
| **Profile Photo / AI Image** | Attachment | .jpg / .png | Members can upload real photo or AI-generated image |
| **About You** | Long Text (Rich Text, 500 char limit) | "I'm a student who loves music..." | Used for tone-matching and personalization |
| **Verification Status** | Single select | Pending / Verified / Failed | Updated automatically via Twilio Verify |
| **Member Agreement Accepted** | Checkbox | ☑️ | Must be checked before activation |
| **Member Type** | Single select | Host / Member | Determines onboarding flow |
| **Country** | Single select | Australia / Singapore / USA | Helps with timezone pairing |
| **Time Zone** | Single select | AEST / PST / GMT | Used by Cal.com scheduling |
| **Language Preference** | Single select | English / Spanish / Hindi | Multi-language readiness |
| **Gender (Optional)** | Single select | Male / Female / Non-binary / Prefer not to say | Optional diversity field |
| **Interests** | Multi-select | Fitness, Music, Wellness | Used for matching |
| **Community Pledge Signed** | Checkbox | ☑️ | Must be checked before activation |
| **Join Date** | Created Time | Auto | For lifecycle tracking |
| **Status** | Single select | Active / Inactive / Suspended | Engagement control |
| **Stripe Customer ID** | Single line text | cus_xxxxxx | Populated from Stripe |
| **Last Active** | Last Modified Time | Auto | Used for inactivity triggers |
| **Referral Source** | Single line text | TikTok / Instagram / Friend | Optional |
| **Notes** | Long Text | "Verified via SMS, uploaded ID" | Admin or system notes |

---

## Integration Points

### PWA → Airtable
- Form submission creates new Member record
- All required fields validated before submission
- Phone verification updates `Verification Status`
- Agreements must be checked to activate

### Twilio Verify
- Updates `Verification Status` field
- Validates `Mobile Number`

### Stripe
- Populates `Stripe Customer ID` on first payment
- Links to Presence Operations via `Linked Member`

### Schema Linkages
- **Presence Operations** → `Linked Member` (array)
- **Bookings** → `Linked Member` (array)
- **Audit Log** → `Linked Member` (array)

---

## PWA Implementation Status

✅ **MemberOnboardingForm.tsx** - Comprehensive form with all v1.1 fields  
✅ **Signup.tsx** - Multi-step flow (Details → Phone Verification)  
✅ **airtable.ts** - MemberRecord interface with full schema  
✅ **Field Validation** - Required fields, character limits, checkboxes  
✅ **Airtable Sync** - Creates record on successful verification  

---

## Next Steps

1. ✅ PWA onboarding form updated
2. ⏳ Test end-to-end member registration flow
3. ⏳ Configure message templates for new member fields
4. ⏳ Set up automation triggers based on member data

---

**Status:** Ready for testing and automation configuration
