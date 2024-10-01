const winston = require("winston");
module.exports = () => {
  winston.add(
    new winston.transports.File({
      level: "info",
      filename: "log/log.log",
      format: winston.format.combine(
        winston.format.timestamp({
          format: "YYYY-MM-DD HH:mm:ss",
        }),
        winston.format.json()
      ),
      handleExceptions: true,
    })
  );

  process.on("uncaughtException", (err) => {
    console.log("Uncaught Exception--->", err);
    winston.error(err.message, err);
    process.exit(1);
  });

  process.on("unhandledRejection", (err) => {
    console.log("Unhaldled Rejection--->", (err) => {
      winston.error(err.message, err);
      process.exit(1);
    });
  });
};
