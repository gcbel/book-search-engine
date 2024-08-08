/* DEPENDENCIES */
const { User } = require("../models");
const { signToken } = require("../utils/auth");

/* RESOLVERS */
const resolvers = {
  Query: {
    user: async (parent, { _id }, context) => {
      if (context.user) {
        return User.findById(_id).populate("savedBooks");
      }
    },
  },
  Mutation: {
    createUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user) {
        throw new Error("Error finding user");
      }

      const correctPw = await user.isCorrectPassword(password);
      if (!correctPw) {
        throw new Error("Incorrect password!");
      }

      const token = signToken(user);
      return { token, user };
    },
    addBook: async (parent, { bookInput }, context) => {
      if (context.user) {
        try {
          const user = await User.findByIdAndUpdate(
            { _id: context.user._id },
            { $addToSet: { savedBooks: input } },
            { new: true }
          );
          return user;
        } catch (err) {
          throw new Error("Error saving book");
        }
      }
    },
    deleteBook: async (parent, { bookId }, context) => {
      if (context.user) {
        const user = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { savedBooks: { bookId } } },
          { new: true }
        );
        return user;
      }
    },
  },
};

/* EXPORTS */
module.exports = resolvers;
