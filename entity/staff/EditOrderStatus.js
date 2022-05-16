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

//Staff: Order status edit
router.post('/', function(req, res){
    var tableNumber = req.body.tableNumber;
    var itemName = req.body.itemName;
    var status = req.body.editStatus;

    var db = new sqlite3.Database('restaurant.db');
    console.log('Editing ' + tableNumber + ' with item name: ' + itemName);
  
    db.run('UPDATE kitchenorder SET order_status = ? WHERE table_no = ? AND food_order = ?;', [status, tableNumber, itemName], function(err) {
        if(err){
            alert("Error editing order status")
            console.log(err);
          }
          else{
            alert("Status successfully edited");
            console.log("Status successfully edited");
          }
    });
  });
  module.exports = router;