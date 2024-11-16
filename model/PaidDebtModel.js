const sql = require('mssql');
const db = require('../config/dbConfig');

class PaidDebtModel {
    static async insert(data) {
        try {
            const pool = await sql.connect(db);
            const result = await pool
                .request()
                .input('adminId', sql.Int, data.admin_id)
                .input('userId', sql.Int, data.user_id)
                .input('amount', sql.Decimal, data.amount)
                .input('createdAt', sql.DateTime, new Date())
                .query('INSERT INTO Paid_debt (admin_id, user_id, amount, created_at) VALUES (@adminId, @userId, @amount, @createdAt)');
            return result.rowsAffected > 0;
        } catch (error) {
            throw error;
        }
    }

    static async findByUserId(user_id) {
        try {
            const pool = await sql.connect(db);
            const result = await pool
                .request()
                .input('userId', sql.Int, user_id)
                .query('SELECT * FROM Paid_debt WHERE user_id = @userId');
            return result.recordset;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = PaidDebtModel;
