/* DEPENDENCIES */
const { User, Book } = require("../models");

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
  },
};

/* EXPORTS */
module.exports = resolvers;
