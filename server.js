const express = require("express");
const bodyParser = require("body-parser");
const serveStatic = require("serve-static");
const cors = require("cors");
const morgan = require("morgan");
var mysql = require("mysql");
const path = require("path");

// routes
const stocks = require("./routes/api/stocks");

const app = express();

// Body parser middleware, to access req.body.whatever
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());
app.use(morgan("combined"));
app.use(cors());

app.use("/api/stocks", stocks);

// serve up static assets always
app.use(serveStatic(path.join(__dirname, "client/dist")));
const port = process.env.PORT || 5000;
app.listen(port);
console.log("server started " + port);

/* 
express has to be a dependency NOT a DevDependency
*/
