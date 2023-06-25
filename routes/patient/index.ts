import express from "express";
import {
  addPatient,
  getPatients,
  updatePatientState,
  updateReservePatient,
  deletePatient,
} from "../../controllers/patient";
import { verifyToken } from "../../middleware/auth/verifyToken";
import { validation } from "../../middleware/validation/validation";
import { patientRoles } from "../../middleware/validation/roles";

const router = express.Router();
router.route("/").post(validation(patientRoles), addPatient).get(getPatients);
router
  .route("/:patientId/:userId")
  .post(verifyToken, updatePatientState)
  .put(verifyToken, updateReservePatient)
  .delete(verifyToken, deletePatient);
export default router;
