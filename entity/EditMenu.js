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

//Manager: coupon edit
router.post('/', function(req, res){
  var itemType = req.body.itemType;
  var itemName = req.body.itemName;
  var itemPrice = req.body.itemPrice;
  var itemID = req.body.itemID;
  var db = new sqlite3.Database('restaurant.db');
  console.log('Editing ' + itemType + ' menu item with item ID: ' + itemID);

  if(itemType == 'food'){
    db.run('UPDATE foodmenu SET item_name = COALESCE(item_name, ?), item_price = COALESCE(item_price, ?) WHERE item_id = ?;',[itemName, itemPrice, itemID], function(err){
        if(err){
          alert("Error editing food menu item")
          console.log(err);
        }
        else{node
          alert("Food menu item successfully edited");
          console.log("Food menu item successfully edited");
        }
    });
  } 
  else if(itemType == 'drink'){
    db.run('UPDATE drinkmenu SET item_name = COALESCE(item_name, ?), item_price = COALESCE(item_price, ?) WHERE item_id = ?;',[itemName, itemPrice, itemID], function(err){
      if(err){
        alert("Error editing drink menu item")
        console.log(err);
      }
      else{
        alert("Drink menu item successfully edited");
        console.log("Drink menu item successfully edited");
      }
    });
  }
   
});
module.exports = router;