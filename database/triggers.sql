-- Triggers --------------------->

CREATE TRIGGER update_customer_timestamp
BEFORE UPDATE ON customers
FOR EACH ROW
EXECUTE FUNCTION update_timestamp();

CREATE TRIGGER update_order_timestamp
BEFORE UPDATE ON orders
FOR EACH ROW
EXECUTE FUNCTION update_timestamp();

CREATE TRIGGER update_supplier_timestamp
BEFORE UPDATE ON suppliers
FOR EACH ROW
EXECUTE FUNCTION update_timestamp();

CREATE TRIGGER update_purchase_timestamp
BEFORE UPDATE ON purchases
FOR EACH ROW
EXECUTE FUNCTION update_timestamp();