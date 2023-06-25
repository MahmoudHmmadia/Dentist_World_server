import { Request, Response } from "express";
import { User } from "../models/User";

export async function addNote(req: Request, res: Response) {
  try {
    const id = req.params.id;
    const foundUser = await User.findById(id).exec();
    foundUser?.notes.push(req.body);
    await foundUser?.save();
    res.status(200).json({ user: foundUser });
  } catch (err) {
    res.status(500).json(err);
  }
}
export async function getNotes(req: Request, res: Response) {
  try {
    const id = req.params.id;
    const foundUser = await User.findById(id).exec();
    res.status(200).json({ user: foundUser });
  } catch (err) {
    res.status(500);
  }
}
export async function deleteNote(req: Request, res: Response) {
  try {
    const userId = req.params.id;
    const noteId = req.body.noteId;
    const foundUser = await User.findById(userId).exec();
    for (let i = 0; i < foundUser?.notes.length!; i++) {
      if (noteId == foundUser?.notes[i].id) foundUser?.notes.splice(i, 1);
    }
    const response = await foundUser?.save();
    res.status(200).json(response);
  } catch (err) {
    res.status(500);
  }
}
