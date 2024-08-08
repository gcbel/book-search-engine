const typeDefs = `
    type Book {
        bookId: String!
        title: String!
        authors: [String]
        description: String!
        image: String
        link: String
    }

    input BookInput {
        bookId: String!
        title: String!
        authors: [String]
        description: String!
        image: String
        link: String
    }

    type User {
        _id: ID!
        username: String!
        email: String!
        password: String!
        savedBooks: [Book]
    }

    type UserLogin {
        token: ID!
        user: User
    }

    type Query {
        me: User
      }

    type Mutation {
        createUser(username: String!, email: String!, password: String!): UserLogin
        login(email: String, password: String!): UserLogin
        addBook(bookInput: BookInput): User
        deleteBook(bookId: String!): User
    }
`;

module.exports = typeDefs;
