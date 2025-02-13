const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = require('../db/db');

const router = express.Router();

router.post("/login", async (req, res, next) => {
    const { email, password } = req.body;
    // console.log("Login attempt for email:", email);

    try {
        const admin = await pool.query("SELECT * FROM users WHERE email = $1", [email]);

        if (admin.rows.length === 0) {
            console.log("Admin not found for email:", email);
            return res.status(401).json({ message: "Invalid email or password" });
        }

        // console.log("Admin found:", admin.rows[0]);

        const validPassword = await bcrypt.compare(password, admin.rows[0].password);
        // console.log("Password match:", validPassword);

        if (!validPassword) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        const token = jwt.sign({ id: admin.rows[0].id, email: admin.rows[0].email }, process.env.JWT_SECRET, { expiresIn: "1h" });

        res.json({ token });
    } catch (error) {
        console.error("Login error:", error);
        next(error);
    }
});

module.exports = router;