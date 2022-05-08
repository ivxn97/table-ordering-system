// insert http://localhost:3000 into browser address bar
var sqlite3 = require('sqlite3').verbose();
var express = require('express');
var path = require("path");
var bodyParser = require ('body-parser');
var alert = require('alert');
var router = express.Router();

router.use(bodyParser.urlencoded({extended: true}));
router.use(bodyParser.json());
router.use(express.static(path.join(__dirname + '../public')));
router.use('/img', express.static(__dirname + '../Images'));

//Manager: add item to cart
router.post('/', function(req, res){
    var itemName = req.body.name;
    var itemPrice = req.body.price;
    var quantity = req.body.quantity;

    console.log('Adding item with name: ' + itemName + ' price: ' + itemPrice  + ' Quantity: ' + quantity);
    var db = new sqlite3.Database('restaurant.db');
    db.run('INSERT INTO cart (item_name, quantity, price) VALUES(?,?,?)', 
                                                        [itemName, quantity, itemPrice], function(err){
      if(err){
        alert("Error in adding a menu item")
        console.log(err);
      }
      else{
        console.log("Successful menu item insertion");
      }
    });
  });
  module.exports = router;