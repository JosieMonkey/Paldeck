import { Schema, model } from "mongoose";

const palSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      minLength: [2, "Name must be at least 2 characters"],
      maxLength: [255, "Name cannot be more than 255 characters"],
    },
    numericId: {
      type: Number,
      required: [true, "ID is required"],
      min: [1, "ID must be at least 1"],
    },
    partnerSkill: {
      type: String,
      required: [true, "Partner Skill is required"],
      minLength: [5, "Partner Skill must be at least 5 characters"],
      maxLength: [255, "Partner Skill cannot be more than 255 characters"],
    },
    type: {
      type: Array,
      required: [true, "Type is required"],
      minLength: [3, "Type must be at least 3 characters"],
      maxLength: [255, "Type cannot be more than 255 characters"],
    },
    color: {
      type: Array,
      required: [true, "Color is required"],
      minLength: [3, "Color must be at least 3 characters"],
      maxLength: [255, "Color cannot be more than 255 characters"],
    },
    isDiscovered: {
      type: Boolean,
      default: false,
      required: [true, "isDiscovered is required"],
    },
    isCaptured: {
      type: Boolean,
      default: false,
      required: [true, "isCaptured is required"],
    },
  },
  { timestamps: true }
);
const Pals = model("Pals", palSchema);
export default Pals;
