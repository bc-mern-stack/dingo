const faker = require("faker");

const addresses = [
  {
    address: {
      street: "3575 N Lake Dr",
      city: "Milwaukee",
      state: "WI",
      zip: 53211,
      phone_number: faker.phone.phoneNumberFormat(),
      lat: 43.08411423076629,
      lng: -87.8735159598839,
    },
  },
  {
    address: {
      street: "1635 W Meinecke Ave",
      city: "Milwaukee",
      state: "WI",
      zip: 53206,
      phone_number: faker.phone.phoneNumberFormat(),
      lat: 43.062094153554085,
      lng: -87.93365818188977,
    },
  },
  {
    address: {
      street: "1921 W Kilbourn Ave",
      city: "Milwaukee",
      state: "WI",
      zip: 53233,
      phone_number: faker.phone.phoneNumberFormat(),
      lat: 43.041499933788685,
      lng: -87.93735156621423,
    },
  },
  {
    address: {
      street: "901 S 11th St",
      city: "Milwaukee",
      state: "WI",
      zip: 53204,
      phone_number: faker.phone.phoneNumberFormat(),
      lat: 43.02204457596752,
      lng: -87.9256096490272,
    },
  },
  {
    address: {
      street: "1524 S 9th St",
      city: "Milwaukee",
      state: "WI",
      zip: 53204,
      phone_number: faker.phone.phoneNumberFormat(),
      lat: 43.015422437975495,
      lng: -87.92218886508452,
    },
  },
  {
    address: {
      street: "555 S 5th St, Milwaukee, WI 53204",
      city: "Milwaukee",
      state: "WI",
      zip: 53204,
      phone_number: faker.phone.phoneNumberFormat(),
      lat: 43.025585180625676,
      lng: -87.91702788962421,
    },
  },
  {
    address: {
      street: "2922 S Pine Ave",
      city: "Milwaukee",
      state: "WI",
      zip: 53207,
      phone_number: faker.phone.phoneNumberFormat(),
      lat: 42.991840899276845,
      lng: -87.89905017214421,
    },
  },
  {
    address: {
      street: "340 E Gauer Cir",
      city: "Milwaukee",
      state: "WI",
      zip: 53211,
      phone_number: faker.phone.phoneNumberFormat(),
      lat: 42.9894662742821,
      lng: -87.90575086165026,
    },
  },
  {
    address: {
      street: "2839 S California St",
      city: "Milwaukee",
      state: "WI",
      zip: 53207,
      phone_number: faker.phone.phoneNumberFormat(),
      lat: 42.992881596322746,
      lng: -87.89345680540333,
    },
  },
  {
    address: {
      street: "1850 E Fernwood Ave",
      city: "Milwaukee",
      state: "WI",
      zip: 53211,
      phone_number: faker.phone.phoneNumberFormat(),
      lat: 42.98605608771323,
      lng: -87.88597703917631,
    },
  },
];

module.exports = [addresses];
