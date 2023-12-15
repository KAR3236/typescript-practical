import express, { Application } from "express";
const userRouter: Application = express();
import { validator } from "../../helper/validator";
import {
  registrationValidation,
  loginValidation,
} from "../../validation/userValidation";
import {
  loginController,
  registrationController,
} from "../../controller/userController";

export default (): any => {
  userRouter.post(
    "/api/user/registration",
    validator.body(registrationValidation),
    registrationController
  );
  userRouter.post(
    "/api/user/login",
    validator.body(loginValidation),
    loginController
  );

  return userRouter;
};
