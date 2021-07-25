// import the gql tagged template function
const { gql } = require("apollo-server-express");

// create our typeDefs
const typeDefs = gql`
  scalar Date

  type User {
    _id: ID
    username: String
    email: String
    about: String
    address: Address
    favorites: [User]
    availability: [Availability]
    doggos: [Doggo]
    appointments: [Appointment]
  }

  type Address {
    _id: ID
    street: String
    city: String
    state: String
    zip: Int
    phone_number: String
    lat: Float
    lng: Float
  }

  input addressInput {
    street: String
    city: String
    state: String
    zip: Int
    phone_number: String
    lat: Float
    lng: Float
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
    owner: User
    walker: User
    date: String
    hour: Int
    doggos: [Doggo]
  }

  type Doggo {
    _id: ID
    name: String
    size: Int
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
    addUser(
      username: String!
      email: String!
      password: String!
      about: String
      address: addressInput!
    ): Auth
    addFavorite(favoriteId: ID!): User
    removeFavorite(favoriteId: ID!): User
    addAvailability(
      date_start: Date!
      date_end: Date!
      rate: Int!
      hours_available: hourlyInput!
    ): User
    removeAvailability(availId: ID!): User
    addDoggo(
      name: String!
      size: Int!
      behavior: String!
      temperament: String!
      picture: String!
    ): User
    removeDoggo(doggoId: ID!): User
    addAppointment(
      owner: ID!
      walker: ID!
      date: Date!
      hour: Int!
      doggos: [ID]
    ): Appointment
    removeAppointment(appId: ID!): Appointment
  }
`;

// export the typeDefs
module.exports = typeDefs;
