import { ExpressJoiInstance } from "express-joi-validation";

export const validator: ExpressJoiInstance =
  require("express-joi-validation").createValidator({
    passError: true,
  });
