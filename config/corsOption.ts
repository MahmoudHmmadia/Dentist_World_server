import { CorsOptions } from "cors";
const allowedOrigins = [
  "https://dentist-world.onrender.com/",
  "https://www.dentist-world.onrender.com/",
  "https://www.dentists_students_world.onrender.com",
  // "http://localhost:3003",
  // "http://localhost:3001",
  // "http://localhost:3000",
];
export const corsOptions: CorsOptions = {
  origin(requestOrigin, callback) {
    if (requestOrigin)
      if (allowedOrigins.includes(requestOrigin)) {
        callback(null, true);
      } else {
        callback(new Error("NOT ALLOWED BY CORS"));
      }
  },
  optionsSuccessStatus: 200,
  credentials: true,
};
