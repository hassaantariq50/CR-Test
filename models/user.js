/**
 * User database model
 */
let mongoose = require("mongoose");
const Schema = mongoose.Schema;
let userSchema = new mongoose.Schema(
  {
    fullName: { type: String, default: "" },
    email: { type: String, require: true, trim: true },
    password: { type: String, trim: true, default: "" },
    createdAt: { type: Date, default: Date.now, required: true },
    jwtToken: {
      jwtToken: { type: String, default: "" },
      createdAt: { type: Date, default: Date.now },
    },
    loggedDevices: [
      {
        createdAt: { type: Date, default: Date.now },
        jwtToken: { type: String, default: "" },
        deviceId: { type: String, default: "" },
      },
    ],
  },
  { versionKey: false },
  { autoIndex: false },
  { collection: "users" }
);

module.exports = mongoose.model("User", userSchema);
