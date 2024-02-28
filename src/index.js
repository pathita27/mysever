require('dotenv').config({ path: './config.env'});
const express = require("express");
const app = express();
const port = process.env.PORT || 4000;
const bodyParser = require('body-parser');
const cors = require('cors');

const roomRouter = require('./routes/room.route.js');
const customerRouter = require('./routes/customer.route.js');
const userRoter = require('./routes/user.route');
const bookingRoter = require('./routes/bookingroom.route')
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

require("./db.js")(app);

app.use("/room", roomRouter);

app.use("/customer", customerRouter);

app.use("/user", userRoter);


app.use("/booking", bookingRoter);

app.listen(port, () => {
  console.log("Starting node.js at port " + port);
});