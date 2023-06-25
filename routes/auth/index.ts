import express from "express";
import { login } from "../../controllers/login";
import { validation } from "../../middleware/validation/validation";
import { loginRoles } from "../../middleware/validation/roles";
const router = express.Router();
router.post("/", validation(loginRoles), login);
export default router;
