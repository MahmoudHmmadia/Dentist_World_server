import { Request, Response } from "express";
import { User } from "../models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
export async function login(req: Request, res: Response) {
  try {
    const { fullName, password } = req.body;
    const foundUser = await User.findOne({
      fullName: fullName.toLowerCase().trim(),
    }).exec();
    if (!foundUser)
      return res.status(401).json({
        message: "تأكد من الاسم و كلمة المرور",
      }); // Unauthorized
    const match = await bcrypt.compare(password, foundUser.password);
    if (!match)
      return res.status(401).json({
        message: "تأكد من الاسم و كلمة المرور",
      }); // Unauthorized
    const token = jwt.sign(
      { fullName: foundUser.fullName },
      process.env.ACCESS_SECRET!,
      { expiresIn: "1d" }
    );
    const refresh = jwt.sign({ fullName }, process.env.REFRESH_SECRET!, {
      expiresIn: "1d",
    });
    foundUser.refreshToken = refresh;
    await foundUser.save();
    const {
      _id: id,
      fullName: name,
      academicYear,
      universityID,
      profileImage,
      role,
      notes,
      reservedCases,
      gender,
    } = foundUser;
    res.cookie("jwtSecret", foundUser.refreshToken, {
      maxAge: 24 * 60 * 60 * 1000,
      sameSite: "none",
      httpOnly: true,
      secure: true,
    });
    res.status(200).json({
      user: {
        id,
        fullName: name,
        academicYear,
        universityID,
        profileImage,
        role,
        notes,
        reservedCases,
        gender,
      },
      token,
    });
  } catch (err) {
    res.status(500).json(err);
  }
}
