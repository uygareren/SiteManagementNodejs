const db = require("../config/dbConfig")
const sql = require('mssql'); 

class SiteModel {
    static async getSites() {
        try {
            const pool = await sql.connect(db);
            const result = await pool.request().query('SELECT * FROM site');
            return result.recordset;
        } catch (error) {
            throw error;
        }
    }

    static async getSiteById(id) {
        try {
            const pool = await sql.connect(db);
            const result = await pool.request().input('id', sql.Int, id).query('SELECT * FROM site WHERE id = @id');
            return result.recordset[0];
        } catch (error) {
            throw error;
        }
    }

    static async saveSite(data) {
        try {
            const pool = await sql.connect(db);
            const result = await pool.request()
                .input('site_name', sql.NVarChar, data.site_name)
                .input('type', sql.NVarChar, data.type)
                .input('created_at', sql.DateTime, new Date())
                .query('INSERT INTO site (site_name, type, created_at) VALUES (@site_name, @type, @created_at)');
            return result.rowsAffected > 0;
        } catch (error) {
            throw error;
        }
    }

    static async updateSite(id, data) {
        try {
            const pool = await sql.connect(db);
            const result = await pool.request()
                .input('id', sql.Int, id)
                .input('site_name', sql.NVarChar, data.site_name)
                .input('type', sql.NVarChar, data.type)
                .input('updated_at', sql.DateTime, new Date())
                .query('UPDATE site SET site_name = @site_name, type = @type, updated_at = @updated_at WHERE id = @id');
            return result.rowsAffected > 0;
        } catch (error) {
            throw error;
        }
    }

    static async deleteSite(id) {
        try {
            const pool = await sql.connect(db);
            const result = await pool.request().input('id', sql.Int, id).query('DELETE FROM site WHERE id = @id');
            return result.rowsAffected > 0;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = SiteModel;
