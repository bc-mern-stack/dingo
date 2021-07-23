const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");
const availabilitySchema = "./Availability";

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+@.+\..+/, "Must match an email address!"],
    },
    password: {
      type: String,
      required: true,
      minlength: 5,
    },
    favorites: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    availability: [availabilitySchema],
    doggos: [
      {
        type: Schema.Types.ObjectId,
        ref: "Doggo",
      },
    ],
    appointments: [
      {
        type: Schema.Types.ObjectId,
        ref: "Appointment",
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

// set up pre-save middleware to create password
userSchema.pre("save", async function (next) {
  if (this.isNew || this.isModified("password")) {
    const doSaltRounds = 10;
    this.password = await bcrypt.hash(this.password, doSaltRounds);
  }

  next();
});

// compare the incoming password with the hashed password
userSchema.methods.isCorrectPassword = async function (pass) {
  return bcrypt.compare(pass, this.password);
};

const User = model("User", userSchema);

module.exports = User;
