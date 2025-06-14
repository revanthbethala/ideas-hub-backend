import mongoose from "mongoose";

const ideasSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    techStack: {
      type: [String],
      default: [],
      required: true,
    },
    tags: {
      type: [String],
      required: true,
      default: [],
    },
    status: {
      type: [String],
      default: ["requested"],
      enum: [
        "requested",
        "reviewing",
        "in-progress",
        "rejected",
        "planned",
        "published",
      ],
    },
    Votes: {
      type: Number,
      default: null,
    },
    requestedBy: {
      type: String,
      default: "anonymous",
    },
  },
  { timeStamps: true }
);

const Ideas = mongoose.model("ideas", ideasSchema);
export default Ideas;
