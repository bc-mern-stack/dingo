const { Schema, model } = require("mongoose");
const hourlySchema = "./Hourly";

const availabilitySchema = new Schema(
  {
    _id: {
      type: Schema.Types.ObjectId,
      default: Schema.Types.ObjectId,
    },
    date_start: {
      type: Date,
      required: true,
    },
    date_end: {
      type: Date,
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

// const Availability = model("Availability", availabilitySchema);

module.exports = { availabilitySchema };
