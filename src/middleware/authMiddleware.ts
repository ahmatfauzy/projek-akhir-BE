import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

interface userData {
  id: string;
  name: string;
}

interface validationRequest extends Request {
  userData: userData;
}

const accesValidation = (req: Request, res: Response, next: NextFunction) => {
  const validationReq = req as validationRequest;
  const { authorization } = validationReq.headers;

  if (!authorization) {
    return res.status(401).json({
      message: `token diperlukan`,
    });
  }
  const token = authorization.split(" ")[1];
  const secret = process.env.JWT_SECRET!;

  try {
    const jwtDecode = jwt.verify(token, secret);
    if (typeof jwtDecode != "string") {
      validationReq.userData = jwtDecode as userData;
    }
  } catch (error) {
    return res.status(401).json({
      message: "un",
    });
  }
  next();
};

export default accesValidation;
