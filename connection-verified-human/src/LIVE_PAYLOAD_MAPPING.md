# Live Stripe Payload → Airtable Mapping
**Date:** November 12, 2025  
**Source:** Paul's Live Zapier Zap  
**Webhook:** `https://hooks.zapier.com/hooks/catch/23865094/uspssek/`

---

## 📦 Actual Live Payload from Zapier

```json
{
  "id": "cs_test_d1rGUEoXemsVWgW3LNzRe6858",
  "object": "checkout.session",
  "amount_total": 1000,
  "currency": "usd",
  "payment_status": "paid",
  "customer_details": {
    "email": "sample@email.com",
    "name": "Test User"
  },
  "created": 1731402241,
  "receipt_url": "https://stripe.com/receipts/test"
}
```

---

## 🎯 Airtable Field Mapping

### **Table:** Presence Operations

| Stripe Field | Airtable Column | Value Example | Notes |
|--------------|----------------|---------------|-------|
| `id` | Transaction ID | `cs_test_d1rG...` | Checkout Session ID |
| `amount_total` | Amount | `10.00` | Divide by 100 (cents → dollars) |
| `currency` | Currency | `USD` | Uppercase |
| `payment_status` | Payment Status | `Completed` | Map `paid` → `Completed` |
| `customer_details.email` | Member Email | `sample@email.com` | |
| `customer_details.name` | Member Name | `Test User` | |
| `created` | Payment Date | `2025-11-12` | Convert Unix timestamp |
| `receipt_url` | Receipt URL | `https://stripe.com/receipts/test` | |

---

## 🔄 Zapier Action Configuration

### **Step 1: Trigger**
- **App:** Stripe
- **Event:** Checkout Session Completed
- **Webhook URL:** `https://hooks.zapier.com/hooks/catch/23865094/uspssek/`

### **Step 2: Action**
- **App:** Airtable
- **Action:** Update Record
- **Table:** Presence Operations
- **Find Record By:** Transaction ID (match `id` field)

### **Step 3: Field Mappings**
```
Payment Status: Completed
Transaction ID: {{id}}
Amount: {{amount_total / 100}}
Currency: {{currency | uppercase}}
Member Email: {{customer_details__email}}
Member Name: {{customer_details__name}}
Payment Date: {{created | date}}
Receipt URL: {{receipt_url}}
```

---

## ⚠️ Missing Fields in Live Payload

**Critical for full integration:**

| Missing Field | Purpose | Solution |
|--------------|---------|----------|
| `metadata.plan_type` | Identify Adhoc vs Weekly | Add to Stripe Checkout |
| `metadata.member_id` | Link to Airtable Member | Add to Stripe Checkout |
| `metadata.host_id` | Calculate host payout | Add to Stripe Checkout |
| `payment_intent` | Stripe payment reference | Include in webhook |

**Action Required:**  
Update Stripe Checkout session creation to include metadata:

```javascript
const session = await stripe.checkout.sessions.create({
  // ... existing config
  metadata: {
    plan_type: 'Adhoc', // or 'Weekly Access'
    member_id: 'recMEMBER123456',
    host_id: 'recHOST789012'
  }
});
```

---

## 🧮 Host Payout Calculation

**Formula:**
- **Adhoc:** Host gets 67% of `amount_total`
- **Weekly:** Host gets 75% of `amount_total`

**Example (from live payload):**
```
Amount Total: $10.00 (1000 cents)
Plan Type: Adhoc
Host Payout: $10.00 × 0.67 = $6.70
Payout Date: 7 days from payment
```

**Zapier Formula Field:**
```
IF({{metadata__plan_type}} = "Adhoc", {{amount_total / 100 * 0.67}}, {{amount_total / 100 * 0.75}})
```

---

## ✅ Verification Checklist

- [x] Webhook URL active and receiving data
- [x] Payload structure documented
- [ ] Metadata fields added to Stripe Checkout
- [ ] Zapier Zap configured with field mappings
- [ ] Test payment processed end-to-end
- [ ] Airtable record updated correctly
- [ ] Host payout calculated accurately
- [ ] Receipt URL accessible

---

## 🧪 Test Command

```bash
curl -X POST https://hooks.zapier.com/hooks/catch/23865094/uspssek/ \
  -H "Content-Type: application/json" \
  -d '{
    "id": "cs_test_manual_001",
    "object": "checkout.session",
    "amount_total": 1800,
    "currency": "usd",
    "payment_status": "paid",
    "customer_details": {
      "email": "test@presence.com",
      "name": "Manual Test"
    },
    "created": 1731402241,
    "receipt_url": "https://stripe.com/receipts/test",
    "metadata": {
      "plan_type": "Adhoc",
      "member_id": "recTEST123",
      "host_id": "recHOST456"
    }
  }'
```

**Expected Result:** Airtable record created/updated with all fields populated.

---

**Status:** ✅ Payload verified - Ready for Zapier configuration with metadata enhancement
