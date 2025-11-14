# Stripe Payout Automation Guide

## Overview
Automated host payout system using Stripe Connect Transfers. When a member payment succeeds, the system automatically transfers the host's share to their connected Stripe account.

## Architecture

### Flow
1. Member completes Stripe payment → Payment Intent succeeds
2. `stripe-payment-confirm` edge function triggered
3. Function verifies payment and updates Airtable
4. Airtable formulas calculate Host Share (67% Adhoc / 75% Weekly)
5. Function fetches host's Stripe Connect ID
6. Stripe Transfer created to host's connected account
7. Payout ID and status written back to Airtable

### Payout Splits
- **Adhoc Sessions**: 67% host / 33% platform
- **Weekly Sessions**: 75% host / 25% platform

## Airtable Schema Requirements

### Presence Operations Table
Required fields:
- `Payment Status` (Single select: Pending/Completed/Failed)
- `Transaction ID` (Single line text)
- `Payout Date` (Date field)
- `Payout ID` (Single line text) - Stripe transfer ID
- `Payout Status` (Single select: Pending/Completed/Failed)
- `Plan Type` (Single select: Adhoc/Weekly)
- `Host Share (AUD)` (Formula field)
- `Linked Host` (Linked record to Host Registry)
- `Linked Member` (Linked record to Member Registry)

### Host Registry Table
Required fields:
- `Stripe Connect ID` (Single line text) - Format: acct_xxxxx
- `Stripe Payout Status` (Single select: Active/Pending/Suspended)
- `Email` (Email field)

## Testing Guide

### Step 1: Create Stripe Connect Test Account
```bash
# Use Stripe CLI or Dashboard to create connected account
stripe accounts create \
  --type=express \
  --country=AU \
  --email=testhost@example.com \
  --capabilities[transfers][requested]=true
```

Save the account ID (format: `acct_xxxxxxxxxxxxx`)

### Step 2: Add Stripe Connect ID to Host
1. Open Airtable → Host Registry
2. Find test host record
3. Paste Stripe Connect ID into `Stripe Connect ID` field
4. Set `Stripe Payout Status` to "Active"

### Step 3: Create Test Payment
```bash
curl -X POST https://api.databasepad.com/functions/v1/stripe-payment-confirm \
  -H "Content-Type: application/json" \
  -d '{
    "paymentIntentId": "pi_test_xxxxx",
    "recordId": "recXXXXXXXXXXXXXX"
  }'
```

### Step 4: Verify Results
Check Airtable Presence Operations:
- ✅ `Payment Status` = "Completed"
- ✅ `Payout ID` = "tr_xxxxx" (Stripe transfer ID)
- ✅ `Payout Status` = "Completed"
- ✅ `Host Share (AUD)` calculated correctly

Check Stripe Dashboard:
- Navigate to Connect → Transfers
- Verify transfer to host's connected account
- Confirm amount matches Host Share

## Error Handling

### Graceful Degradation
Function will succeed even if payout fails:
- Missing host ID → Payment confirmed, payout skipped
- Missing Stripe Connect ID → Payment confirmed, payout skipped
- Invalid Stripe account → Payment confirmed, error logged

### Common Issues
1. **"Host has no Stripe Connect account"**
   - Add `Stripe Connect ID` to Host Registry record

2. **"Stripe transfer failed: Invalid destination"**
   - Verify Stripe Connect ID format (acct_xxxxx)
   - Ensure account has transfers capability enabled

3. **"Host Share not calculated"**
   - Check `Plan Type` is set (Adhoc/Weekly)
   - Verify formula fields in Presence Operations

## Production Checklist
- [ ] All hosts have valid Stripe Connect IDs
- [ ] Stripe Connect accounts verified and active
- [ ] Payout Status and Payout ID fields exist in Airtable
- [ ] Formula fields calculate correctly for both plan types
- [ ] Test transfer in Stripe test mode succeeds
- [ ] Error logging configured for failed payouts

## API Reference

### Edge Function Endpoint
`POST https://api.databasepad.com/functions/v1/stripe-payment-confirm`

### Request Body
```json
{
  "paymentIntentId": "pi_xxxxx",
  "recordId": "recXXXXXXXXXXXXXX"
}
```

### Response (Success)
```json
{
  "success": true,
  "paymentStatus": "succeeded",
  "payoutId": "tr_xxxxx",
  "payoutAmount": 12.06,
  "metadata": {
    "planType": "Adhoc",
    "memberId": "recMemberXXX",
    "hostId": "recHostXXX"
  },
  "airtableUpdated": true,
  "recordId": "recXXXXXXXXXXXXXX"
}
```

## Next Steps
1. Run test payment with real Stripe Connect account
2. Verify payout appears in host's Stripe dashboard
3. Confirm Airtable sync of Payout ID and status
4. Test error scenarios (missing Connect ID, invalid account)
5. Enable production mode once validated
