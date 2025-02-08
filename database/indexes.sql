-- Indexes ------------------------>

CREATE INDEX idx_orders_customer_id ON orders(customer_id);
CREATE INDEX idx_payments_order_id ON payments(order_id);
CREATE INDEX idx_purchases_order_id ON purchases(order_id);
CREATE INDEX idx_purchases_supplier_id ON purchases(supplier_id);
CREATE INDEX idx_expenses_order_id ON expenses(order_id);