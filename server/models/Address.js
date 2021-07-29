const { Schema, model } = require("mongoose");

const addressSchema = new Schema({
  street: { type: String },
  city: { type: String },
  state: { type: String },
  zip: { type: Number },
  phone_number: { type: String },
  lat: { type: Number },
  lng: { type: Number },
});

const Address = model("Address", addressSchema);

module.exports = Address;
