import express = require("express");
const app: express.Application = express();
import * as bodyParser from "body-parser";
import cors = require("cors");
import * as dotenv from "dotenv";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "./swagger.json";
import route from "./app/routes/route";
import "./app/helper/db";
import { validator } from "./app/helper/validator";
dotenv.config();

app.use(cors());
app.use(
  bodyParser.urlencoded({
    extended: false,
    limit: "50mb",
  })
);
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use("/", route());

app.listen(process.env.PORT, () => {
  console.log(`Server is running on ${process.env.PORT}`);
});
