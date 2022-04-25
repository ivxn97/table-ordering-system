const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./restaurant.db', sqlite3.OPEN_READWRITE, (err)=> {
    if (err) return console.error(err.message);

    console.log("connection successful");

});

// db.run('CREATE TABLE accounts(first_name, last_name, username, password, role)');
db.run('CREATE TABLE customers(email, date, spending, food_order)');

// const sql = 'INSERT INTO accounts (first_name, last_name, username, password, role) VALUES(?,?,?,?,?)';
const sql = 'INSERT INTO customers (email, date, spending, food_order) VALUES(?,?,?,?)';


/*db.run(sql,["Matthew", "Chua", "owner1", "owner123", "owner"], (err) => {
        if (err) return console.error(err.message);
        
        console.log("A new account has been added");
}) */

db.close ((err) => {
    if (err) return console.error(err.message);

})