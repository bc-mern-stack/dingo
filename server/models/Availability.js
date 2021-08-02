const { Schema, model } = require("mongoose");
const hourlySchema = "./Hourly";

const availabilitySchema = new Schema(
  {
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
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

const Availability = model("Availability", availabilitySchema);

availabilitySchema.post("save", async function (next) {
  console.log(this);
  const {} = this;
});

module.exports = Availability;
