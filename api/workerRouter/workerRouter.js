const db = require('../database/database');
const workerAuth = require('../middleware/workerAuth.js');
const express = require('express');
const workerRouter = express.Router();

//login route for worker
workerRouter.post('/login', async (req, res) => {
    try {
        const sql = `SELECT * FROM Worker WHERE Username=? AND Password=?`;
        console.log(req.body);
        db.get(sql, [req.body.username, req.body.password], (err, row) => {
            if (err || row == null) {
                return res.status(400).send({ error: `Invalid credentials` });
            }
            const user = {
                id: row.Id,
                name: row.Name
            };
            res.status(200).send(user);
        });
    } catch (err) {
        res.status(400).send({ error: `Invalid credentials` });
    }
})

//view worker's info
workerRouter.post('/info', workerAuth, async (req, res) => {
    res.status(200).send(req.user);
})

//view worker's supply
workerRouter.post('/supply', workerAuth, async (req, res) => {
    try {
        const sql = `SELECT * FROM Supply WHERE W_id=?`;
        let result = [];
        db.all(sql, [req.user.id], (err, rows) => {
            if (err) {
                return res.status(500).send({ error: err.message });
            }
            rows.forEach((row) => {
                result.push({
                    id: row.Id,
                    w_id: row.W_id,
                    name: row.Name,
                    quantity: row.Quantity,
                    expected: row.Expected
                })
            })
            res.status(200).send(result);
        });
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
})


//view worker's submissions
workerRouter.post('/submission', workerAuth, async (req, res) => {
    try {
        const sql = `SELECT * FROM Submission WHERE W_id=?`;
        let result = [];
        db.all(sql, [req.user.id], (err, rows) => {
            if (err) {
                return res.status(500).send({ error: err.message });
            }
            rows.forEach((row) => {
                result.push({
                    submit_time: row.Submit_time,
                    w_id: row.W_id,
                    m_id: row.M_id,
                    quantity: row.Quantity
                })
            })
            res.status(200).send(result);
        });
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
})

//view worker payment
workerRouter.post('/payment', workerAuth, async (req, res) => {
    try {
        const sql = `SELECT * FROM Payment WHERE SW_id=?`;
        let result = [];
        db.all(sql, [req.user.id], (err, rows) => {
            if (err) {
                return res.status(500).send({ error: err.message });
            }
            rows.forEach(row => {
                result.push({
                    date_paid: row.Date_paid,
                    amount: row.Amount
                });
            })
            res.status(200).send(result);
        });
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
})

module.exports = workerRouter;