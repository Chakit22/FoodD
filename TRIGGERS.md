# Database Triggers Documentation

### Database Configuration Requirements

#### SSL Configuration

Before implementing triggers, ensure your RDS instance is properly configured:

1. **Disable Force SSL**:

   - By default, `rds.force_ssl` is set to 1 (enabled)
   - This needs to be changed to 0 for our trigger notifications to work properly

   Steps to modify:

   1. Go to AWS RDS Console
   2. Navigate to Parameter Groups
   3. Create a new parameter group. Use postgres16 as the same as the default one
   4. Click on the newly created Parameter group
   5. Click on Edit
   6. Find parameter: `rds.force_ssl`
   7. Change value from 1 to 0
   8. Apply the parameter group to your RDS instance
   9. Reboot the instance for changes to take effect

   > **Note**: Disabling SSL should be done with careful consideration of your security requirements. In production environments, consider alternative approaches or additional security measures.

This document explains the database triggers used in the food delivery application for real-time order status notifications.

## Order Status Change Trigger

### Purpose

This trigger automatically notifies relevant parties whenever an order's status changes in the system (e.g., from "Pending" to "Delivered").

### Implementation Details

#### Trigger Function

```sql
CREATE OR REPLACE FUNCTION notify_order_status_change()
RETURNS TRIGGER AS $$
BEGIN
    -- Notify the 'order_status_channel' with the updated row data
    PERFORM pg_notify('order_status_channel', row_to_json(NEW)::TEXT);
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;
```

#### Trigger Definition

```sql
CREATE TRIGGER order_status_trigger
AFTER UPDATE OF status ON "Orders"
FOR EACH ROW
WHEN (OLD.status IS DISTINCT FROM NEW.status)
EXECUTE FUNCTION notify_order_status_change();
```

### How It Works

1. **Activation Conditions**:

   - Triggers AFTER an UPDATE operation
   - Only fires when the 'status' column is updated
   - Only executes when the new status is different from the old status
   - Runs FOR EACH ROW affected by the update

2. **Notification Process**:

   - Converts the entire updated row to JSON format
   - Sends notification through PostgreSQL's notification system
   - Uses channel name: 'order_status_channel'

3. **Data Included**:
   - The entire new row data is sent as JSON
   - Includes order ID, status, and all other order fields

### Use Cases

- Real-time order tracking
- Customer notifications when order status changes
- Dashboard updates for restaurant staff
- Delivery partner notifications

### Technical Notes

1. **Channel Listening**:

   - Applications need to listen on 'order_status_channel' to receive notifications
   - Each notification contains the complete updated order data

2. **Performance Considerations**:

   - Trigger executes only when status actually changes
   - Uses PostgreSQL's built-in notification system
   - Minimal overhead as it runs after the update

3. **Error Handling**:
   - If trigger fails, the original update transaction is not affected
   - Notifications are asynchronous and best-effort delivery

### Related Database Objects

- Table: "Orders"
- Channel: order_status_channel
- Function: notify_order_status_change()

## Example Usage

```sql
-- Example of status update that triggers notification
UPDATE "Orders"
SET status = 'Delivered'
WHERE id = 'order_id';
```

This will automatically:

1. Fire the trigger
2. Convert the updated order to JSON
3. Send notification to all listeners on 'order_status_channel'
