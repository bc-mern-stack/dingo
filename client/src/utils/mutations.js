import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
        email
      }
    }
  }
`;
export const ADD_USER = gql`
  mutation addUser(
    $username: String!,
    $password: String!,
    $email: String!,
    $about: String,
    $address: addressInput!
  ) {
    addUser(
      username: $username,
      password: $password,
      email: $email,
      about: $about,
      address: $address,
    ) {
      token
      user {
        _id
        username
        email
      }
    }
  }
`;

export const ADD_FAVORITE = gql`
  mutation addFavorite($favoriteId: ID!) {
    addFavorite(favoriteId: $favoriteId) {
      _id
      username
      email
      favorites {
        _id
        username
      }
    }
  }
`;

export const REMOVE_FAVORITE = gql`
  mutation addFavorite($favoriteId: ID!) {
    addFavorite(favoriteId: $favoriteId) {
      _id
      username
      email
      favorites {
        _id
        username
      }
    }
  }
`;

export const ADD_AVAILABILITY = gql`
  mutation addAvailability(
    $date_start: Date!
    $date_end: Date!
    $rate: Int!
    $hours_available: hourlyInput!
  ) {
    addAvailability(
      date_start: $date_start
      date_end: $date_end
      rate: $rate
      hours_available: $hours_available
    ) {
      username
      availability {
        _id
        date_start
        date_end
        rate
        hours_available {
          mo
          tu
          we
          th
          fr
          sa
          su
        }
      }
    }
  }
`;

export const REMOVE_AVAILABILITY = gql`
  mutation removeAvailability($availId: ID!) {
    removeAvailability(availId: $availId) {
      username
      availability {
        _id
        date_start
        date_end
        rate
        hours_available {
          mo
          tu
          we
          th
          fr
          sa
          su
        }
      }
    }
  }
`;

export const ADD_DOGGO = gql`
  mutation addDoggo(
    $name: String!
    $size: Int!
    $age: Int!
    $breed: String!
    $behavior: String!
    $temperament: String!
    $picture: String!
    $instructions: String!
  ) {
    addDoggo(
      name: $name
      size: $size
      age: $age
      breed: $breed
      behavior: $behavior
      temperament: $temperament
      picture: $picture
      instructions: $instructions
    ) {
      username
      doggos {
        _id
        name
        size
        age
        breed
        behavior
        temperament
        picture
        instructions
      }
    }
  }
`;

export const REMOVE_DOGGO = gql`
  mutation removeDoggo($doggoId: ID!) {
    removeDoggo(doggoId: $doggoId) {
      username
      doggos {
        _id
        name
        size
        age
        breed
        behavior
        temperament
        picture
        instructions
      }
    }
  }
`;

export const ADD_APPOINTMENT = gql`
  mutation addAppointment(
    $owner: ID!
    $walker: ID!
    $date: Date!
    $hour: Int!
    $doggos: [ID]
  ) {
    addAppointment(
      owner: $owner
      walker: $walker
      date: $date
      hour: $hour
      doggos: $doggos
    ) {
      _id
      owner {
        _id
        username
      }
      walker {
        _id
        username
      }
      date
      hour
      doggos {
        _id
        name
      }
    }
  }
`;

export const REMOVE_APPOINTMENT = gql`
  mutation removeAppointment($appId: ID!) {
    removeAppointment(appId: $appId) {
      _id
    }
  }
`;
