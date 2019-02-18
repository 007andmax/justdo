let express = require("express"),
    session = require("express-session"),
    indexRoutes = require("./routes/index");
let bodyParser = require("body-parser");
const path = require("path");
let mongoose = require("./lib/mongoose");
let MongoStore = require("connect-mongo")(session);
let conf = require("./conf/index");



var app = express();
  app.use(
    session({
        secret: conf.get("session:secret"),
        key: conf.get("session:key"),
        cookie: conf.get("session:cookie"),
        store: new MongoStore({
            mongooseConnection: mongoose.connection,
        })
    })
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/", indexRoutes);
app.use(express.static(path.resolve(__dirname, "..", "dist")));
 app.get(/.*/, (req, res) => {res.sendFile(path.resolve(__dirname, "..", "dist", "index.html"));});
app.listen(3000);
