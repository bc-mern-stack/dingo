const { User, Availability, Hourly, Appointment, Doggo } = require("../models");
const { AuthenticationError } = require("apollo-server-express");
const { signToken } = require("../utils/auth"); // uses jsonwebtoken

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        const userDatas = await User.findOne({ _id: context.user._id })
          .select("-__v -password")
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
        .populate("favorites")
        .populate({ path: "availability", model: Availability })
        .populate("doggos")
        .populate("appointments");
    },
    // get a user by username
    user: async (parent, { username }) => {
      return User.findOne({ username })
        .select("-__v -password")
        .populate("favorites")
        .populate({ path: "availability", model: Availability })
        .populate("doggos")
        .populate("appointments");
    },
  },
  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
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
        newAvailability.save((err) => {
          if (err) {
            throw new AuthenticationError("Error saving availability");
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
        console.log("updated user", updatedUser);

        return updatedUser;
      }

      throw new AuthenticationError("You need to be logged in!");
    },
    removeAvailability: async (parent, { availId }, context) => {
      if (context.user) {
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          {
            $pull: {
              availability: availId,
            },
          },
          { new: true }
        )
          .select("-__v -password")
          .populate({ path: "availability", model: Availability });
        console.log("updated user", updatedUser);

        return updatedUser;
      }
    },
  },
};

module.exports = resolvers;
