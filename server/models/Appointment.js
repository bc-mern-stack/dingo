const { Schema, model } = require("mongoose");
const User = require("./User");

const appointmentSchema = new Schema(
  {
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    walker: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
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

appointmentSchema.post("save", async function (next) {
  const { _id, owner, walker } = this;
  // console.log("after save appointment ", owner[0], walker[0]);
  // and update the owner with that new appointment
  if (true) {
    const updateOwner = await User.findOneAndUpdate(
      { _id: owner },
      {
        $push: {
          appointments: _id,
        },
      },
      { new: true }
    );
    // then update the walker with that new appointment
    const updateWalker = await User.findOneAndUpdate(
      { _id: walker },
      {
        $push: {
          appointments: _id,
        },
      }
    );
  }
});

appointmentSchema.post("remove", async function (next) {
  const { _id, owner, walker } = this;
  // console.log("after save appointment ", owner[0], walker[0]);
  // and update the owner with that new appointment
  if (true) {
    const updateOwner = await User.findOneAndUpdate(
      { _id: owner },
      {
        $pull: {
          appointments: _id,
        },
      },
      { new: true }
    );
    // then update the walker with that new appointment
    const updateWalker = await User.findOneAndUpdate(
      { _id: walker },
      {
        $pull: {
          appointments: _id,
        },
      }
    );
  }
});

const Appointment = model("Appointment", appointmentSchema);

module.exports = Appointment;
