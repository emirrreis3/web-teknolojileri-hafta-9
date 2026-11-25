import mongoose from "mongoose";
import { formatDate, parseDate } from "../utils/date.js";

const eventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "title alanı zorunludur"],
      trim: true
    },
    category: {
      type: String,
      required: [true, "category alanı zorunludur"],
      enum: {
        values: ["Seminer", "Atölye", "Söyleşi", "Yarışma"],
        message: "{VALUE} geçerli bir kategori değil"
      },
      trim: true
    },
    capacity: {
      type: Number,
      required: [true, "capacity alanı zorunludur"],
      min: [1, "capacity en az 1 olmalıdır"]
    },
    date: {
      type: Date,
      required: [true, "date alanı zorunludur"],
      set: parseDate,
      get: formatDate
    },
    time: {
      type: String,
      required: [true, "time alanı zorunludur"],
      trim: true
    },
    location: {
      type: String,
      required: [true, "location alanı zorunludur"],
      trim: true
    },
    description: {
      type: String,
      trim: true,
      default: ""
    }
  },
  {
    timestamps: true,
    toJSON: { getters: true },
    toObject: { getters: true },
    id: false
  }
);

const Event = mongoose.model("Event", eventSchema);

export default Event;
