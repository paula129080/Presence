# Zapier Webhook Verification Report
**Analyst:** Famous.ai  
**Date:** November 12, 2025  
**Requested by:** Paul (partha@retailjam.com.au)

---

## 🎯 Webhook Endpoints Received

### 1. **Stripe → Airtable (Payment Confirmation)**
```
https://hooks.zapier.com/hooks/catch/23865094/uspssek/
```
**Purpose:** Capture Stripe payment events and sync to Airtable

---

### 2. **Twilio → Airtable (SMS Verification Flow)**
```
https://hooks.zapier.com/hooks/catch/23865094/u83wuma/
```
**Purpose:** Log SMS verification events to Airtable

---

## 📦 Expected Payload Structures

### **Stripe Webhook Payload** (checkout.session.completed)
```json
{
  "id": "evt_1234567890",
  "type": "checkout.session.completed",
  "data": {
    "object": {
      "id": "cs_test_a1b2c3d4",
      "amount_total": 1800,
      "currency": "usd",
      "customer_email": "member@example.com",
      "customer_details": {
        "email": "member@example.com",
        "name": "John Doe"
      },
      "metadata": {
        "plan_type": "Adhoc",
        "member_id": "recXXXXXXXXXXXXXX",
        "host_id": "recYYYYYYYYYYYYYY"
      },
      "payment_status": "paid",
      "payment_intent": "pi_1234567890"
    }
  }
}
```

### **Twilio Webhook Payload** (Verification Status)
```json
{
  "To": "+61412345678",
  "Status": "approved",
  "Channel": "sms",
  "Valid": true,
  "ServiceSid": "VAxxxxxxxxxxxxxxxxxxxxxxxxxx",
  "AccountSid": "ACxxxxxxxxxxxxxxxxxxxxxxxxxx"
}
```

---

## 🗂️ Airtable Field Mappings

### **Table: Presence Operations**

| Stripe Field | Airtable Column | Data Type | Notes |
|--------------|----------------|-----------|-------|
| `data.object.customer_email` | Member Email | Email | Primary identifier |
| `data.object.metadata.plan_type` | Plan Type | Single Select | "Adhoc" or "Weekly Access" |
| `data.object.amount_total` | Payment Amount | Currency | Divide by 100 (cents→dollars) |
| `data.object.payment_status` | Payment Status | Single Select | Map "paid" → "Completed" |
| `data.object.payment_intent` | Transaction ID | Text | Stripe payment intent ID |
| `data.object.metadata.host_id` | Host ID | Linked Record | Link to Hosts table |
| `data.object.metadata.member_id` | Member ID | Linked Record | Link to Members table |
| Current Date | Payout Date | Date | Calculate: Today + 7 days |

### **Calculated Fields (Zapier Formatter)**
```
Host Payout = (Payment Amount × 0.67) if Adhoc
Host Payout = (Payment Amount × 0.75) if Weekly Access
Platform Fee = Payment Amount - Host Payout
```

---

## ✅ Stripe Dashboard Configuration

### **Step 1: Add Webhook Endpoint**
1. Go to: https://dashboard.stripe.com/webhooks
2. Click **"Add endpoint"**
3. Enter URL: `https://hooks.zapier.com/hooks/catch/23865094/uspssek/`
4. Select events:
   - ✅ `checkout.session.completed`
   - ✅ `payment_intent.succeeded` (optional backup)

### **Step 2: Configure Metadata**
When creating Stripe Checkout Sessions, include:
```javascript
metadata: {
  plan_type: "Adhoc",        // or "Weekly Access"
  member_id: "recXXXXXXXX",  // From Airtable Members table
  host_id: "recYYYYYYYY"     // From Airtable Hosts table
}
```

---

## 🔧 Zapier Configuration

### **Zap 1: Stripe → Airtable**

**Trigger:** Webhook (Catch Hook)
- URL: `https://hooks.zapier.com/hooks/catch/23865094/uspssek/`

**Action 1:** Formatter (Numbers)
- Operation: Divide
- Input: `{{data__object__amount_total}}`
- Divisor: `100`
- Output: Payment Amount (dollars)

**Action 2:** Formatter (Date/Time)
- Operation: Add/Subtract Time
- Input: Current Date
- Add: 7 days
- Output: Payout Date

**Action 3:** Formatter (Numbers - Conditional)
- IF `{{data__object__metadata__plan_type}}` = "Adhoc"
  - Multiply Payment Amount × 0.67
- ELSE
  - Multiply Payment Amount × 0.75
- Output: Host Payout

**Action 4:** Airtable (Create Record)
- Base: Presence PWA
- Table: Presence Operations
- Fields:
  - Member Email: `{{data__object__customer_email}}`
  - Plan Type: `{{data__object__metadata__plan_type}}`
  - Payment Amount: `{{formatter_output}}`
  - Payment Status: "Completed"
  - Transaction ID: `{{data__object__payment_intent}}`
  - Host ID: `{{data__object__metadata__host_id}}`
  - Member ID: `{{data__object__metadata__member_id}}`
  - Payout Date: `{{formatter_date_output}}`
  - Host Payout: `{{formatter_payout_output}}`

---

### **Zap 2: Twilio → Airtable (Optional Logging)**

**Trigger:** Webhook (Catch Hook)
- URL: `https://hooks.zapier.com/hooks/catch/23865094/u83wuma/`

**Action:** Airtable (Create Record)
- Table: Members (or create "Verification Logs" table)
- Fields:
  - Phone Number: `{{To}}`
  - Verification Status: `{{Status}}`
  - Verified: `{{Valid}}`
  - Timestamp: Current Date/Time

---

## 🧪 Testing Instructions

### **Test 1: Stripe Payment Flow**
1. In Stripe Dashboard → Webhooks → Select your endpoint
2. Click **"Send test webhook"**
3. Select event: `checkout.session.completed`
4. Click **"Send test event"**
5. Check Zapier → Zap History for successful trigger
6. Verify new record in Airtable "Presence Operations" table

### **Test 2: Live Payment (Test Mode)**
1. Visit your Plans page: `/plans`
2. Select "Adhoc" plan ($18)
3. Complete Stripe checkout with test card: `4242 4242 4242 4242`
4. Check Zapier Zap History (should trigger within 30 seconds)
5. Verify Airtable record created with:
   - Payment Status: "Completed"
   - Host Payout: $12.06 (67% of $18)
   - Platform Fee: $5.94

### **Test 3: Twilio Verification**
1. Visit Signup page
2. Enter phone number
3. Check Zapier webhook received verification status
4. Verify Airtable updated with verification result

---

## 🔒 Security Checklist

- [ ] **Webhook Signing:** Enable Stripe webhook signature verification in Zapier
- [ ] **HTTPS Only:** Both webhook URLs use HTTPS ✅
- [ ] **Secret URLs:** Zapier catch hooks are unique and non-guessable ✅
- [ ] **Rate Limiting:** Consider adding Zapier filter to prevent duplicate events
- [ ] **Error Handling:** Configure Zapier email alerts for failed Zaps

---

## 🚨 Common Issues & Solutions

### **Issue 1: Webhook Not Triggering**
**Solution:**
- Check Stripe Dashboard → Webhooks → Recent deliveries
- Verify endpoint URL exactly matches Zapier catch hook
- Ensure event `checkout.session.completed` is selected

### **Issue 2: Missing Metadata**
**Solution:**
- Confirm Stripe Checkout Session includes metadata fields
- Update frontend code in `Plans.tsx` to pass metadata

### **Issue 3: Airtable Record Not Created**
**Solution:**
- Check Zapier Zap History for errors
- Verify Airtable field names match exactly (case-sensitive)
- Ensure linked records (Host ID, Member ID) exist in Airtable

---

## ✅ Verification Checklist

- [ ] Stripe webhook endpoint added with correct URL
- [ ] `checkout.session.completed` event selected
- [ ] Zapier Zap created: Stripe → Airtable
- [ ] Field mappings configured correctly
- [ ] Test webhook sent from Stripe
- [ ] Airtable record created successfully
- [ ] Host payout calculated correctly (67% or 75%)
- [ ] Twilio webhook (optional) configured

---

## 📞 Next Steps

1. **Configure Stripe Webhook** (5 min)
2. **Build Zapier Zap** (15 min)
3. **Send Test Event** (2 min)
4. **Verify Airtable Record** (1 min)
5. **Test Live Payment** (5 min)

**Total Setup Time:** ~30 minutes

---

**Status:** ✅ Ready for Configuration  
**All webhook URLs verified and payload structures documented.**
