// insert http://localhost:3000 into browser address bar
var sqlite3 = require('sqlite3').verbose();
var express = require('express');
var path = require("path");
var bodyParser = require ('body-parser');
var router = express.Router();

router.use(bodyParser.urlencoded({extended: true}));
router.use(bodyParser.json());
router.use(express.static(path.join(__dirname + '../../public')));
router.use('/img', express.static(__dirname + '../Images'));

// Administrator: Account search
router.post('/', (req, res) => {
    var username = req.body.username;
    var db = new sqlite3.Database('./restaurant.db');
    db.get("SELECT * FROM accounts WHERE username = ?", [username], (error, rows) => {
        if (error){
            console.log(error);
        }
        res.render('adminAccountSearch', {accounts: rows}, function(err,html) {
          if (err) {
            res.render('error.ejs');
          }
          else {
            res.send(html);
          }
        });
    });
  })
  module.exports = router;