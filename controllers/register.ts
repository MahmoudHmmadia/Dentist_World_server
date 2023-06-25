import { Request, Response } from "express";
import { User } from "../models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
export async function registerController(req: Request, res: Response) {
  const { fullName, password, academicYear, universityID, profileImage } =
    req.body;
  try {
    const foundUser = await User.findOne({ fullName }).exec();
    if (foundUser)
      return res.status(409).json({
        message: "هناك حساب موجود بالاسم بالفعل",
      }); // Conflict
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    const token = jwt.sign({ fullName }, process.env.ACCESS_SECRET!, {
      expiresIn: "1d",
    });
    const newUser = await User.create({
      fullName: fullName.toLowerCase().trim(),
      password: hashedPassword,
      academicYear,
      universityID,
      profileImage,
    });
    const { role, gender, reservedCases, notes } = newUser;
    res.status(200).json({
      user: {
        id: newUser.id,
        fullName,
        academicYear,
        universityID,
        profileImage,
        role,
        gender,
        reservedCases,
        notes,
      },
      token,
    });
  } catch (err) {
    res.status(500).json(err);
  }
}
