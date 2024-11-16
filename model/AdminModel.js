const sql = require('mssql');
const db = require('../config/dbConfig');

class AdminModel {
    static async findById(id) {
        try {
            const pool = await sql.connect(db);
            const result = await pool
                .request()
                .input('id', sql.Int, id)
                .query('SELECT * FROM admin WHERE id = @id');
            return result.recordset[0];
        } catch (error) {
            throw error;
        }
    }
}

module.exports = AdminModel;
