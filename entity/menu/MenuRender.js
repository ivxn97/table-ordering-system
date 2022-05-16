// insert http://localhost:3000 into browser address bar
var sqlite3 = require('sqlite3').verbose();
var express = require('express');
var path = require("path");
var bodyParser = require ('body-parser');
var router = express.Router();

router.use(bodyParser.urlencoded({extended: true}));
router.use(bodyParser.json());
router.use(express.static(path.join(__dirname + '../../public')));
router.use('/img', express.static(__dirname + '../../public/Images'));

// Render Menu
router.get('/', (req, res) => {
    var db = new sqlite3.Database('./restaurant.db');
    db.all("SELECT * FROM foodmenu", (error, rows1) => {
        db.all("SELECT * FROM drinkmenu", (error, rows2) => {
            if (error){
                console.log(error);
            }
            res.render('menuPage', {foodmenu: rows1, drinkmenu: rows2});
    })});
    db.close();
  });
  module.exports = router;