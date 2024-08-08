/* DEPENDENCIES */
import { gql } from "@apollo/client";

/* QUERIES */
export const QUERY_USER = gql`
  {
    me {
      _id
      username
      email
      savedBooks {
        bookId
        authors
        image
        description
        title
        link
      }
    }
  }
`;
