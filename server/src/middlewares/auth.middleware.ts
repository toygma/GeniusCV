import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { IUser } from "../types/user.types";
import { User } from "../models/user.model";

interface DecodedToken {
  id: string;
  iat: number;
  exp: number;
}

declare global {
  namespace Express {
    interface Request {
      user?: IUser | any;
    }
  }
}

// Check if user is authenticated
export const isAuthenticatedUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { jwtToken } = req.cookies;

    if (!jwtToken) {
      res.status(401).json({
        success: false,
        message: "Please log in",
      });
      return;
    }

    const decoded = jwt.verify(
      jwtToken,
      process.env.JWT_SECRET!
    ) as DecodedToken;

    const user = await User.findById(decoded.id);

    if (!user) {
      res.status(404).json({
        success: false,
        message: "User not found",
      });
      return;
    }

    req.user = user;

    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({
      success: false,
      message: "Invalid token",
    });
  }
};
