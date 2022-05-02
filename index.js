const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./restaurant.db', sqlite3.OPEN_READWRITE, (err)=> {
    if (err) return console.error(err.message);

    console.log("connection successful");

});

/*db.run('DROP TABLE accounts', function(err){
    if(err){
        console.log(err.message)
    }
    console.log('Table deleted')
})

db.run('DROP TABLE customers', function(err){
    if(err){
        console.log(err.message)
    }
    console.log('Table deleted')
})*/

//db.run('CREATE TABLE accounts(first_name,last_name,username,password,profiletype, UNIQUE(username))');
//db.run('CREATE TABLE customers(email UNIQUE, date, spending, food_order, UNIQUE(email))');

const sql = 'INSERT INTO accounts (first_name, last_name, username, password, profiletype) VALUES(?,?,?,?,?)';
//const sql = 'INSERT INTO customers (email, date, spending, food_order) VALUES(?,?,?,?)';


db.run(sql,["Matthew", "Chua", "owner1", "owner123", "owner"], (err) => {
        if (err) return console.error(err.message);
        
        console.log("A new account has been added");
})

db.run(sql,["Ivan", "Lee", "owner2", "owner123", "owner"], (err) => {
        if (err) return console.error(err.message);
        
        console.log("A new account has been added");
})

db.run(sql,["Darryl", "Chen", "owner3", "owner123", "owner"], (err) => {
    if (err) return console.error(err.message);
    
    console.log("A new account has been added");
})

db.run(sql,["Joel", "Tan", "owner4", "owner123", "owner"], (err) => {
    if (err) return console.error(err.message);
    
    console.log("A new account has been added");
})

db.run(sql,["Marcus", "Lim", "owner5", "owner123", "owner"], (err) => {
    if (err) return console.error(err.message);
    
    console.log("A new account has been added");
})

db.run(sql,["Tyrell", "Lim", "owner6", "owner123", "owner"], (err) => {
    if (err) return console.error(err.message);
    
    console.log("A new account has been added");
})

db.run(sql,["Peiying", "Yin", "owner7", "owner123", "owner"], (err) => {
    if (err) return console.error(err.message);
    
    console.log("A new account has been added");
})

db.close ((err) => {
    if (err) return console.error(err.message);

})