CREATE TABLE users (
	id SERIAL PRIMARY KEY,
	email VARCHAR(255) UNIQUE NOT NULL,
	password TEXT NOT NULL,
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE customers (
	id SERIAL PRIMARY KEY,
	name VARCHAR(255) NOT NULL,
	phone VARCHAR(20) UNIQUE NOT NULL,
	email VARCHAR(255) UNIQUE,
	address TEXT,
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
);

CREATE TYPE order_status AS ENUM('Pending', 'Cancelled', 'Completed');

CREATE TABLE orders (
	id SERIAL PRIMARY KEY,
	customer_id INT REFERENCES customers(id) ON DELETE CASCADE,
	quantity INT NOT NULL,
	rate DECIMAL(10, 2) NOT NULL,
	total_amount DECIMAL(10,2) NOT NULL,
	CHECK (total_amount = quantity::DECIMAL * rate),
	outstanding_amount DECIMAL(10, 2) NOT NULL,
	status order_status DEFAULT 'Pending',
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
);

CREATE TYPE payment_method AS ENUM('Cash', 'Bank Transfer', 'UPI');

CREATE TABLE payments (
	id SERIAL PRIMARY KEY,
	order_id INT REFERENCES orders(id) ON DELETE CASCADE,
	amount_paid DECIMAL(10, 2) NOT NULL,
	payment_type payment_method DEFAULT 'Cash' NOT NULL, 
	payment_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP

);

CREATE TABLE suppliers (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) UNIQUE NOT NULL,
    contact_person VARCHAR(255),
    phone VARCHAR(20) NOT NULL,
    email VARCHAR(255) UNIQUE,
    address TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
);

CREATE TYPE purchase_status AS ENUM('Pending', 'Paid', 'Cancelled');

CREATE TABLE purchases (
    id SERIAL PRIMARY KEY,
    order_id INT REFERENCES orders(id) ON DELETE CASCADE,
    supplier_id INT REFERENCES suppliers(id) ON DELETE CASCADE,
    quantity INT NOT NULL,
    rate DECIMAL(10,2) NOT NULL,
    total_amount DECIMAL(10,2) NOT NULL,
	CHECK (total_amount = quantity * rate),
	status purchase_status DEFAULT 'Pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
);


CREATE TABLE expenses (
    id SERIAL PRIMARY KEY,
    order_id INT REFERENCES orders(id) ON DELETE SET NULL,
    description TEXT NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    category VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE chicken_rates (
	id SERIAL PRIMARY KEY, 
	rate DECIMAL(10, 2) NOT NULL,
	quantity_unit VARCHAR(50) DEFAULT 'Per Chick',
	date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);






