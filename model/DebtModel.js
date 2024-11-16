const sql = require('mssql');
const db = require('../config/dbConfig');

class DebtModel {
    static async create(data) {
        try {
            const pool = await sql.connect(db);
            const result = await pool
                .request()
                .input('adminId', sql.Int, data.admin_id)
                .input('userId', sql.Int, data.user_id)
                .input('amount', sql.Decimal, data.amount)
                .input('deadline', sql.DateTime, data.deadline)
                .input('createdAt', sql.DateTime, new Date())
                .query(
                    'INSERT INTO Debt (admin_id, user_id, amount, deadline, created_at) VALUES (@adminId, @userId, @amount, @deadline, @createdAt)'
                );
            return result.rowsAffected > 0;
        } catch (error) {
            throw error;
        }
    }
    static async findByUserId(user_id) {
        try {
            const pool = await sql.connect(db);
            const result = await pool.request()
                .input("user_id", sql.Int, user_id)
                .query("SELECT * FROM Debt WHERE user_id = @user_id");
            return result.recordset[0];
        } catch (error) {
            throw error;
        }
    }

    static async updateAmount(debt_id, newAmount) {
        try {
            const pool = await sql.connect(db);
            const result = await pool.request()
                .input("debt_id", sql.Int, debt_id)
                .input("amount", sql.Float, newAmount) 
                .query(
                    "UPDATE Debt SET amount = @amount WHERE id = @debt_id"
                );
            return result.rowsAffected > 0; 
        } catch (error) {
            throw error;
        }
    }

    static async deleteDebt(debt_id) {
        try {
            const pool = await sql.connect(db);
            const result = await pool.request()
                .input("debt_id", sql.Int, debt_id)
                .query(
                    "DELETE FROM Debt WHERE id = @debt_id"
                );
            return result.rowsAffected > 0; 
        } catch (error) {
            throw error;
        }
    }
    
}

module.exports = DebtModel;
