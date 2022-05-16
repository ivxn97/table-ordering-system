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
router.use('/img', express.static(__dirname + '../../public/Images'));

// Staff: Search Order by table name
router.post('/', (req, res) => {
    var tableNumber = req.body.tableNumber;

    console.log('Searching order from table ' + tableNumber);
    var db = new sqlite3.Database('./restaurant.db');
    db.get("SELECT * FROM kitchenorder WHERE table_no = ?", [tableNumber], (error, rows) => {
        if (error){
            console.log(error);
        }
        res.render('searchOrder', {kitchenorder: rows}, function(err,html) {
            if (err) {
              alert("Error in finding table number");
              console.log(err);
            }
            else {
              res.send(html);
            }
          });
    });
  })
  module.exports = router;