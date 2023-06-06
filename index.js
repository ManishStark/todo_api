const express = require("express");
require("dotenv").config({ path: "./config.env" });
require("./startup//logging")();
require("./startup/dbConfig");
require("./startup/validationJoi")();

const app = express();
require("./startup/routes")(app);

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`App is Listening on ${port}`));
