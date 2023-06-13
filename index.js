const express = require("express");
const cors = require("cors");

require("dotenv").config({ path: "./config.env" });
require("./startup//logging")();
require("./startup/dbConfig");
require("./startup/validationJoi")();

const app = express();
app.use(cors());

require("./startup/routes")(app);

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`App is Listening on ${port}`));
