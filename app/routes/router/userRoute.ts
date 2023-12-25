import express, { Application } from "express";
const userRouter: Application = express();
import { validator } from "../../helper/validator";
import {
  registrationValidation,
  loginValidation,
  activeValidation,
} from "../../validation/userValidation";
import {
  activeUserController,
  loginController,
  registrationController,
} from "../../controller/userController";
import { idValidation } from "../../validation/idValidation";
import { authorization } from "../../helper/auth";

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
  userRouter.put(
    "/api/user/activeUser",
    validator.body(activeValidation),
    activeUserController
  );

  return userRouter;
};
