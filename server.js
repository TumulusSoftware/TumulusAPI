require("dotenv").config();
require("rootpath")();
const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const errorHandler = require("_middleware/error-handler");
const bce = require('_helpers/bce'); // bce=blockchain event

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// api routes
app.use("/user", require("controllers/user.controller"));
app.use("/agreement", require("controllers/agreement.controller"));
app.use("/view", require("controllers/view.controller"));
app.use("/state", require("controllers/state.controller"));
app.use("/asset", require("controllers/asset.controller"));

// global error handler
app.use(errorHandler);

// start server
const port = process.env.PORT;
app.listen(port, () => console.log("Server listening on port " + port));

bce.listenToEvents();
