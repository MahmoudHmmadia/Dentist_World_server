import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
export interface CustomRequest extends Request {
  token: string | JwtPayload;
}
export async function verifyToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers.authorization || req.headers.Authorization;
  if (authHeader?.toString().startsWith("Bearer")) {
    const token = authHeader.toString().split(" ")[1];
    jwt.verify(token, process.env.ACCESS_SECRET!, (err, decoded) => {
      if (err) return res.sendStatus(403);
      else next();
    });
  } else {
    res.status(401);
  }
}
