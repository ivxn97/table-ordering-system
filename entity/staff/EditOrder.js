// insert http://localhost:3000 into browser address bar
var sqlite3 = require('sqlite3').verbose();
var express = require('express');
var path = require("path");
var bodyParser = require ('body-parser');
var alert = require('alert');
var router = express.Router();

router.use(bodyParser.urlencoded({extended: true}));
router.use(bodyParser.json());
router.use(express.static(path.join(__dirname + '../../public')));
router.use('/img', express.static(__dirname + '../Images'));

//Staff: Order edit
router.post('/', function(req, res){
    var tableNumber = req.body.tableNumber;
    var itemName = req.body.itemName;
    var quantity = req.body.editQty;

    var db = new sqlite3.Database('restaurant.db');
    console.log('Editing ' + tableNumber + ' with item name: ' + itemName);
  
    db.run('UPDATE kitchenorder SET quantity = ? WHERE table_no = ? AND food_order = ?;', [quantity, tableNumber, itemName], function(err) {
        if(err){
            alert("Error editing Quantity")
            console.log(err);
          }
          else{
            alert("Quantity successfully edited");
            console.log("Quantity successfully edited");
          }
    });
  });
  module.exports = router;