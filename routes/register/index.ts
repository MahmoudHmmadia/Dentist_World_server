import express from "express";
import { registerController } from "../../controllers/register";
import { userRoles } from "../../middleware/validation/roles";
import { validation } from "../../middleware/validation/validation";
const router = express.Router();
router.post("/", validation(userRoles), registerController);
export default router;
