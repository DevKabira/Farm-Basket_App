require('dotenv').config({ path: '../.env' });
const express = require('express');
const cors = require('cors');
const authRoutes = require('./src/routes/auth');
const errorHandler = require('./src/middleware/errorMiddleware');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());  // Parse JSON requests
app.use('/auth', authRoutes);

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



app.use(errorHandler);  // Error Handler Middleware

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});