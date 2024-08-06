const typeDefs = `
    type Book {
        _id: ID
        authors: String
        description: String!
        bookId: String!
        image: String
        link: String
        title: String!
    }

    input BookInput {
        title: String
        author: String
        description: String
    }

    type User {
        _id: ID
        username: String!
        email: String!
        password: String!
        savedBooks: [Book]!
    }

    type Query {
        user(_id: String): [User]
    }

    type Mutation {
        createUser(username: String!, email: String!, password: String!, savedBooks: [BookInput]!): [User]
        addBook(_id: String!, book: [BookInput]): [User]
        deleteBook(_id: String!): [User]
    }
`;

module.exports = typeDefs;
