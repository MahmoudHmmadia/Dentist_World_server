import express from "express";
import refresh from "../../controllers/refresh";
const router = express.Router();
router.get("/", refresh);
export default router;
