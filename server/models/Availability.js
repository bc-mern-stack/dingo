const { Schema, model } = require("mongoose");
import hourlySchema from "./Hourly";

const availabilitySchema = new Schema(
  {
    date_range: {
      type: String,
      required: true,
    },
    rate: {
      type: Number,
      required: true,
    },
    hours_available: [hourlySchema],
    hours_busy: [hourlySchema],
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

const Availability = model("Availibility", availabilitySchema);

module.exports = { Availability, availabilitySchema };
