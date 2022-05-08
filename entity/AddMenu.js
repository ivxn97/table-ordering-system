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

//Manager: add menu item
router.post('/', function(req, res){
    var itemName = req.body.itemName;
    var itemPrice = req.body.itemPrice;
    var itemID = req.body.itemID;

    console.log('Adding item with name: ' + itemName + ' price: ' + itemPrice  + 'item ID' + itemID);
    var db = new sqlite3.Database('restaurant.db');
    db.run('INSERT INTO menu (item_name, item_price, item_id) VALUES(?,?,?)', 
                                                        [itemName, itemPrice, itemID], function(err){
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