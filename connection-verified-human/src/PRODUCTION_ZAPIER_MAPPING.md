# Production Zapier Field Mapping

## Stripe → Airtable (LIVE Configuration)

This document reflects the **actual production Zapier mapping** currently in use for the Stripe Payment → Airtable Record Zap.

### Field Mappings

| Stripe Field | Airtable Column Name | Data Type | Notes |
|-------------|---------------------|-----------|-------|
| `id` | Transaction ID | Text | Unique Stripe checkout session ID (e.g., `cs_test_...`) |
| `amount_total` | Amount Paid | Number | Amount in cents (e.g., 1000 = $10.00) |
| `currency` | Currency | Text | ISO currency code (AUD, USD, etc.) |
| `payment_status` | Payment Status | Single Select | Values: "paid", "failed", "pending" |
| `customer_details.email` | Customer Email | Email | Member's email address |
| `customer_details.name` | Customer Name | Text | Member's full name |
| `charges.data[0].receipt_url` | Receipt URL | URL | Link to Stripe receipt |
| `created` | Payment Timestamp | Date/Time | Unix timestamp → converted to datetime |
| `balance_transaction` | Payout Transaction ID | Text | Stripe payout reference for reconciliation |

### Airtable Table: "Presence Operations"

Ensure the following columns exist in your Airtable base:

```
- Transaction ID (Single line text)
- Amount Paid (Number, 0 decimal places for cents)
- Currency (Single line text)
- Payment Status (Single select: paid, failed, pending)
- Customer Email (Email)
- Customer Name (Single line text)
- Receipt URL (URL)
- Payment Timestamp (Date with time)
- Payout Transaction ID (Single line text)
```

### Sample Live Payload

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

### Zapier Configuration Steps

1. **Trigger**: Stripe - New Checkout Session Completed
2. **Action**: Airtable - Create Record
3. **Table**: Presence Operations
4. **Field Mapping**: Use the table above

### Host Payout Calculations

After payment is recorded, calculate host payouts:

- **Adhoc Sessions**: 67% of Amount Paid
- **Weekly Subscriptions**: 75% of Amount Paid

Example for $10 payment (1000 cents):
- Adhoc: $6.70 to host
- Weekly: $7.50 to host

### Notes

- Amount is stored in cents (Stripe standard)
- Convert to dollars for display: `amount_total / 100`
- Payment Timestamp is Unix epoch - Zapier auto-converts to datetime
- Receipt URL may be nested in `charges.data[0].receipt_url` or at root level

### Integration Status

✅ **LIVE** - This mapping is currently in production  
🔗 Webhook: `https://hooks.zapier.com/hooks/catch/23865094/uspssek/`
