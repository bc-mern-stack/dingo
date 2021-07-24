// import the gql tagged template function
const { gql } = require("apollo-server-express");

// create our typeDefs
const typeDefs = gql`
  scalar Date

  type User {
    _id: ID
    username: String
    email: String
    favorites: [User]
    availability: [Availability]
    doggos: [Doggo]
    appointments: [Appointment]
  }

  type Availability {
    _id: ID
    date_start: Date
    date_end: Date
    rate: Int
    hours_available: [Hourly]
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

  input hourlyInput {
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
    addFavorite(favoriteId: ID!): User
    removeFavorite(favoriteId: ID!): User
    addAvailability(
      date_start: Date!
      date_end: Date!
      rate: Int!
      hours_available: hourlyInput!
    ): User
    removeAvailability(availId: ID!): User
  }
`;

// export the typeDefs
module.exports = typeDefs;
