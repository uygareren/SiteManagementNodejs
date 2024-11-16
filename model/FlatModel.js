const db = require("../config/dbConfig");
const sql = require("mssql");

class FlatModel {
    static async getAllFlats() {
        try {
            const pool = await sql.connect(db);
            const result = await pool.request().query("SELECT * FROM Flat");
            return result.recordset;
        } catch (error) {
            throw error;
        }
    }

    static async getFlatById(id) {
        try {
            const pool = await sql.connect(db);
            const result = await pool.request()
                .input("id", sql.Int, id)
                .query("SELECT * FROM Flat WHERE id = @id");
            return result.recordset[0];
        } catch (error) {
            throw error;
        }
    }

    static async saveFlat(data) {
        try {
            const pool = await sql.connect(db);
            const result = await pool.request()
                .input("block_id", sql.Int, data.block_id)
                .input("flat_no", sql.NVarChar, data.flat_no)
                .input("room_number", sql.Int, data.room_number)
                .input("created_at", sql.DateTime, new Date())
                .query(
                    "INSERT INTO Flat (block_id, flat_no, room_number, created_at) VALUES (@block_id, @flat_no, @room_number, @created_at)"
                );
            return result.rowsAffected > 0;
        } catch (error) {
            throw error;
        }
    }

    static async updateFlat(id, data) {
        try {
            const pool = await sql.connect(db);
            const result = await pool.request()
                .input("id", sql.Int, id)
                .input("block_id", sql.Int, data.block_id)
                .input("flat_no", sql.NVarChar, data.flat_no)
                .input("room_number", sql.Int, data.room_number)
                .input("updated_at", sql.DateTime, new Date())
                .query(
                    "UPDATE Flat SET block_id = @block_id, flat_no = @flat_no, room_number = @room_number, updated_at = @updated_at WHERE id = @id"
                );
            return result.rowsAffected > 0;
        } catch (error) {
            throw error;
        }
    }

    static async deleteFlat(id) {
        try {
            const pool = await sql.connect(db);
            const result = await pool.request()
                .input("id", sql.Int, id)
                .query("DELETE FROM Flat WHERE id = @id");
            return result.rowsAffected > 0;
        } catch (error) {
            throw error;
        }
    }

    static async getFlatsByBlockId(block_id) {
        try {
            const pool = await sql.connect(db);
            const result = await pool.request()
                .input("block_id", sql.Int, block_id)
                .query("SELECT * FROM Flat WHERE block_id = @block_id");
            return result.recordset;
        } catch (error) {
            throw error;
        }
    }

    static async getFlatByBlockAndFlatNo(block_id, flat_no) {
        try {
            const pool = await sql.connect(db);
            const result = await pool.request()
                .input("block_id", sql.Int, block_id)
                .input("flat_no", sql.NVarChar, flat_no)
                .query("SELECT * FROM Flat WHERE block_id = @block_id AND flat_no = @flat_no");
            return result.recordset[0]; 
        } catch (error) {
            throw error;
        }
    }
}

module.exports = FlatModel;
