const pool = require('../db/db');

const runTransaction = async (callback) => {
    const client = await pool.connect();
    try {
        await client.query('BEGIN'); // START TRANSACTION
        const result = await callback(client);
        await client.query('COMMIT'); //COMMIT TRANSACTION
        return result;
    } catch (error) {
        await client.query('ROLLBACK'); // ROLLBACK ON ERROR
        throw error;
    } finally {
        client.release();
    }
};

module.exports = { runTransaction };