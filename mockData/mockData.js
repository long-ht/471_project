const db = require('../api/database/database.js');

//create worker table
const createWorker = () => {
    try {
        db.serialize(() => {
            db.run(`DROP TABLE IF EXISTS Worker`, (err) => {
                if (err) {
                    throw new Error(err);
                }
            })
            db.run(`create table Worker (Id TEXT NOT NULL, Name TEXT, Username TEXT UNIQUE NOT NULL, Password TEXT NOT NULL, PRIMARY KEY (Id))`, (err) => {
                if (err) {
                    throw new Error(err);
                }
            })
        })
    } catch (err) {
        console.error(err.message);
    }
}

//create manager table
const createManager = () => {
    try {
        db.serialize(() => {

            db.run(`DROP TABLE IF EXISTS Manager`, (err) => {
                if (err) {
                    throw new Error(err);
                }
            })
            db.run(`create table Manager (Id TEXT NOT NULL, Name TEXT, Username TEXT UNIQUE NOT NULL, Password TEXT NOT NULL, PRIMARY KEY (Id))`, (err) => {
                if (err) {
                    throw new Error(err);
                }
            })
        })
    } catch (err) {
        console.error(err.message);
    }
}

//create company table
const createCompany = () => {
    try {
        db.serialize(() => {

            db.run(`DROP TABLE IF EXISTS Company`, (err) => {
                if (err) {
                    throw new Error(err);
                }
            })
            db.run(`create table Company (Name TEXT NOT NULL, Phone INTEGER, Email TEXT, Address TEXT, PRIMARY KEY (Name))`, (err) => {
                if (err) {
                    throw new Error(err);
                }
            })
        })
    } catch (err) {
        console.error(err.message);
    }
}

//create project table
const createProject = () => {
    try {
        db.serialize(() => {

            db.run(`DROP TABLE IF EXISTS Project`, (err) => {
                if (err) {
                    throw new Error(err);
                }
            })
            db.run(`create table Project (Name TEXT NOT NULL, C_name TEXT NOT NULL, Priority INTEGER, Deadline TEXT, PRIMARY KEY (Name), FOREIGN KEY (C_name) REFERENCES Company(Name))`, (err) => {
                if (err) {
                    throw new Error(err);
                }
            })
        })
    } catch (err) {
        console.error(err.message);
    }
}

//create supply table
const createSupply = () => {
    try {
        db.serialize(() => {

            db.run(`DROP TABLE IF EXISTS Supply`, (err) => {
                if (err) {
                    throw new Error(err);
                }
            })
            db.run(`create table Supply (Id TEXT NOT NULL, W_id TEXT NOT NULL, Name TEXT, Quantity INTEGER NOT NULL, Expected INTEGER NOT NULL, PRIMARY KEY (Name), FOREIGN KEY (W_id) REFERENCES Worker(Id))`, (err) => {
                if (err) {
                    throw new Error(err);
                }
            })
        })
    } catch (err) {
        console.error(err.message);
    }
}

//create submission table
const createSubmission = () => {
    try {
        db.serialize(() => {

            db.run(`DROP TABLE IF EXISTS Submission`, (err) => {
                if (err) {
                    throw new Error(err);
                }
            })
            db.run(`create table Submission (Submit_time TEXT NOT NULL, W_id TEXT NOT NULL, M_id TEXT NOT NULL, Quantity INTEGER NOT NULL, FOREIGN KEY (W_id) REFERENCES Worker(Id),FOREIGN KEY (M_id) REFERENCES Manager(Id))`, (err) => {
                if (err) {
                    throw new Error(err);
                }
            })
        })
    } catch (err) {
        console.error(err.message);
    }
}

//create product table
const createProduct = () => {
    try {
        db.serialize(() => {

            db.run(`DROP TABLE IF EXISTS Product`, (err) => {
                if (err) {
                    throw new Error(err);
                }
            })
            db.run(`create table Product (Id TEXT NOT NULL, P_name TEXT NOT NULL, Size INTEGER NOT NULL, Color TEXT NOT NULL, Rate INTEGER NOT NULL, Rattler NUMERIC NOT NULL, PRIMARY KEY(Id), FOREIGN KEY (P_name) REFERENCES Project(Name))`, (err) => {
                if (err) {
                    throw new Error(err);
                }
            })
        })
    } catch (err) {
        console.error(err.message);
    }
}

//create payment table
const createPayment = () => {
    try {
        db.serialize(() => {

            db.run(`DROP TABLE IF EXISTS Payment`, (err) => {
                if (err) {
                    throw new Error(err);
                }
            })
            db.run(`create table Payment (Date_paid TEXT NOT NULL, M_id TEXT NOT NULL, Submit_time TEXT NOT NULL, SW_id TEXT NOT NULL, SM_id TEXT NOT NULL, Amount INTEGER NOT NULL, FOREIGN KEY (M_id) REFERENCES Manager(Id), FOREIGN KEY (Submit_time) REFERENCES Submission(Submit_time), FOREIGN KEY (SW_id) REFERENCES Submission(W_id), FOREIGN KEY (SM_id) REFERENCES Submission(M_id))`, (err) => {
                if (err) {
                    throw new Error(err);
                }
            })
        })
    } catch (err) {
        console.error(err.message);
    }
}


//populate worker table
const populateWorker = () => {
    try {
        db.serialize(() => {
            db.run(`INSERT INTO Worker VALUES(?,?,?,?)`, [`wjfioqwfjqwofiw`, `John Smith`, `johnsmith`, `12345678`], (err) => {
                if (err) {
                    throw new Error(err);
                }
            })
            db.run(`INSERT INTO Worker VALUES(?,?,?,?)`, [`eghwehweehgwefge`, `Jack Jill`, `jackjill`, `12345678`], (err) => {
                if (err) {
                    throw new Error(err);
                }
            })
        })
    } catch (err) {
        console.error(err.message);
    }
}

//populate manager table
const populateManager = () => {
    try {
        db.serialize(() => {
            db.run(`INSERT INTO Manager VALUES(?,?,?,?)`, [`wagfwwwwfw33eee`, `James Potter`, `jamespotter`, `12345678`], (err) => {
                if (err) {
                    throw new Error(err);
                }
            })
        })
    } catch (err) {
        console.error(err.message);
    }
}

//populate company table
const populateCompany = () => {
    try {
        db.serialize(() => {
            db.run(`INSERT INTO Company VALUES(?,?,?,?)`, [`Nice Company`, 4031111111, `nice@gmail.com`, `11 Ave 7`], (err) => {
                if (err) {
                    throw new Error(err);
                }
            })
            db.run(`INSERT INTO Company VALUES(?,?,?,?)`, [`Good Company`, 404222222, `good@gmail.com`, `50 Route 8`], (err) => {
                if (err) {
                    throw new Error(err);
                }
            })
        })
    } catch (err) {
        console.error(err.message);
    }
}
//populate project table
const populateProject = () => {
    try {
        db.serialize(() => {
            db.run(`INSERT INTO Project VALUES(?,?,?,?)`, [`Squishy Toys`, `Good Company`, 1, `2021-08-20`], (err) => {
                if (err) {
                    throw new Error(err);
                }
            })
            db.run(`INSERT INTO Project VALUES(?,?,?,?)`, [`Squeaky Animals`, `Nice Company`, 2, `2021-09-05`], (err) => {
                if (err) {
                    throw new Error(err);
                }
            })
        })
    } catch (err) {
        console.error(err.message);
    }
}

//populate supply table
const populateSupply = () => {
    try {
        db.serialize(() => {
            db.run(`INSERT INTO Supply VALUES(?,?,?,?,?)`, [`gekjk3t`, `wjfioqwfjqwofiw`, `Cotton`, 50, 20], (err) => {
                if (err) {
                    throw new Error(err);
                }
            })
            db.run(`INSERT INTO Supply VALUES(?,?,?,?,?)`, [`geggegf`, `wjfioqwfjqwofiw`, `Fabric`, 80, 20], (err) => {
                if (err) {
                    throw new Error(err);
                }
            })
        })
    } catch (err) {
        console.error(err.message);
    }
}

//populate submission table
const populateSubmission = () => {
    try {
        db.serialize(() => {
            db.run(`INSERT INTO Submission VALUES(?,?,?,?)`, [`2020-12-08 12:10`, `wjfioqwfjqwofiw`, `wagfwwwwfw33eee`, 20], (err) => {
                if (err) {
                    throw new Error(err);
                }
            })
        })
    } catch (err) {
        console.error(err.message);
    }
}
//populate submission table
const populateProduct = () => {
    try {
        db.serialize(() => {
            db.run(`INSERT INTO Product VALUES(?,?,?,?,?,?)`, [`wrwwrw`, `Squishy Toys`, 10, `Red`, 60, `No`], (err) => {
                if (err) {
                    throw new Error(err);
                }
            })
        })
    } catch (err) {
        console.error(err.message);
    }
}

//populate payment table
const populatePayment = () => {
    try {
        db.serialize(() => {
            db.run(`INSERT INTO Payment VALUES(?,?,?,?,?,?)`, [`2020-12-09`, `wagfwwwwfw33eee`, `2020-12-08 12:10`, `wjfioqwfjqwofiw`, `wagfwwwwfw33eee`, 500], (err) => {
                if (err) {
                    throw new Error(err);
                }
            })
        })
    } catch (err) {
        console.error(err.message);
    }
}
const createDatabase = () => {
    createManager();
    createWorker();
    createCompany();
    createProject();
    createSupply();
    createSubmission();
    createProduct();
    createPayment();
}

const populateData = () => {
    populateManager();
    populateWorker();
    populateCompany();
    populateProject();
    populateSupply();
    populateSubmission();
    populateProduct();
}

createDatabase();
populateData();
