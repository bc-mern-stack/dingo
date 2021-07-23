const { Schema, model } = require("mongoose");

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
    mo: [
      {
        type: Number,
        min: 0,
        max: 23,
      },
    ],
    tu: [
      {
        type: Number,
        min: 0,
        max: 23,
      },
    ],
    we: [
      {
        type: Number,
        min: 0,
        max: 23,
      },
    ],
    th: [
      {
        type: Number,
        min: 0,
        max: 23,
      },
    ],
    fr: [
      {
        type: Number,
        min: 0,
        max: 23,
      },
    ],
    sa: [
      {
        type: Number,
        min: 0,
        max: 23,
      },
    ],
    su: [
      {
        type: Number,
        min: 0,
        max: 23,
      },
    ],
    hours_available: [hourlySchema],
    hours_busy: [hourlySchema],
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

const Hourly = model("Availibility", availabilitySchema);

module.exports = { Hourly, hourlySchema };
