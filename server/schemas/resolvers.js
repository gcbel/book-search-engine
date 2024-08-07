/* DEPENDENCIES */
const { User, Book } = require("../models");
const { signToken } = require("../utils/auth");

/* RESOLVER */
const resolvers = {
  Query: {
    user: async (parent, { _id }) => {
      return User.findById(_id);
    },
  },
  Mutation: {
    createUser: async (parent, args) => {
      const user = await User.create(args);
      return user;
    },
    addBook: async (parent, { _id, book }) => {
      const user = await User.findById(_id);
      user.savedBooks.push(book);
      await user.save();
      return user;
    },
    deleteBook: async (parent, { _id, bookId }) => {
      const user = await User.findOneAndUpdate(
        { _id: user._id },
        { $pull: { savedBooks: { bookId } } },
        { new: true }
      );
      return user;
    },
    login: async (parent, { username, email, password }) => {
      const user = await User.findOne({
        $or: [{ username }, { email }],
      });

      if (!user) {
        throw new Error("Can't find this user");
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new Error("Wrong password!");
      }

      const token = signToken(user);
      return { token, user };
    },
  },
};

/* EXPORTS */
module.exports = resolvers;
