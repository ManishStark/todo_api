const mongoose= require("mongoose");
const winston= require("winston");

mongoose.connect(process.env.DB)
.then(()=> winston.info("DB Connected"))
.catch(err=> console.error(err));