const {
  User,
  Address,
  Availability,
  Hourly,
  Appointment,
  Doggo,
} = require("../models");
const { AuthenticationError } = require("apollo-server-express");
const { signToken } = require("../utils/auth"); // uses jsonwebtoken

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        const userDatas = await User.findOne({ _id: context.user._id })
          .select("-__v -password")
          .populate("address")
          .populate("favorites")
          .populate({ path: "availability", model: Availability })
          .populate("doggos")
          .populate("appointments");
        return userDatas;
      }
      throw new AuthenticationError("Not logged in");
    },
    users: async () => {
      return User.find()
        .select("-__v -password")
        .populate("address")
        .populate("favorites")
        .populate({ path: "availability", model: Availability })
        .populate("doggos")
        .populate("appointments");
    },
    // get a user by username
    user: async (parent, { username }) => {
      return User.findOne({ username })
        .select("-__v -password")
        .populate("address")
        .populate("favorites")
        .populate({ path: "availability", model: Availability })
        .populate("doggos")
        .populate("appointments");
    },
  },
  Mutation: {
    addUser: async (parent, args) => {
      const address = await Address.create(args.address);
      console.log(address);

      const user = await User.create({ ...args, address: address._id });

      const token = signToken(user);

      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const correctPassword = await user.isCorrectPassword(password);

      if (!correctPassword) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const token = signToken(user);
      return { token, user };
    },
    addFavorite: async (parent, { favoriteId }, context) => {
      if (context.user) {
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { favorites: favoriteId } }, // prevents duplicates
          { new: true }
        ).populate("favorites");

        return updatedUser;
      }

      throw new AuthenticationError("You need to be logged in!");
    },
    removeFavorite: async (parent, { favoriteId }, context) => {
      if (context.user) {
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { favorites: favoriteId } },
          { new: true }
        ).populate("favorites");

        return updatedUser;
      }

      throw new AuthenticationError("You need to be logged in!");
    },
    addAvailability: async (
      parent,
      { date_start, date_end, rate, hours_available },
      context
    ) => {
      if (context.user) {
        // create the new availability
        const newAvailability = await new Availability({
          date_start,
          date_end,
          rate,
          hours_available,
        });
        // now save it to the db
        await newAvailability.save((err) => {
          if (err) {
            throw new Error("Error saving availability");
          }
          return newAvailability;
        });
        // and update the user with that new availability
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          {
            $push: {
              availability: newAvailability._id,
            },
          },
          { new: true }
        )
          .select("-__v -password")
          .populate({ path: "availability", model: Availability })
          .populate({ path: "hours_available", model: Hourly });

        return updatedUser;
      }

      throw new AuthenticationError("You need to be logged in!");
    },
    removeAvailability: async (parent, { availId }, context) => {
      if (context.user) {
        const removedAvailability = await Availability.findOneAndRemove({
          _id: availId,
        });
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          {
            $pull: {
              availability: removedAvailability._id,
            },
          },
          { new: true }
        )
          .select("-__v -password")
          .populate({ path: "availability", model: Availability });

        return updatedUser;
      }
    },
    addDoggo: async (
      parent,
      { name, size, behavior, temperament, picture },
      context
    ) => {
      if (context.user) {
        // create the new doggo
        const newDoggo = await new Doggo({
          name,
          size,
          behavior,
          temperament,
          picture,
        });
        // now save it to the db
        await newDoggo.save((err) => {
          if (err) {
            throw new Error("Error saving doggo");
          }
          return newDoggo;
        });
        // and update the user with that new doggo
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          {
            $push: {
              doggos: newDoggo._id,
            },
          },
          { new: true }
        )
          .select("-__v -password")
          .populate("doggos");

        return updatedUser;
      }

      throw new AuthenticationError("You need to be logged in!");
    },
    removeDoggo: async (parent, { doggoId }, context) => {
      if (context.user) {
        const deletedDoggo = await Doggo.findOneAndRemove({ _id: doggoId });
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          {
            $pull: {
              doggos: deletedDoggo._id,
            },
          },
          { new: true }
        )
          .select("-__v -password")
          .populate("doggos");
        return updatedUser;
      }
    },
    addAppointment: async (
      parent,
      { owner, walker, date, hour, doggos },
      context
    ) => {
      if (context.user) {
        // create the new appointment...
        // users are updated in the Appointment model after saving
        const newAppointment = await Appointment.create({
          owner,
          walker,
          date,
          hour,
          doggos,
        });
        const saved = Appointment.findOne({ _id: newAppointment._id })
          .populate("owner")
          .populate("walker")
          .populate("doggos");
        return saved;
      }

      throw new AuthenticationError("You need to be logged in!");
    },
    removeAppointment: async (parent, { appId }, context) => {
      if (context.user) {
        const removedAppointment = await Appointment.findOneAndRemove({
          _id: appId,
          // owner: context.user._id,
        });

        // functionality to make sure only owners and walkers can remove
        // appointments should be here, would look like this:
        //
        // console.log(
        //   "owner and logged in user: \n",
        //   removedAppointment.owner,
        //   context.user._id
        // );
        // if (removedAppointment?.owner !== context.user._id) {
        //   console.log("failed to remove appointment");
        //   throw new Error("You can't remove someone else's appointment!");
        // }

        return removedAppointment;
      }
    },
  },
};

module.exports = resolvers;
