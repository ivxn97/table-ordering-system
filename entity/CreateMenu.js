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

//Manager: create menu item
router.post('/', function(req, res){
    var itemType = req.body.itemType;
    var itemName = req.body.itemName;
    var itemPrice = req.body.itemPrice;
    var itemID = req.body.itemID;
    var db = new sqlite3.Database('restaurant.db');

    if(itemType == 'food'){
      console.log('Adding food item with name: ' + itemName + ' price: ' + itemPrice  + 'item ID' + itemID);
      db.run('INSERT INTO foodmenu (item_name, item_price, item_id) VALUES(?,?,?)',[itemName, itemPrice, itemID], function(err){
        if(err){
          alert("Error in adding a food menu item");
          console.log(err);
        }
        else{
          alert("Food menu item successfully created");
          console.log("Successful food menu item insertion");
        }
      });
    }
    else if(itemType == 'drink'){
      console.log('Adding drink item with name: ' + itemName + ' price: ' + itemPrice  + 'item ID' + itemID);
      db.run('INSERT INTO drinkmenu (item_name, item_price, item_id) VALUES(?,?,?)',[itemName, itemPrice, itemID], function(err){
        if(err){
          alert("Error in adding a drink menu item");
          console.log(err);
        }
        else{
          alert("Drink menu item successfully created");
          console.log("Successful drink menu item insertion");
        }
      });
    }

  });
  module.exports = router;