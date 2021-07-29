const { Schema, model } = require("mongoose");

const hourlySchema = new Schema(
  {
    date_range: {
      type: String,
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
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

const Hourly = model("Hourly", hourlySchema);

module.exports = hourlySchema;
