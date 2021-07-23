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
          .populate("availability")
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
        .populate("availability")
        .populate("doggos")
        .populate("appointments");
    },
    // get a user by username
    user: async (parent, { username }) => {
      return User.findOne({ username })
        .select("-__v -password")
        .populate("favorites")
        .populate("availability")
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

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
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
  },
};

module.exports = resolvers;
