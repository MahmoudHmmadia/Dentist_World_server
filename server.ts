// ==> Imports <== //

import express from "express";
import { config } from "dotenv";
import mongoose from "mongoose";
import helmet from "helmet";
import logger from "morgan";
import multer from "multer";
import { createStream } from "rotating-file-stream";
import root from "./routes/server";
import cors from "cors";
import path from "path";
import { corsOptions } from "./config/corsOption";
import register from "./routes/register";
import auth from "./routes/auth";
import refresh from "./routes/refresh";
import user from "./routes/user";
import cookieParser from "cookie-parser";
import { verifyToken } from "./middleware/auth/verifyToken";
import patient from "./routes/patient";
import { fileURLToPath } from "url";
import { dirname } from "path";

// ==> Main Configuration <== //

config();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express();
const STORAGE = multer.diskStorage({
  destination(_req, _file, callback) {
    callback(null, "public/assets/images");
  },
  filename(_req, file, callback) {
    callback(null, file.originalname);
  },
});
const upload = multer({ storage: STORAGE });
app.use(express.json());
app.use(logger("dev"));
const accessLogStream = createStream("accessLog.log", {
  path: "./logs",
});
app.use(logger("combined", { stream: accessLogStream }));
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
// app.use(cors(corsOptions));
app.use(
  "/assets",
  express.static(path.join(__dirname, "public/assets/images"))
);
app.use(cookieParser());
// ==> Routes <== //

app.use("/", root);
app.use("/register", upload.single("image"), register);
app.use("/auth", auth);
app.use("/refresh", refresh);
app.use("/user", verifyToken, user);
app.use("/patient", patient);

// ==> Connect To Database And Run The Server <== //

const DATABASE_URL = process.env.DATABASE_URL_CONNECTION;

const PORT = process.env.PORT || 3500;
mongoose
  .connect(DATABASE_URL!)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`SERVER RUNNING ON PORT ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
