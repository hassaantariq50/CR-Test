const express = require("express");
const graphqlHTTP = require("express-graphql");
const mongoose = require("mongoose");
require("dotenv").config();
const getErrorCode = require("./helper/getErrorCode");
const schema = require("./schema");
const cors = require("cors");
const app = express();

mongoose.set("useCreateIndex", true);
mongoose
  .connect(`${process.env.database_url}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB connected…");
  })
  .catch((err) => {
    console.log(err);
    process.exit(1);
    s;
  });
app.use(cors());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE, OPTIONS"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.header("Access-Control-Request-Method", "*");
  res.header("Access-Control-Max-Age", "1728000");
  next();
});

app.use(
  "/api/user/graphql",
  graphqlHTTP({
    schema: schema,
    graphiql: true,
    formatError: (err) => {
      const error = getErrorCode(err.message);
      console.log("error--->", err);
      if (error) {
        return {
          message: error.message,
          statusCode: error.statusCode,
        };
      }
      return {
        message: err,
        statusCode: 400,
      };
    },
  })
);

app.listen(process.env.domain_port, () => {
  console.log("Server running succefully on port", process.env.domain_port);
});
