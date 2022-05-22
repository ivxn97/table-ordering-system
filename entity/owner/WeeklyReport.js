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

//Owner: Generating Weekly Report Function
router.post('/', function(req, res){
    var dateInput = req.body.date1;
    var dateInput2 = req.body.date2;

    console.log('Generating Weekly Report For Date: ' + dateInput + 'To' + dateInput2 );
    var db = new sqlite3.Database('restaurant.db');
    db.all("SELECT * FROM customer WHERE date BETWEEN = ?,?", [dateInput, dateInput2], (error, rows) => {
        if (error){
            console.log(error);
        }
        else {
        res.render('weeklyReportView', {customer: rows});
        }
    });
  })
  module.exports = router;