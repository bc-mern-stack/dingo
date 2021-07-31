import React, { useState } from "react";
import { Route, useHistory } from "react-router-dom";
import StateList from "./StateList";

import { useMutation } from "@apollo/client";
import { ADD_USER } from "../../utils/mutations";

import Auth from "../../utils/auth";

function SignUp() {
  const history = useHistory();

  const [formState, setFormState] = useState({
    email: "",
    username: "",
    password: "",
    about: "",
  });

  const [addressFormState, setAddressFormState] = useState({
    street: "",
    city: "",
    state: "",
    zip: "",
    phone_number: "",
  });

  const userData = { ...formState, address: addressFormState };

  const [addUser, { error }] = useMutation(ADD_USER);

  const handleChangeAddress = (event) => {
    const { name, value } = event.target;

    setAddressFormState({
      ...addressFormState,
      [name]: value,
    });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    userData.address.zip = parseInt(userData.address.zip);

    try {
      const { data } = await addUser({
        variables: { ...userData },
      });
      Auth.login(data.addUser.token);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <section className="totalLayout">
      <div className="leftLayout">
        <div className="blueOutline">
          <h1>
            Sign up to find dog walkers in your area or walk dogs for others.
          </h1>
        </div>
      </div>

      <div className="rightLayout">
        <div className="alignForm">
          <Route
            render={() => (
              <h1
                type="button"
                onClick={() => {
                  history.push("/Login");
                }}
              >
                Login Instead
              </h1>
            )}
          />

          <form>
            <label htmlFor="email">Email:</label>
            <input
              type="text"
              name="email"
              autoComplete=""
              value={formState.email}
              onChange={handleChange}
            />

            <label htmlFor="username">Username:</label>
            <input
              type="text"
              name="username"
              autoComplete=""
              value={formState.username}
              onChange={handleChange}
            />

            <label htmlFor="password">Password:</label>
            <input
              type="password"
              name="password"
              autoComplete=""
              value={formState.password}
              onChange={handleChange}
            />

            <span>ADDRESS</span>
            <label htmlFor="street">Street:</label>
            <input
              type="text"
              name="street"
              autoComplete=""
              value={addressFormState.street}
              onChange={handleChangeAddress}
            />

            <label htmlFor="city">City:</label>
            <input
              type="text"
              name="city"
              autoComplete=""
              value={addressFormState.city}
              onChange={handleChangeAddress}
            />

            <label htmlFor="state">State:</label>
            <StateList
              addressFormState={addressFormState}
              handleChangeAddress={handleChangeAddress}
            />

            <label htmlFor="street">Zip Code:</label>
            <input
              type="text"
              name="zip"
              autoComplete=""
              value={addressFormState.zip}
              onChange={handleChangeAddress}
            />

            <label htmlFor="street">Phone (optional):</label>
            <input
              type="text"
              name="phone_number"
              autoComplete=""
              value={addressFormState.phone_number}
              onChange={handleChangeAddress}
            />
            {error && <div className="error">{error.toString()}</div>}
          </form>
        </div>
        <div className="buttonDiv">
          <button
            className="greenButton"
            type="submit"
            onClick={handleFormSubmit}
          >
            Sign Up
          </button>
        </div>
      </div>

      <div className="bottomBlue"></div>
    </section>
  );
}

export default SignUp;
