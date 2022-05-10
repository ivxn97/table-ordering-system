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
//db.run('CREATE TABLE menu(item_name VARCHAR(20), price, quantity INTEGER, pic_URL VARCHAR(100))');
//db.run('CREATE TABLE coupon(coupon_code VARCHAR(20), discount INTEGER)');

//const sql = 'INSERT INTO accounts (first_name, last_name, username, password, profiletype) VALUES(?,?,?,?,?)';
//const sql = 'INSERT INTO customers (email, date, spending, food_order) VALUES(?,?,?,?)';
//const sql = 'INSERT INTO menu (item_name, price, quantity, pic_URL) VALUES(?,?,?,?)';
const sql = 'INSERT INTO coupon (coupon_code, discount) VALUES(?,?)';

// INSERT STATEMENTS FOR ACCOUNTS
// db.run(sql,["Matthew", "Chua", "owner1", "owner123", "owner"], (err) => {
//         if (err) return console.error(err.message);
        
//         console.log("A new account has been added");
// })
// db.run(sql,["Ivan", "Lee", "owner2", "owner123", "owner"], (err) => {
//         if (err) return console.error(err.message);
        
//         console.log("A new account has been added");
// })
// db.run(sql,["Darryl", "Chen", "owner3", "owner123", "owner"], (err) => {
//     if (err) return console.error(err.message);
    
//     console.log("A new account has been added");
// })
// db.run(sql,["Joel", "Tan", "owner4", "owner123", "owner"], (err) => {
//     if (err) return console.error(err.message);
//     console.log("A new account has been added");
// })
// db.run(sql,["Marcus", "Lim", "owner5", "owner123", "owner"], (err) => {
//     if (err) return console.error(err.message);
//     console.log("A new account has been added");
// })
// db.run(sql,["Tyrell", "Lim", "owner6", "owner123", "owner"], (err) => {
//     if (err) return console.error(err.message); 
//     console.log("A new account has been added");
// })
// db.run(sql,["Peiying", "Yin", "owner7", "owner123", "owner"], (err) => {
//     if (err) return console.error(err.message);
//     console.log("A new account has been added");
// })


// INSERT STATEMENTS FOR MENU ITEMS
// db.run(sql,["Salad Bowl", "24.99", "100", "/images/steak.jpg"], (err) => {
//         if (err) return console.error(err.message);
        
//         console.log("A new menu item has been added");
// })

// INSERT STATEMENTS FOR COUPON CODE
db.run(sql,["NEWCODE2022", "20"], (err) => {
        if (err) return console.error(err.message);
        
        console.log("A new menu item has been added");
})


db.close ((err) => {
    if (err) return console.error(err.message);

})