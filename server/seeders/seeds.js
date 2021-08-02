const { forEachField } = require("apollo-server-express");
const faker = require("faker");

const db = require("../config/connection");
const {
  User,
  Address,
  Availability,
  Hourly,
  Appointment,
  Doggo,
} = require("../models");

const [addresses] = require("./data");

const { randomDate } = require("../utils/helpers");

db.once("open", async () => {
  await Doggo.deleteMany({});
  await Appointment.deleteMany({});
  // await Hourly.deleteMany({});
  await Availability.deleteMany({});
  await Address.deleteMany({});
  await User.deleteMany({});

  // create user data w/ addresses
  const userData = [];
  for (let i = 0; i < 10; i++) {
    const newAddress = await Address.create(addresses[i].address);
    const user = {
      username: faker.internet.userName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      phone: faker.phone.phoneNumber(),
      about: faker.lorem.paragraph(),
      address: newAddress._id,
    };
    userData.push(user);
  }
  // add user data to db
  const createUsers = await User.collection.insertMany(userData);
  let users = createUsers.ops; // get the user ids from the insertMany result
  const userIds = users.map((u) => u._id);

  // add favorites to each user
  for (let i = 0; i < users.length; i++) {
    const favoriteCount = Math.floor(Math.random() * 3 + 1);
    let favorites = [];
    for (let i = 0; i < favoriteCount; i++) {
      let favoriteId = userIds[Math.floor(Math.random() * users.length)];
      if (favoriteId != users[i]._id) {
        favorites.push(favoriteId);
      }
    }
    // add some favorites
    const updatedUser = await User.findByIdAndUpdate(
      users[i]._id,
      { $addToSet: { favorites } },
      { new: true },
      function (err, u) {
        if (err) {
          console.log(err);
        }
      }
    ).exec();
  }

  // add dog data
  const dogData = [];
  for (let i = 0; i < 20; i++) {
    const newDog = await Doggo.create({
      name: faker.name.firstName(),
      size: faker.datatype.number({ min: 1, max: 150 }),
      age: Math.floor(Math.random() * 15 + 1),
      breed: faker.animal.dog(),
      behavior: faker.lorem.word(),
      instructions: faker.hacker.phrase(),
      temperament: faker.lorem.word(),
      picture: faker.image.cats(),
    });
    dogData.push(newDog);
  }

  // add dogs randomly to the first half of users
  for (let i = 0; i < dogData.length; i++) {
    const addDog = dogData[i];
    const selectedUser = faker.datatype.number({
      min: 0,
      max: users.length / 2 - 1,
    });
    const updatedUser = await User.findByIdAndUpdate(
      users[selectedUser]._id,
      { $addToSet: { doggos: addDog._id } },
      { new: true },
      function (err, u) {
        if (err) {
          console.log(err);
        }
      }
    ).exec();
  }

  // create availability data and add to second half of users
  for (let i = 0; i < users.length / 2; i++) {
    const selectedUser = users.length / 2 + i;
    const newAvailability = await Availability.create({
      date_start: "07/01/2021",
      date_end: "10/01/2021",
      rate: faker.datatype.number({ min: 10, max: 30 }),
      hours_available: {
        mo: [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18],
        tu: [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18],
        we: [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18],
        th: [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18],
        fr: [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18],
        sa: [],
        su: [],
      },
    });
    const updatedUser = await User.findByIdAndUpdate(
      users[selectedUser]._id,
      { $addToSet: { availability: newAvailability._id } },
      { new: true },
      function (err, u) {
        if (err) {
          console.log(err);
        }
      }
    ).exec();
  }
  // update user data with availability and doggo data
  users = await User.find({}).exec();

  for (let i = 0; i < 30; i++) {
    // make appointments for the users with doggos
    const usersWithDoggos = users.filter((u) => u.doggos?.length > 0);
    const selectedOwner = faker.datatype.number({
      min: 0,
      max: usersWithDoggos.length - 1,
    });
    // but only make them on users with availability
    const usersWithAvailability = users.filter(
      (u) => u.availability?.length > 0
    );
    const selectedWalker = faker.datatype.number({
      min: 0,
      max: usersWithAvailability.length - 1,
    });
    let startDate = new Date("07/01/2021");
    let endDate = new Date("10/01/2021");

    const newAppointment = await Appointment.create({
      owner: usersWithDoggos[selectedOwner]._id,
      walker: usersWithAvailability[selectedWalker]._id,
      date: randomDate(startDate, endDate, 8, 18),
      doggos: usersWithDoggos[selectedOwner].doggos,
      hour: faker.datatype.number({ min: 8, max: 18 }),
    });
  }

  console.log("🌱🌱🌱 SEEDING FINISHED 🌱🌱🌱");
  process.exit(0);
});
