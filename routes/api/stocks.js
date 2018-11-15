const express = require("express");
var mysql = require("mysql");
const router = express.Router();

// connect to DB
var con = mysql.createConnection({
  host: "45.36.146.185",
  user: "student",
  password: "secret",
  database: "stocks"
});

con.connect(err => {
  if (err) throw err;
  console.log("Connected!");
});

// @route get test
// @desc tests get route
// @access is public
router.get("/test", (req, res) =>
  res.json({
    msg: "Data Added to DBMS"
  })
);

// @route get stock chart data
// @desc gets stock ticker data from iextrader
// @access is public
router.post("/data", (req, res) => {
  console.log(req.body);
  var stockData = req.body;
  if (stockData.length > 0) {
    stockData.forEach(el => {
      console.log(el.date);
      con.query(
        "INSERT INTO `stockdata`(`symbol`, `date`, `closing`) VALUES ('" +
          el.label +
          "', '" +
          el.date +
          "', '" +
          el.close +
          "')",
        (err, result, fields) => {
          if (err) throw err;
        }
      );
    });
  }

  res.json({
    msg: "Post Worked"
  });
});

module.exports = router;
