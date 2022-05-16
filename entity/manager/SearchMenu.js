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

// Manager: Menu Item search
router.post('/', (req, res) => {
  var itemType = req.body.itemType;
  var itemID = req.body.itemID;

  console.log('Searching menu with ID:' + itemID + ' from table:' + itemType);
  var db = new sqlite3.Database('./restaurant.db');

  if(itemType == 'food'){
    db.get("SELECT * FROM foodmenu WHERE item_id = ?", [itemID], (error, rows) => {
          if (error){
            console.log(error);
          }
          res.render('searchFoodMenuItem', {foodmenu: rows}, function(err,html) {
          if (err) {
            alert("Error in finding food menu item ");
            console.log(err);
          }
          else {
            res.send(html);
          }
          });
      });
  }
  else if(itemType == 'drink'){
    db.get("SELECT * FROM drinkmenu WHERE item_id = ?", [itemID], (error, rows) => {
      if (error){
        console.log(error);
      }
      res.render('searchDrinkMenuItem', {drinkmenu: rows}, function(err,html) {
      if (err) {
        alert("Error in finding drink menu item ");
        console.log(err);
      }
      else {
        res.send(html);
      }
      });
  });
  }

  })
  module.exports = router;