import * as bcrypt from "bcrypt";
import { Request, Response } from "express";
import { User, UserModelInstance } from "../model/user";
const salt: number = 10;
import { generateToken } from "../helper/auth";
import { UniqueConstraintError } from "sequelize";

export const registrationController = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const {
      password,
    }: {
      password: string;
    } = req.body;

    req.body.password = await bcrypt.hash(password, salt);

    const createUserData: UserModelInstance | null = await User.create(
      req.body
    );
    if (createUserData) {
      return res.status(201).json({
        status: "success",
        code: 201,
        message: "User registered successfully.",
      });
    }
  } catch (error: any) {
    if (error instanceof UniqueConstraintError) {
      return res.status(400).json({
        status: "error",
        code: 400,
        message: error.errors[0].message,
      });
    } else {
      return res.status(500).json({
        status: "error",
        code: 500,
        message: "Please try again.",
      });
    }
  }
};

export const loginController = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const {
      email,
      password,
    }: {
      email: string;
      password: string;
    } = req.body;

    const userData: UserModelInstance | null = await User.findOne({
      where: {
        email,
        status: true
      },
    });
    if (!userData) {
      return res.status(400).json({
        status: "error",
        code: 400,
        message: "User is not registered or User is not active.",
      });
    }

    const comparedPassword: boolean = await bcrypt.compare(
      password,
      userData.password
    );
    if (comparedPassword) {
      const token: string = generateToken({
        id: userData.id,
        role: userData.role,
      });
      res.status(200).json({
        status: "success",
        code: 200,
        message: "User login successfully.",
        data: {
          token,
        },
      });
    } else {
      res.status(400).json({
        status: "error",
        code: 400,
        message: "User password does not matched.",
      });
    }
  } catch (error) {
    res.status(500).json({
      status: "error",
      code: 500,
      message: "Please try again.",
    });
  }
};

export const activeUserController = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const {
      email,
      status,
    }: {
      email: string;
      status: boolean;
    } = req.body;

    const [activeUserData]: number[] = await User.update({ status }, {
      where: {
        email,
      },
    });

    if (activeUserData === 1) {
      res.status(202).json({
        status: "success",
        code: 202,
        message: status
          ? "User active successfully."
          : "User deactive successfully.",
      });
    } else {
      res.status(400).json({
        status: "error",
        code: 400,
        message: "Data not found.",
      });
    }
  } catch (error) {
    res.status(500).json({
      status: "error",
      code: 500,
      message: "Please try again.",
    });
  }
};
