const sql = require('mssql');
const db = require('../config/dbConfig');

class UserModel {
    static async findById(id) {
        try {
            const pool = await sql.connect(db);
            const result = await pool
                .request()
                .input('id', sql.Int, id)
                .query('SELECT * FROM users WHERE id = @id');
            return result.recordset[0];
        } catch (error) {
            throw error;
        }
    }

    static async updateFlat(userId, flatId) {
        try {
            const pool = await sql.connect(db);
            const result = await pool
                .request()
                .input('userId', sql.Int, userId)
                .input('flatId', sql.Int, flatId)
                .query('UPDATE users SET flat_id = @flatId WHERE id = @userId');
            return result.rowsAffected > 0;
        } catch (error) {
            throw error;
        }
    }

    static async findByFlatId(flatId) {
        try {
            const pool = await sql.connect(db);
            const result = await pool
                .request()
                .input('flatId', sql.Int, flatId)
                .query('SELECT * FROM users WHERE flat_id = @flatId');
            return result.recordset[0];
        } catch (error) {
            throw error;
        }
    }

    static async findByFilters(minAge, maxAge, startDate, endDate) {
        try {
            const pool = await sql.connect(db);
    
            let query = `SELECT * FROM Users WHERE 1=1`;
            const params = {};
    
            if (minAge) {
                query += ` AND age >= @minAge`;
                params.minAge = minAge;
            }
            if (maxAge) {
                query += ` AND age <= @maxAge`;
                params.maxAge = maxAge;
            }
            if (startDate) {
                query += ` AND created_at >= @startDate`;
                params.startDate = startDate;
            }
            if (endDate) {
                query += ` AND created_at <= @endDate`;
                params.endDate = endDate;
            }
    
            const request = pool.request();
    
            for (const [key, value] of Object.entries(params)) {
                if (key === 'startDate' || key === 'endDate') {
                    request.input(key, sql.Date, value); 
                } else {
                    request.input(key, sql.Int, value);
                }
            }
    
            const result = await request.query(query);
    
            return result.recordset; 
        } catch (error) {
            throw error;
        }
    }
    
}

module.exports = UserModel;
