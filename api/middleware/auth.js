const db = require('../database/database');

//Authorization middleware
const workerAuth = async (req, res, next) => {
    try {
        const sql = `SELECT * FROM Worker WHERE Id=?`;
        const id = req.header('Authorization');
        const user = {};
        db.get(sql, [id], (err, row) => {
            if (err || !row) {
                throw new Error;
            }
            user.id = row.id;
            user.name = row.name;
        });
        req.user = user;
        next();
    } catch (err) {
        res.status(401).send('Authentication Error');
    }
}

const managerAuth = async (req, res, next) => {
    try {
        const sql = `SELECT * FROM Manager WHERE Id=?`;
        const id = req.header('Authorization');
        const user = {};
        db.get(sql, [id], (err, row) => {
            if (err || !row) {
                throw new Error;
            }
            user.id = row.id;
            user.name = row.name;
        });
        req.user = user;
        next();
    } catch (err) {
        res.status(401).send('Authentication Error');
    }
}

module.exports = workerAuth;
module.exports = managerAuth;