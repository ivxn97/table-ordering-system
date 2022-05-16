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

// Staff: View all Orders
router.post('/', (req, res) => {
    var db = new sqlite3.Database('./restaurant.db');
    db.all("SELECT * FROM kitchenorder", [tableNumber], (error, rows) => {
        if (error){
            console.log(error);
        }
        res.render('viewOrders', {kitchenorder: rows});
    });
  })
  module.exports = router;