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

//Administrator: account creation
router.post('/', function(req, res){
    var itemName = req.body.itemName;
    var itemPrice = req.body.itemPrice;
    var itemQuantity = req.body.itemQuantity;
    var itemURL = req.body.itemURL;

    console.log('Adding item with name: ' + itemName + ' price: ' + itemPrice  + ' quantity: '
                                               + itemQuantity + ' display picture URL: ' + itemURL);
    var db = new sqlite3.Database('restaurant.db');
    db.run('INSERT INTO menu (item_Name, price, quantity, pic_URL) VALUES(?,?,?,?)', 
                                                        [itemName, itemPrice, itemQuantity, itemURL], function(err){
      if(err){
        alert("Error in adding a menu item")
        console.log(err);
      }
      else{
        alert("Menu item successfully created");
        console.log("Successful menu item insertion");
      }
    });
  });
  module.exports = router;