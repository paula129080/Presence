# Stripe → Airtable Integration Guide

## ✅ Integration Status: READY FOR TESTING

### Edge Function Updated
The `stripe-payment-confirm` edge function now:
- ✅ Pulls metadata from Stripe Payment Intent (plan_type, member_id, host_id)
- ✅ Updates Airtable with Payment Status = Completed
- ✅ Syncs Transaction ID and Payout Date
- ✅ Links Member and Host records (if provided in metadata)

### Airtable Schema Updated
The `PresenceOperation` interface now includes:
- Transaction ID
- Linked Member (array of record IDs)
- Linked Host (array of record IDs)
- Payout Date
- Presence Share (AUD) - calculated by formula
- Host Share (AUD) - calculated by formula

### Test Page Available
Navigate to `/stripe-test` to manually test the payment confirmation flow:
1. Enter a Payment Intent ID (from Stripe dashboard)
2. Enter an Airtable Record ID (from Presence Operations table)
3. Click "Test Payment Confirmation"
4. View the result with metadata extraction

## End-to-End Flow

### 1. Stripe Checkout (Your Side)
```javascript
// Ensure metadata is included in checkout session
metadata: {
  plan_type: "Adhoc" | "Weekly",
  member_id: "recXXXXXXXXXXXXXX",
  host_id: "recYYYYYYYYYYYYYY"
}
```

### 2. Zapier Trigger (checkout.session.completed)
Maps to Airtable "Presence Operations":
- id → Transaction ID
- amount_total → Amount (AUD)
- payment_status → Payment Status
- receipt_url → Receipt URL (root level)
- metadata.plan_type → Plan Type
- metadata.member_id → Linked Member
- metadata.host_id → Linked Host

### 3. Edge Function Confirmation
Endpoint: `https://api.databasepad.com/functions/v1/stripe-payment-confirm`

Request:
```json
{
  "paymentIntentId": "pi_xxxxxxxxxxxxx",
  "recordId": "recXXXXXXXXXXXXXX"
}
```

Response:
```json
{
  "success": true,
  "paymentStatus": "succeeded",
  "metadata": {
    "planType": "Adhoc",
    "memberId": "recXXXXXXXXXXXXXX",
    "hostId": "recYYYYYYYYYYYYYY"
  },
  "airtableUpdated": true,
  "recordId": "recXXXXXXXXXXXXXX"
}
```

## Next Steps

1. **Update Stripe Products**: Add metadata to both products
2. **Update Zapier**: Use root `receipt_url` field
3. **Test Payment**: Run a live test with metadata
4. **Verify Airtable**: Confirm all fields populate correctly
5. **Check Formulas**: Verify Host Share and Presence Share calculate correctly

## Testing Checklist

- [ ] Stripe metadata includes plan_type, member_id, host_id
- [ ] Zapier creates record in Presence Operations
- [ ] Edge function updates Payment Status to Completed
- [ ] Transaction ID syncs correctly
- [ ] Linked Member/Host records populate
- [ ] Payout Date is set
- [ ] Host Share formula calculates (67% Adhoc, 75% Weekly)
- [ ] Presence Share formula calculates (33% Adhoc, 25% Weekly)
