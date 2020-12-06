const db = require('../database/database');
const managerAuth = require('../middleware/auth');
const express = require('express');
const managerRouter = express.Router();

//login route for manager
managerRouter.post('/login', async (req, res) => {
    try {
        const sql = `SELECT * FROM Manager WHERE Username=? AND Password=?`;
        db.get(sql, [req.body.username, req.body.password], (err, row) => {
            if (err || !row) {
                throw new Error;
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

//view all projects
managerRouter.post('/project/view', managerAuth, async (req, res) => {
    try {
        const sql = `SELECT * FROM Project`;
        let result = [];
        db.each(sql, (err, row) => {
            if (err) {
                throw new Error(err);
            }
            result.push({
                name: row.Name,
                c_name: row.C_name,
                priority: row.Priority,
                deadline: row.Deadline,
            });
            res.status(200).send(result);
        });
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
})

//create new project
managerRouter.post('/project/add', managerAuth, async (req, res) => {
    try {
        const sql = `INSERT INTO Project VALUES (?,?,?,?)`;
        db.run(sql, [req.body.name, req.body.c_name, req.body.priority, req.body.deadline], (err) => {
            if (err) {
                throw new Error(err);
            }
            res.status(201).send();
        });
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
})

//view a project's products
managerRouter.post('/project/product/view', managerAuth, async (req, res) => {
    try {
        const sql = `SELECT * FROM Product WHERE P_name=?`;
        let result = [];
        db.each(sql, req.body.p_name, (err, row) => {
            if (err) {
                throw new Error(err);
            }
            result.push({
                id: row.Id,
                p_name: row.P_name,
                size: row.Size,
                color: row.Color,
                rate: row.Rate,
                rattler: row.Rattler
            });
            res.status(200).send(result);
        });
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
})

//add a product to a project
managerRouter.post('/project/product/add', managerAuth, async (req, res) => {
    try {
        const sql = `INSERT INTO Product VALUES(?,?,?,?,?,?)`;
        db.run(sql, [req.body.id, req.body.p_name, req.body.size, req.body.color, req.body.rate, req.body.rattler], (err) => {
            if (err) {
                throw new Error(err);
            }
            res.status(201).send();
        });
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
})

//edit a project info
managerRouter.put('/project/edit', managerAuth, async (req, res) => {
    try {
        const sql = `UPDATE Project SET C_name=?, Priority=?, Deadline=? WHERE Name=?`;
        db.run(sql, [req.body.c_name, req.body.priority, req.body.deadline, req.body.name], (err) => {
            if (err) {
                throw new Error(err);
            }
            res.status(200).send();
        });
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
})

//edit a product info
managerRouter.put('/project/product/edit', managerAuth, async (req, res) => {
    try {
        const sql = `UPDATE Product SET P_name=?, Size=?, Color=?, Rate=?, Rattler=? WHERE Id=?`;
        db.run(sql, [req.body.p_name, req.body.size, req.body.color, req.body.rate, req.body.rattler, req.body.id], (err) => {
            if (err) {
                throw new Error(err);
            }
            res.status(200).send();
        });
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
})

//delete a project and all of its products
managerRouter.delete('/project/remove', managerAuth, async (req, res) => {
    try {
        db.parallelize(() => {
            db.run(`DELETE FROM Project WHERE Name=?`, req.body.name, (err) => {
                if (err) {
                    throw new Error(err);
                }
            });
            db.run(`DELETE FROM Product WHERE P_name=?`, req.body.name, (err) => {
                if (err) {
                    throw new Error(err);
                }
            });
        })
        res.status(204).send();
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
})

//create a worker's account
managerRouter.post('/worker/add', managerAuth, async (req, res) => {
    try {
        db.run(`INSERT INTO Worker VALUES (?,?,?,?)`, [req.body.id, req.body.name, req.body.username, req.body.password], (err) => {
            if (err) {
                throw new Error(err);
            }
        })
        res.status(201).send();
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
})

//remove a worker's account but still keep their submissions and payment history
managerRouter.delete('/worker/remove', managerAuth, async (req, res) => {
    try {
        db.run(`DELETE FROM Worker WHERE Id=?`, req.body.id, (err) => {
            if (err) {
                throw new Error(err);
            }
        })
        res.status(204).send();
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
})

module.exports = managerRouter;