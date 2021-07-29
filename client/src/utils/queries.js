import { gql } from "@apollo/client";

export const QUERY_USERS = gql`
  query Query {
    users {
      _id
      username
      email
      about
      address {
        _id
        street
        city
        state
        zip
        phone_number
        lat
        lng
      }
      favorites {
        _id
        username
      }
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
      doggos {
        _id
        name
        size
        age
        breed
        behavior
        instructions
        temperament
        picture
      }
      appointments {
        _id
        date
      }
    }
  }
`;

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
      about
      address {
        _id
        street
        city
        state
        zip
        phone_number
        lat
        lng
      }
      favorites {
        _id
        username
      }
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
      doggos {
        _id
        name
        size
        age
        breed
        behavior
        temperament
        picture
      }
      appointments {
        _id
        date
        owner
        walker
        hour
        doggos
      }
    }
  }
`;

export const QUERY_ME = gql`
  query me {
    me {
      _id
      username
      email
      about
      address {
        _id
        street
        city
        state
        zip
        phone_number
        lat
        lng
      }
      favorites {
        _id
        username
      }
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
      doggos {
        _id
        name
        size
        age
        breed
        behavior
        instructions
        temperament
        picture
      }
      appointments {
        _id
        date
        owner
        walker
        hour
        doggos
      }
    }
  }
`;