const { Schema, model } = require("mongoose");
import Doggo from "./Doggo";

const appointmentSchema = new Schema(
  {
    owner: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    walker: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    date: {
      type: Date,
    },
    hour: {
      type: Number,
      min: 0,
      max: 23,
    },
    doggos: [
      {
        type: Schema.Types.ObjectId,
        ref: "Doggo",
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

const Appointment = model("Appointment", appointmentSchema);

module.exports = { Appointment, appointmentSchema };
