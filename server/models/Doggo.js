const { Schema, model } = require("mongoose");

const doggoSchema = new Schema(
  {
    name: { type: String, required: true },
    size: { type: Number, required: true },
    age: { type: Number },
    breed: { type: String },
    behavior: { type: String },
    instructions: { type: String },
    temperament: { type: String, required: true },
    picture: { type: String, required: true },
    instructions: { type: String, required: true },
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

const Doggo = model("Doggo", doggoSchema);

module.exports = Doggo;
