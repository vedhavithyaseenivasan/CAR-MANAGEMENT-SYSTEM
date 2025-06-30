const express = require('express');
const querystring = require('querystring');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
const PORT = 3001;

app.use(cors()); // Enable CORS

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'praveena@19',
    database: 'praveena',
    port: 3306
});

db.connect(err => {
    if (err) {
        console.error('Error connecting to MySQL :', err);
    } else {
        console.log('Connected to MySQL!');
    }
});

// Create customers table if not exists
db.query(`
    CREATE TABLE IF NOT EXISTS customers (
        customerId INT AUTO_INCREMENT PRIMARY KEY,
        customerName VARCHAR(255) NOT NULL,
        customerMobile VARCHAR(15) NOT NULL,
        customerAddress VARCHAR(255) NOT NULL,
        carId VARCHAR(20),
        serviceId VARCHAR(20),
        serviceStartDate DATE,
        serviceEndDate DATE,
        loanno VARCHAR(20),
        loanid VARCHAR(20)
    );
`, (err, result) => {
    if (err) {
        console.error('Error creating customers table:', err);
    } else {
        console.log("Table 'customers' created or already exists.");
    }
});

// Insert a new customer
app.post('/insert', (req, res) => {
    let query = '';

    req.on('data', chunk => {
        query += chunk;
    });

    req.on('end', () => {
        res.writeHead(200, { 'Content-Type': 'text/html' });

        let queryObj = querystring.parse(query);

        const insertQuery = `INSERT INTO customers (customerName, customerMobile, customerAddress, carId, serviceId, serviceStartDate, serviceEndDate, loanno, loanid) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;

        const values = [
            queryObj.customerName,
            queryObj.customerMobile,
            queryObj.customerAddress,
            queryObj.carId,
            queryObj.serviceId,
            queryObj.serviceStartDate,
            queryObj.serviceEndDate,
            queryObj.loanno,
            queryObj.loanid
        ];

        db.query(insertQuery, values, (err, result) => {
            if (err) {
                console.error('Error inserting into customers table:', err);
                res.end(`Error inserting into customers table: ${err}`);
            } else {
                res.end('Inserted into customers table!');
                console.log('Inserted into customers table:', result);
            }
        });
    });
});

// Update an existing customer
app.post('/update', (req, res) => {
    let query = '';

    req.on('data', chunk => {
        query += chunk;
    });

    req.on('end', () => {
        console.log('Received update request:', query);

        res.writeHead(200, { 'Content-Type': 'text/html' });

        let queryObj = querystring.parse(query);

        let setClause = '';

        for (const key in queryObj) {
            if (Object.hasOwnProperty.call(queryObj, key)) {
                if (queryObj[key] !== '' && key !== 'customerIdUpdate') {
                    if (setClause === '') {
                        setClause += `${key}='${queryObj[key]}'`;
                    } else {
                        setClause += `, ${key}='${queryObj[key]}'`;
                    }
                }
            }
        }

        let updateQuery = `UPDATE customers SET ${setClause} WHERE customerId=${queryObj['customerIdUpdate']}`;
        console.log('Generated SQL Update Query:', updateQuery);

        db.query(updateQuery, (err, result) => {
            if (err) {
                console.error('Error updating row in customers table:', err);
                res.end(`Error updating row in customers table: ${err}`);
            } else {
                res.end('Updated row in customers table!');
                console.log('Updated row in customers table:', result);
            }
        });
    });
});

// Select all customers
app.get('/select', (req, res) => {
    db.query('SELECT * FROM customers;', (err, result) => {
        if (err) {
            console.error('Error getting data from customers table:', err);
            res.status(500).send(`Error getting data from customers table: ${err}`);
        } else {
            res.status(200).json(result);
            console.log('Data selected from customers table:', result);
        }
    });
});

// Server start
app.listen(PORT, () =>
    console.log(`Server Running on http://localhost:${PORT}`)
);
