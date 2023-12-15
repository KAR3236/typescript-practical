import express = require("express");
const router: express.Application = express();
import userRoute from "./router/userRoute";
import blogRoute from "./router/blogRoute";

export default (): any => {
  router.use("/", userRoute());
  router.use("/", blogRoute());

  return router;
};
