# Zapier → Airtable Field Mapping Guide
**For:** Presence PWA Payment Integration  
**Date:** November 12, 2025

---

## 🎯 Zap Configuration

### **Zap Name:** Stripe Payment → Airtable Update

**Trigger:** Stripe - Checkout Session Completed  
**Action:** Airtable - Update Record  
**Table:** Presence Operations

---

## 📋 Step-by-Step Zapier Setup

### **Step 1: Connect Stripe Trigger**
1. Choose App: **Stripe**
2. Choose Trigger Event: **Checkout Session Completed**
3. Connect your Stripe account
4. Test trigger to pull sample data

### **Step 2: Add Filter (Optional)**
- Only continue if: `Payment Status` equals `paid`

### **Step 3: Connect Airtable Action**
1. Choose App: **Airtable**
2. Choose Action Event: **Update Record**
3. Connect your Airtable account
4. Select Base: **Presence PWA**
5. Select Table: **Presence Operations**

### **Step 4: Find Record**
**Find Record By:** Transaction ID  
**Value:** `{{Checkout Session ID}}`

*(This assumes Transaction ID field in Airtable already contains the Stripe session ID)*

---

## 🗺️ Field Mappings

| Airtable Field | Zapier Formula | Example Output |
|----------------|----------------|----------------|
| **Payment Status** | `Completed` | Completed |
| **Transaction ID** | `{{Checkout Session ID}}` | cs_test_d1rG... |
| **Amount** | `{{Amount Total / 100}}` | 10.00 |
| **Currency** | `{{Currency | uppercase}}` | USD |
| **Member Email** | `{{Customer Email}}` | sample@email.com |
| **Member Name** | `{{Customer Name}}` | Test User |
| **Payment Date** | `{{Created | date: YYYY-MM-DD}}` | 2025-11-12 |
| **Receipt URL** | `{{Receipt URL}}` | https://stripe.com/receipts/test |

---

## 🧮 Advanced Calculations

### **Host Payout Amount**
```
IF({{Metadata Plan Type}} = "Adhoc", 
   {{Amount Total / 100 * 0.67}}, 
   {{Amount Total / 100 * 0.75}})
```

**Examples:**
- Adhoc ($18): `$18 × 0.67 = $12.06`
- Weekly ($40): `$40 × 0.75 = $30.00`

### **Payout Date** (7 days from payment)
```
{{Created | date_add: 7 days | date: YYYY-MM-DD}}
```

---

## ⚠️ Required Metadata Fields

**IMPORTANT:** Your Stripe Checkout session must include these metadata fields:

```javascript
// When creating Stripe Checkout Session
metadata: {
  plan_type: 'Adhoc',           // or 'Weekly Access'
  member_id: 'recMEMBER123456', // Airtable Record ID
  host_id: 'recHOST789012'      // Airtable Record ID
}
```

**Without metadata, you cannot:**
- Calculate correct host payout percentage
- Link payment to specific member/host records
- Identify plan type

---

## ✅ Testing Your Zap

### **Test Payload** (use in Zapier test mode):
```json
{
  "id": "cs_test_zapier_001",
  "object": "checkout.session",
  "amount_total": 1800,
  "currency": "usd",
  "payment_status": "paid",
  "customer_details": {
    "email": "test@presence.com",
    "name": "Zapier Test"
  },
  "metadata": {
    "plan_type": "Adhoc",
    "member_id": "recTEST123",
    "host_id": "recHOST456"
  },
  "created": 1731402241,
  "receipt_url": "https://stripe.com/receipts/test"
}
```

### **Expected Airtable Update:**
- Payment Status: `Completed`
- Amount: `18.00`
- Host Payout: `12.06` (67% of $18)
- Payout Date: `2025-11-19` (7 days later)

---

## 🔍 Troubleshooting

| Issue | Solution |
|-------|----------|
| Record not found | Ensure Transaction ID exists in Airtable before payment |
| Amount shows 1800 instead of 18.00 | Add `/100` to formula |
| Host payout wrong | Check metadata.plan_type is exactly "Adhoc" or "Weekly Access" |
| Date format error | Use `date: YYYY-MM-DD` formatter |
| Metadata missing | Update Stripe Checkout session creation code |

---

## 📞 Support

**Webhook URL:** `https://hooks.zapier.com/hooks/catch/23865094/uspssek/`  
**Documentation:** See LIVE_PAYLOAD_MAPPING.md for detailed payload structure

---

**Status:** ✅ Ready for configuration
