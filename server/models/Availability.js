const { Schema, model } = require("mongoose");
const hourlySchema = "./Hourly";
const { getDateArray } = require("../utils/helpers");

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
    hours_by_date: {
      type: Schema.Types.Mixed,
      default: {},
    },
    dates_available: [Date],
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

availabilitySchema.pre("save", async function () {
  try {
    const { hours_available, hours_by_date, date_start, date_end } = this;
    const start = new Date(date_start);
    const end = new Date(date_end);
    const dates = getDateArray(start, end);
    this.dates_available = dates;
    const hoursAvailableArray = [
      hours_available[0].mo,
      hours_available[0].tu,
      hours_available[0].we,
      hours_available[0].th,
      hours_available[0].fr,
      hours_available[0].sa,
      hours_available[0].su,
    ];
    for (date of dates) {
      const index = date.getDay() - 1;
      hours_by_date[date] = hoursAvailableArray[index];
    }
    this.hours_by_date = hours_by_date;
  } catch (err) {
    console.log(err);
  }
});

const Availability = model("Availability", availabilitySchema);

module.exports = Availability;
