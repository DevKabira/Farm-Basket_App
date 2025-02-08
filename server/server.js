require('dotenv').config({ path: '../.env' });
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());  // Parse JSON requests

// Routes
const UserRoutes = require('./src/routes/users');
app.use('/api/users', UserRoutes);

const CustomerRoutes = require('./src/routes/customers');
app.use('/api/customers', CustomerRoutes);

const OrderRoutes = require('./src/routes/orders');
app.use('/api/orders', OrderRoutes);

const PaymentRoutes = require('./src/routes/payments');
app.use('/api/payments', PaymentRoutes);

const SupplierRoutes = require('./src/routes/suppliers');
app.use('/api/suppliers', SupplierRoutes);

const PurchaseRoutes = require('./src/routes/purchases');
app.use('/api/purchases', PurchaseRoutes);

const ExpenseRoutes = require('./src/routes/expenses');
app.use('/api/expenses', ExpenseRoutes);

const ChickenRateRoutes = require('./src/routes/chickenRates');
app.use('/api/chicken-rates/', ChickenRateRoutes);

// Test route
app.get('/', (req, res) => {
    res.send('Farm Basket API is running...');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});