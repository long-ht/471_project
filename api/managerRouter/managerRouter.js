const db = require('../database/database');
const managerAuth = require('../middleware/managerAuth.js');
const express = require('express');
const managerRouter = express.Router();

//login route for manager
managerRouter.post('/login', async (req, res) => {
    try {
        const sql = `SELECT * FROM Manager WHERE Username=? AND Password=?`;
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

//view all projects
managerRouter.post('/project/view', managerAuth, async (req, res) => {
    try {
        const sql = `SELECT * FROM Project`;
        let result = [];
        db.all(sql, (err, rows) => {
            if (err) {
                return res.status(500).send({ error: err.message });
            }
            rows.forEach(row => {
                result.push({
                    name: row.Name,
                    c_name: row.C_name,
                    priority: row.Priority,
                    deadline: row.Deadline,
                });
            })
            res.status(200).send(result);
        });
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
})

//add new company
managerRouter.post('/company/add', managerAuth, async (req, res) => {
    try {
        const sql = `INSERT INTO Company VALUES (?,?,?,?)`;
        db.run(sql, [req.body.name, req.body.phone, req.body.email, req.body.address], (err) => {
            if (err) {
                return res.status(500).send({ error: err.message });
            }
            res.status(201).send();
        });
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
})

//view all company
managerRouter.post('/company/view', managerAuth, async (req, res) => {
    try {
        const sql = `SELECT * FROM Company`;
        let result = [];
        db.all(sql, (err, rows) => {
            if (err) {
                return res.status(500).send({ error: err.message });
            }
            rows.forEach(row => {
                result.push({
                    name: row.Name,
                    phone: row.Phone,
                    email: row.Email,
                    address: row.Address,
                });
            })
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
                return res.status(500).send({ error: err.message });
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
        db.all(sql, req.body.p_name, (err, rows) => {
            if (err) {
                return res.status(500).send({ error: err.message });
            }
            rows.forEach(row => {
                result.push({
                    id: row.Id,
                    p_name: row.P_name,
                    size: row.Size,
                    color: row.Color,
                    rate: row.Rate,
                    rattler: row.Rattler
                });
            })
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
                return res.status(500).send({ error: err.message });
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
                return res.status(500).send({ error: err.message });
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
                return res.status(500).send({ error: err.message });
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
                    return res.status(500).send({ error: err.message });
                }
            });
            db.run(`DELETE FROM Product WHERE P_name=?`, req.body.name, (err) => {
                if (err) {
                    return res.status(500).send({ error: err.message });
                }
                res.status(204).send();
            });
        })
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
})

//create a worker's account
managerRouter.post('/worker/add', managerAuth, async (req, res) => {
    try {
        db.run(`INSERT INTO Worker VALUES (?,?,?,?)`, [req.body.id, req.body.name, req.body.username, req.body.password], (err) => {
            if (err) {
                return res.status(500).send({ error: err.message });
            }
            res.status(201).send();
        })
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
})

//remove a worker's account but still keep their submissions and payment history
managerRouter.delete('/worker/remove', managerAuth, async (req, res) => {
    try {
        db.run(`DELETE FROM Worker WHERE Id=?`, req.body.id, (err) => {
            if (err) {
                return res.status(500).send({ error: err.message });
            }
            res.status(204).send();
        })
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
})

//edit a worker's info
managerRouter.put('/worker/edit', managerAuth, async (req, res) => {
    try {
        const sql = `UPDATE Worker SET Name=?, Username=?, Password=? WHERE Id=?`;
        db.run(sql, [req.body.name, req.body.username, req.body.password, req.body.id], (err) => {
            if (err) {
                return res.status(500).send({ error: err.message });
            }
            res.status(200).send();
        });
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
})

//add payment
managerRouter.post('/payment/add', managerAuth, async (req, res) => {
    try {
        const sql = `INSERT INTO Payment VALUES (?,?,?,?,?,?)`;
        db.run(sql, [req.body.date_paid, req.user.id, req.body.submit_time, req.body.SW_id, req.body.SM_id, req.body.amount], (err) => {
            if (err) {
                return res.status(500).send({ error: err.message });
            }
            res.status(201).send();
        });
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
})

//view payment
managerRouter.post('/payment/view', managerAuth, async (req, res) => {
    try {
        const sql = `SELECT * FROM Payment`;
        let result = [];
        db.all(sql, (err, rows) => {
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

//Add task
managerRouter.post('/supply/add', managerAuth, async (req, res) => {
    try {
        const sql = `INSERT INTO Supply VALUES (?,?,?,?,?)`;
        db.run(sql, [req.body.id, req.body.w_id, req.body.name, req.body.quantity, req.body.expected], (err) => {
            if (err) {
                return res.status(500).send({ error: err.message });
            }
            res.status(201).send();
        });
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
})

//Add Submission
managerRouter.post('/submission/add', managerAuth, async (req, res) => {
    try {
        const sql = `INSERT INTO Submission VALUES (?,?,?,?)`;
        db.run(sql, [req.body.submit_time, req.body.w_id, req.user.id, req.body.quantity], (err) => {
            if (err) {
                return res.status(500).send({ error: err.message });
            }
            res.status(201).send();
        });
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
})

//Edit Submission
managerRouter.put('/submission/edit', managerAuth, async (req, res) => {
    try {
        const sql = `UPDATE Submission SET Quantity=? WHERE W_id=? AND M_id=? AND Submit_time=?`;
        db.run(sql, [req.body.quantity, req.body.w_id, req.user.id, req.body.submit_time], (err) => {
            if (err) {
                return res.status(500).send({ error: err.message });
            }
            res.status(200).send();
        });
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
})

//Remove Submission
managerRouter.delete('/submission/remove', managerAuth, async (req, res) => {
    try {
        db.run(`DELETE FROM Submission WHERE W_id=? AND M_id=? AND Submit_time=?`, [req.body.w_id, req.user.id, req.body.submit_time], (err) => {
            if (err) {
                return res.status(500).send({ error: err.message });
            }
            res.status(204).send();
        })
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
})

module.exports = managerRouter;