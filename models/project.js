/**
 * Project database model
 */
let mongoose = require("mongoose");
const Schema = mongoose.Schema;
let projectSchema = new mongoose.Schema(
  {
    userId: { type: String, default: "" },
    projectTitle: { type: String, default: "" },
    description: { type: String, default: "" },
    imageUrl: { type: String, default: "" },
    techStack: { type: Array, default: [] },
    githubLink: { type: String, default: "" },
    liveLink: { type: String, default: "" },
    status: { type: Number, default: 1 }, //1 = on-going | 2 = Archived | 3 = Completed
    createdAt: { type: Date, default: Date.now() },
  },
  { versionKey: false },
  { autoIndex: false },
  { collection: "projects" }
);

module.exports = mongoose.model("Project", projectSchema);
