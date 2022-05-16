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

// Manager: search coupon
router.post('/', (req, res) => {
    var couponCode = req.body.couponCode;
    var db = new sqlite3.Database('./restaurant.db');
    db.get("SELECT * FROM coupon WHERE coupon_code = ?", [couponCode], (error, rows) => {
        if (error){
            console.log(error);
        }
        res.render('searchCouponCode', {coupon: rows}, function(err,html) {
          if (err) {
            alert("Error in finding coupon code");
            console.log(err);
          }
          else {
            res.send(html);
          }
        });
    });
  })
  module.exports = router;