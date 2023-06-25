import { User } from "./../models/User";
import { Request, Response } from "express";
async function refresh(req: Request, res: Response) {
  try {
    const cookies = req.cookies;
    if (!cookies.jwtSecret) return res.status(401);
    const refreshToken = await cookies.jwtSecret;
    const foundUser = await User.findOne({ refreshToken }).exec();
    // if (!foundUser) return res.status(403); //Forbidden
    // const verify = jwt.verify(refreshToken, process.env.REFRESH_SECRET!);
    // if (!verify) return res.status(403);
    // const token = jwt.sign(
    //   { fullName: foundUser.fullName },
    //   process.env.ACCESS_SECRET!,
    //   { expiresIn: "30m" }
    // );
    res.status(200).json({ foundUser, refreshToken });
  } catch (err) {
    res.status(500).json(err);
  }
}
export default refresh;
