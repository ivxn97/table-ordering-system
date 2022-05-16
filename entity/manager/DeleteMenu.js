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

//Manager: menu deletion
router.post('/', function(req, res){
  var itemType = req.body.itemType;
  var itemID = req.body.itemID;

  console.log('Deleting menu with ID:' + itemID + ' from table:' + itemType);
  var db = new sqlite3.Database('./restaurant.db');

  if(itemType == 'food'){
    db.run('DELETE FROM foodmenu WHERE item_id LIKE ?', [itemID], function(err){
      if(err){
        console.log(err);
      }
      else{
        alert("Food menu item successfully deleted");
        console.log("Successful food menu item deletion");
      }
    });
  }
  else if(itemType == 'drink'){
    db.run('DELETE FROM drinkmenu WHERE item_id LIKE ?', [itemID], function(err){
      if(err){
        console.log(err);
      }
      else{
        alert("Drink menu item successfully deleted");
        console.log("Successful drink menu item deletion");
      }
    });
  }

});
module.exports = router;