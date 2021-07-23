// import the gql tagged template function
const { gql } = require("apollo-server-express");

// create our typeDefs
const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    favorites: [User]
  }

  type Availability {
    _id: ID
    date_range: String
    rate: Int
    hours_available: [Hourly]
    hours_busy: [Hourly]
  }

  type Hourly {
    _id: ID
    mo: [Int]
    tu: [Int]
    we: [Int]
    th: [Int]
    fr: [Int]
    sa: [Int]
    su: [Int]
  }

  type Appointment {
    _id: ID
    owner: ID
    walker: ID
    date: String
    hour: String
    doggos: [Doggo]
  }

  type Doggo {
    _id: ID
    name: String
    size: String
    behavior: String
    temperament: String
    picture: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    me: User
    users: [User]
    user(username: String!): User
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    addFriend(friendId: ID!): User
  }
`;

// export the typeDefs
module.exports = typeDefs;
