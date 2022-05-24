// insert http://localhost:3000 into browser address bar
var sqlite3 = require('sqlite3').verbose();
var express = require('express');
var path = require("path");
var bodyParser = require ('body-parser');
var alert = require('alert');
const { table } = require('console');
var router = express.Router();

router.use(bodyParser.urlencoded({extended: true}));
router.use(bodyParser.json());
router.use(express.static(path.join(__dirname + '../../public')));
router.use('/img', express.static(__dirname + '../../public/Images'));

//Date formatting
let dateFormat = new Date();
//adjust 0 before single digit date
let date = ("0" + dateFormat.getDate()).slice(-2);
//current month
let month = ("0" + (dateFormat.getMonth() +1)).slice(-2);
//current year
let year = dateFormat.getFullYear();

// MENU: Push order from cart to kitchenorder
router.post('/', function(req, res){
var email = req.body.email;
var tableNo = req.body.tableNo;
var dateFinal = (year + "-" + month + "-" + date);

var db = new sqlite3.Database('restaurant.db');
console.log('Sending Cart Order to Kitchen Staff');

// Copy from table cart to kitchenorder
db.all('INSERT INTO kitchenorder (food_order, quantity) SELECT item_name, quantity FROM cart', function(err,row)
{
    if (err){
        alert('Error in sending order to kitchen')
        console.log(error);
    }
    // Set table number
    db.run('UPDATE kitchenorder SET table_no = ? WHERE food_order IS NOT NULL AND table_no IS NULL;',[tableNo], function(err){
      if(err){
        console.log(err);
      }
      // Set order status
      db.run('UPDATE kitchenorder SET order_status = ?;',['new order'], function(err){
        if(err){
          console.log(err);
        }
        // Get total amount from cart
        db.get('SELECT SUM(quantity * price) AS TOTAL FROM cart;', function (err,row){
          console.log(row);
          var spending = row.TOTAL;
          if(err){
            console.log(err);
          }
          // Get most ordered item from cart by using quantity 
          db.get('SELECT item_name FROM cart GROUP BY item_name ORDER BY quantity DESC LIMIT 1;', function (err,row) {
            console.log(row);
            var food_order = row.item_name;
            if (err){
              console.log(err);
            }
            // Insert data into table customer
            db.all('INSERT INTO customer (email, date, spending, food_order) VALUES(?,?,?,?)', [email, dateFinal, spending, food_order], function (err){
              if (err){
                console.log(err)
              }
              // Render checkoutSuccess page
              db.all("SELECT * FROM cart", (error, rows) => {
                if (error){
                    console.log(error);
                }
                res.render('checkoutSuccess', {cart: rows});
                });
              });
            });
          });
        });
    });
});
});
module.exports = router;