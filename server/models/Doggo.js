const { Schema, model } = require("mongoose");

const doggoSchema = new Schema(
  {
    name: { type: String, required: true },
    size: { type: Number, required: true },
    behavior: { type: String, required: true },
    temperament: { type: String, required: true },
    picture: { type: String, required: true },
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

const Doggo = model("Doggo", doggoSchema);

module.exports = { Doggo, doggoSchema };
