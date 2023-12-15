import * as jwt from "jsonwebtoken";
import {
  GenerateTokenInterface,
  VerifyTokenInterface,
} from "../utils/objectInterfaces";

export const generateToken = (data: GenerateTokenInterface) => {
  return jwt.sign({ id: data.id, role: data.role }, "privateKey", {
    expiresIn: "1d",
  });
};

export const authorization = (roles: string[] = []) => {
  return (req: any, res: any, next: any) => {
    try {
      const token: string = req.header("Authorization");
      if (!token) {
        res.status(403).json({
          status: "error",
          code: 403,
          message: "Please enter token.",
        });
      }

      const tokenVerify: VerifyTokenInterface = jwt.verify(
        token,
        "privateKey"
      ) as VerifyTokenInterface;
      req.user = tokenVerify;

      if (roles.length > 0 && roles.some((role) => role === tokenVerify.role)) {
        next();
      } else {
        res.status(401).json({
          status: "error",
          code: 401,
          message: "Current role is not valid",
        });
      }
    } catch (error: any) {
      res.status(401).json({
        status: "error",
        code: 401,
        message: error,
      });
    }
  };
};
