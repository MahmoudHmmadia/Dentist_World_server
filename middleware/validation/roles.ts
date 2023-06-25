import joi from "joi";
export const userRoles = joi.object({
  fullName: joi.string().required(),
  password: joi.string().min(8).required(),
  passwordC: joi
    .any()
    .valid(joi.ref("password"))
    .required()
    .options({
      messages: { passwordC: "تأكد من أن كلمة السر متطابقة" },
    }),
  universityID: joi.number().required(),
  academicYear: joi.string().required(),
  profileImage: joi.string(),
});
export const loginRoles = joi.object({
  fullName: joi.string().required(),
  password: joi.string().required(),
});
export const patientRoles = joi.object({
  fullName: joi.string(),
  gender: joi.string(),
  occupation: joi.string(),
  address: joi.string(),
  phoneId: joi.number(),
  age: joi.number().min(3).max(100),
});
