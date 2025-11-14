# Webhook Testing Guide
**For:** Paul (Presence PWA)  
**Date:** November 12, 2025

---

## 🧪 Quick Test Commands

### Test 1: Stripe Webhook (Adhoc Payment)
```bash
curl -X POST https://hooks.zapier.com/hooks/catch/23865094/uspssek/ \
  -H "Content-Type: application/json" \
  -d '{
    "id": "evt_test_001",
    "type": "checkout.session.completed",
    "data": {
      "object": {
        "id": "cs_test_123",
        "amount_total": 1800,
        "currency": "usd",
        "customer_email": "test@example.com",
        "metadata": {
          "plan_type": "Adhoc",
          "member_id": "recTEST123",
          "host_id": "recTEST456"
        },
        "payment_status": "paid",
        "payment_intent": "pi_test_789"
      }
    }
  }'
```

### Test 2: Twilio Webhook (Verification)
```bash
curl -X POST https://hooks.zapier.com/hooks/catch/23865094/u83wuma/ \
  -H "Content-Type: application/json" \
  -d '{
    "To": "+61412345678",
    "Status": "approved",
    "Channel": "sms",
    "Valid": true
  }'
```

---

## ✅ Validation Steps

### After Stripe Test:
1. Go to Zapier Dashboard → Zap History
2. Look for recent trigger (should appear within 10 seconds)
3. Check Airtable "Presence Operations" table
4. Verify new record with:
   - Payment Amount: $18.00
   - Host Payout: $12.06 (67%)
   - Payment Status: "Completed"

### After Twilio Test:
1. Check Zapier Zap History
2. Verify Airtable record created
3. Confirm phone number and status logged

---

## 🔍 Expected Calculations

| Plan Type | Payment | Host % | Host Payout | Platform Fee |
|-----------|---------|--------|-------------|--------------|
| Adhoc | $18 | 67% | $12.06 | $5.94 |
| Weekly | $40 | 75% | $30.00 | $10.00 |

---

## 🚨 Troubleshooting

**Webhook returns 200 but no Zap triggers:**
- Zap may be turned off - check Zapier dashboard
- Webhook URL may be incorrect - verify exact match

**Airtable record not created:**
- Check field name mappings (case-sensitive)
- Verify Airtable base/table permissions
- Review Zapier error logs

---

**Ready to test!** Run the curl commands above.
