import express from "express";
import { addNote, getNotes, deleteNote } from "../../controllers/user";
const router = express.Router();

router.route("/:id/notes").get(getNotes).post(addNote).put(deleteNote);

export default router;
