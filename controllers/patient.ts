import { User } from "./../models/User";
import { Request, Response } from "express";
import Patient from "../models/Patient";
export async function addPatient(req: Request, res: Response) {
  try {
    const { fullName, age, address, phoneId, occupation, gender } = req.body;
    const found = await Patient.findOne({ fullName }).exec();
    if (found) return res.status(409).send("Conflict");
    const newPatient = await Patient.create({
      fullName: fullName.trim().toLowerCase(),
      age,
      address,
      phoneId,
      occupation,
      gender,
    });
    const clinics = Object.keys(newPatient.state);
    newPatient.clinics.push(...clinics);
    await newPatient.save();
    res.status(201).send("Created Successfully !");
  } catch (err) {
    res.status(500).send("Error !!!");
    console.log(err);
  }
}
export async function getPatients(_req: Request, res: Response) {
  try {
    const patients = await Patient.where({ reserved: false });
    res.status(200).json(patients);
  } catch (err) {
    res.status(500).send("Error !!!");
    console.log(err);
  }
}
export async function updatePatientState(req: Request, res: Response) {
  try {
    const patient = await Patient.findById(req.params.patientId);
    patient!.state = {};
    patient!.state = req.body.patientState;
    patient!.clinics = Object.keys(patient?.state);
    patient!.smoker = req.body.smook;
    await patient?.save();
    const user = await User.findById(req.params.userId);
    for (let i = 0; i < user?.reservedCases.length!; i++) {
      if (patient?.id == user?.reservedCases[i]._id)
        user?.reservedCases.splice(i, 1);
    }
    user?.reservedCases.push(patient);
    await user?.save();
    res.json({ patient, user });
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
}
export async function updateReservePatient(req: Request, res: Response) {
  try {
    const patient = await Patient.findById(req.params.patientId);
    const user = await User.findById(req.params.userId);
    patient!.reserved = !patient?.reserved;
    await patient?.save();
    if (patient?.reserved) {
      user?.reservedCases.push(patient);
    } else {
      for (let i = 0; i < user?.reservedCases.length!; i++) {
        if (patient?.id == user?.reservedCases[i]._id)
          user?.reservedCases.splice(i, 1);
      }
    }
    await user?.save();
    const patients = await Patient.where({ reserved: false });
    res.json({ user, patients, id: patient?.id });
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
}
export async function deletePatient(req: Request, res: Response) {
  try {
    const patient = await Patient.findById(req.params.patientId);
    const user = await User.findById(req.params.userId);
    for (let i = 0; i < user?.reservedCases.length!; i++) {
      if (patient?.id == user?.reservedCases[i]._id)
        user?.reservedCases.splice(i, 1);
    }
    await user?.save();
    await Patient.findOneAndDelete({ _id: patient?.id });
    const patients = await Patient.find();
    res.status(200).json({ patients, patient, user });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
}
