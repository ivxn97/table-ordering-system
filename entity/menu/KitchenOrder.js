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
router.use('/img', express.static(__dirname + '../Images'));

// MENU: Push order from cart to kitchenorder
router.post('/', function(req, res){
var tableNo = req.body.tableNo;
var db = new sqlite3.Database('restaurant.db');
console.log('Sending Cart Order to Kitchen Staff');
db.all('INSERT INTO kitchenorder (food_order, quantity) SELECT item_name, quantity FROM cart', function(err,row)
{
    if (err){
        alert('Error in sending order to kitchen')
        console.log(error);
    }
    db.run('UPDATE kitchenorder SET table_no = ? WHERE food_order IS NOT NULL AND table_no IS NULL;',[tableNo], function(err){
      if(err){
        console.log(err);
      }
      db.run('UPDATE kitchenorder SET order_status = ?;',['new order'], function(err){
        if(err){
          console.log(err);
        }
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




module.exports = router;