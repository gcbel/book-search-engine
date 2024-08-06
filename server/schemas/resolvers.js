/* DEPENDENCIES */
const { User, Book } = require("../models");

/* RESOLVER */
const resolvers = {
  Query: {
    user: async (parent, { _id }) => {
      return User.find({ _id });
    },
  },
  Mutation: {
    createUser: async (parent, args) => {
      const user = await User.create(args);
      return user;
    },
    addBook: async (parent, { _id, book }) => {
      const user = await User.find({ _id });
      user.savedBooks.push(book);
      return user;
    },
    // deleteBook: async (parent, { _id, techNum }) => {
    //   const vote = await Matchup.findOneAndUpdate(
    //     { _id },
    //     { $inc: { [`tech${techNum}_votes`]: 1 } },
    //     { new: true }
    //   );
    //   return vote;
    // },
  },
};

/* EXPORTS */
module.exports = resolvers;
