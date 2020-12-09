const db = require('../database/database');

//Manager authorization middleware
const managerAuth = async (req, res, next) => {
    try {
        const sql = `SELECT * FROM Manager WHERE Id=?`;
        const id = req.headers.authorization.replace('Bearer ', '');
        db.get(sql, [id], (err, row) => {
            if (err || row == null) {
                return res.status(401).send('Authentication Error');
            }
            req.user = {};
            req.user.id = row.Id;
            req.user.name = row.Name;
            next();
        });
    } catch (err) {
        res.status(401).send('Authentication Error');
    }
}
module.exports = managerAuth;