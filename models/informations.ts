import mongoose from "mongoose";

const informationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
});
const information = mongoose.model("information", informationSchema);
export default information;
