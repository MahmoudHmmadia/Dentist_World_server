import { CorsOptions } from "cors";
const allowedOrigins = [
  "https://www.Dentist_World.onrender.com",
  // "http://localhost:3003",
  // "http://localhost:3001",
  // "http://localhost:3000",
];
export const corsOptions: CorsOptions = {
  origin(requestOrigin, callback) {
    if (allowedOrigins.indexOf(requestOrigin!) !== -1 || !requestOrigin) {
      callback(null, true);
    } else {
      callback(new Error("NOT ALLOWED BY CORS"));
    }
  },
  optionsSuccessStatus: 200,
  credentials: true,
};
