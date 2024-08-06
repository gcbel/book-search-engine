const typeDefs = `
    type book {
        _id: ID
        authors: String
        description: String!
        bookId: String!
        image: String
        link: String
        title: String!
    }

    type User {
        _id: ID
        username: String
        email: String
        password: String
        savedBooks:
    }

    type Query {

    }

    type Mutation {
        
    }
`;

module.exports = typeDefs;
