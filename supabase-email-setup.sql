-- Create a notification log table to track email notifications
CREATE TABLE IF NOT EXISTS email_notifications (
    id SERIAL PRIMARY KEY,
    safety_call_id INTEGER REFERENCES safety_call_requests(id),
    recipient_email VARCHAR(255) NOT NULL,
    subject VARCHAR(500) NOT NULL,
    message TEXT NOT NULL,
    status VARCHAR(50) DEFAULT 'pending',
    sent_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create a function to log email notifications
CREATE OR REPLACE FUNCTION log_email_notification()
RETURNS TRIGGER AS $$
DECLARE
    product_name TEXT;
    email_subject TEXT;
    email_message TEXT;
BEGIN
    -- Get the product name
    SELECT name INTO product_name 
    FROM insurance_products 
    WHERE id = NEW.product_id;
    
    -- Create email subject and message
    email_subject := format('New Safety Call Request - %s', COALESCE(product_name, 'Insurance Product'));
    
    email_message := format(
        'New Safety Call Request Received

Request ID: %s
Product: %s
Customer Name: %s
Age: %s
Email: %s
Phone: %s

Form Data:
%s

Submitted at: %s

Please review and take appropriate action.',
        NEW.id,
        COALESCE(product_name, 'Unknown'),
        COALESCE(NEW.customer_name, 'Not provided'),
        COALESCE(NEW.age::TEXT, 'Not provided'),
        COALESCE(NEW.email, 'Not provided'),
        COALESCE(NEW.form_data->>'Phone No.', 'Not provided'),
        NEW.form_data,
        NEW.created_at
    );
    
    -- Insert notification record
    INSERT INTO email_notifications (
        safety_call_id,
        recipient_email,
        subject,
        message,
        status
    ) VALUES (
        NEW.id,
        'pkumarswamy007@gmail.com',
        email_subject,
        email_message,
        'pending'
    );
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to log email notifications
CREATE TRIGGER safety_call_email_log_trigger
    AFTER INSERT ON safety_call_requests
    FOR EACH ROW
    EXECUTE FUNCTION log_email_notification();

-- Create a view to see pending email notifications
CREATE OR REPLACE VIEW pending_email_notifications AS
SELECT 
    en.id,
    en.safety_call_id,
    en.recipient_email,
    en.subject,
    en.message,
    en.status,
    en.created_at,
    scr.customer_name,
    scr.product_id,
    ip.name as product_name
FROM email_notifications en
JOIN safety_call_requests scr ON en.safety_call_id = scr.id
LEFT JOIN insurance_products ip ON scr.product_id = ip.id
WHERE en.status = 'pending'
ORDER BY en.created_at DESC; 