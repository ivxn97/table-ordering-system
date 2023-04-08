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

//Owner: Generating Daily Report Function
router.post('/', function(req, res){
    var dateInput = req.body.date;

    console.log('Generating Daily Report For Date: ' + dateInput );
    var db = new sqlite3.Database('restaurant.db');
    db.all("SELECT * FROM customer WHERE date = ?", [dateInput], (error, rows) => {
        if (error){
            console.log(error);
        }
        else {
            res.render('dailyReportView', {customer: rows});
            }
    });
  })
  module.exports = router;