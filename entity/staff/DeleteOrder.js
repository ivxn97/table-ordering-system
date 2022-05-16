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

//Staff: delete item in order
router.post('/', function(req, res){
    var tableNumber = req.body.tableNumber;
    var itemName = req.body.itemName;
  
    console.log('Deleting ' + itemName + ' from table ' + tableNumber);
    var db = new sqlite3.Database('./restaurant.db');
    db.run('DELETE FROM kitchenorder WHERE table_no LIKE ? AND food_order LIKE ?', [tableNumber, itemName], function(err){
      if(err){
        console.log(err);
      }
      else{
        alert("Food item successfully deleted");
        console.log("Food item successfully deleted");
      }
    });
  });
  module.exports = router;