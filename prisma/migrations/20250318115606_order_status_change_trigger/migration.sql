CREATE OR REPLACE FUNCTION notify_order_status_change()
RETURNS TRIGGER AS $$
BEGIN
    -- Notify the 'order_status_channel' with the updated row data
    PERFORM pg_notify('order_status_channel', row_to_json(NEW)::TEXT);
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger on 'orders' table when 'order_status' changes
CREATE TRIGGER order_status_trigger
AFTER UPDATE OF status ON "Orders"
FOR EACH ROW
WHEN (OLD.status IS DISTINCT FROM NEW.status)  
EXECUTE FUNCTION notify_order_status_change();