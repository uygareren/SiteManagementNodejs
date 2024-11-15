const sql = require('mssql');
const dbConfig = require('../config/dbConfig');

class BlockModel {
    static async getBlocks() {
        try {
            const pool = await sql.connect(dbConfig);
            const result = await pool.request().query('SELECT * FROM block');
            return result.recordset;
        } catch (error) {
            throw error;
        }
    }

    static async getBlockById(id) {
        try {
            const pool = await sql.connect(dbConfig);
            const result = await pool.request()
                .input('id', sql.Int, id)
                .query('SELECT * FROM block WHERE id = @id');
            return result.recordset[0];
        } catch (error) {
            throw error;
        }
    }

    static async getBlockBySiteId(siteId) {
        try {
            const pool = await sql.connect(dbConfig);
            const result = await pool.request()
                .input('site_id', sql.Int, siteId)
                .query('SELECT * FROM block WHERE site_id = @site_id');
            return result.recordset;
        } catch (error) {
            throw error;
        }
    }

    static async saveBlock(data) {
        try {
            const pool = await sql.connect(dbConfig);
            const result = await pool.request()
                .input('site_id', sql.Int, data.site_id)
                .input('block_name', sql.NVarChar, data.block_name)
                .input('created_at', sql.DateTime, new Date())
                .query('INSERT INTO block (site_id, block_name, created_at) VALUES (@site_id, @block_name, @created_at)');
            return result.rowsAffected > 0;
        } catch (error) {
            throw error;
        }
    }

    static async updateBlock(id, data) {
        try {
            const pool = await sql.connect(dbConfig);
            const result = await pool.request()
                .input('id', sql.Int, id)
                .input('site_id', sql.Int, data.site_id)
                .input('block_name', sql.NVarChar, data.block_name)
                .input('updated_at', sql.DateTime, new Date())
                .query('UPDATE block SET site_id = @site_id, block_name = @block_name, updated_at = @updated_at WHERE id = @id');
            return result.rowsAffected > 0;
        } catch (error) {
            throw error;
        }
    }

    static async deleteBlock(id) {
        try {
            const pool = await sql.connect(dbConfig);
            const result = await pool.request()
                .input('id', sql.Int, id)
                .query('DELETE FROM block WHERE id = @id');
            return result.rowsAffected > 0;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = BlockModel;
