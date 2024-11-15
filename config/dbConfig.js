const sql = require('mssql');

const db = {
    user: 'sa',
    password: 'uygar123',
    server: 'UYGAR\\SQLEXPRESS', 
    database: 'SiteManagementDB',
    options: {
        encrypt: true,
        trustServerCertificate: true
    }
};

module.exports = db; 
