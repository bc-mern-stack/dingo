import { React, useState } from "react";
import { Route } from "react-router-dom";
import ReactDOM from "react-dom";
import Modal from "react-modal";

import bluePattern from "../../assets/bluePattern.png";
import logo from "../../assets/dingoLogo.png";
import illustration from "../../assets/illustration.png";
import dog1 from "../../assets/dog1.png";
import dog2 from "../../assets/dog2.png";
import dog3 from "../../assets/dog3.png";
import user from "../../assets/user.png";
import { element } from "prop-types";
import close from "../../assets/close.png";
const customStyles = {
  overlay: {
    backgroundColor: null,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  content: {
    backgroundColor: "#F7931E",
    borderRadius: "20px",
    outline: "none",
    width: "270px",
    height: "325px",
    borderRadius: "20px",

    boxShadow: "0 7px 10px rgb(0, 0, 0)",
    border: "none",
    position: "none",
  },
};
function Home() {
  ///**************modal**********************/

  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }
  function closeModal() {
    setIsOpen(false);
  }
  const [FirstTimeUser, TakeMeToMyChoice] = useState(false);

  function LetMeGo() {
    TakeMeToMyChoice(false);
  }

  /**********************************************/
  return (
    <div className="allHomeElements">
      {FirstTimeUser ? (
        <div className="centeredView">
          <img
            onClick={LetMeGo}
            className="closeModal"
            src={close}
            alt="close"
          />

          <div className="modalViewLeft">
            <h1 className="textStyle">Do you want to walk dogs?</h1>
            <Route
              render={({ history }) => (
                <button
                  type="button"
                  className="buttonClose button textStyle"
                  onClick={() => {
                    history.push("/DogWalker");
                  }}
                >
                  Let's go
                </button>
              )}
            />
          </div>
          <div className="modalViewRight">
            <h1 className="textStyle">Need someone to walk dogs?</h1>
            <Route
              render={({ history }) => (
                <button
                  type="button"
                  className="buttonClose button textStyle"
                  onClick={() => {
                    history.push("/User");
                  }}
                >
                  Let's go
                </button>
              )}
            />{" "}
          </div>
        </div>
      ) : (
        ""
      )}

      <div className="bluePat">
        <div className="logoAndLogin">
          <img className="logo" src={logo} alt="logo" />
          <Route
            render={({ history }) => (
              <div
                className="signUpBox"
                type="button"
                onClick={() => {
                  history.push("/SignUp");
                }}
              >
                First time user?
                <img className="user" src={user} alt="user" />
              </div>
            )}
          />
        </div>
        <div className="navigation">
          <div className="element left">Location</div>
          <section className="line"></section>

          <Route
            render={({ history }) => (
              <div
                className="element"
                type="button"
                onClick={() => {
                  history.push("/User");
                }}
              >
                Owner appointments
              </div>
            )}
          />

          <section className="line"></section>
          <Route
            render={({ history }) => (
              <div
                className="element"
                type="button"
                onClick={() => {
                  history.push("/DogWalker");
                }}
              >
                Walking for others
              </div>
            )}
          />

          <section className="line"></section>

          <div onClick={openModal} className="endNav element right">
            Find new dog walkers
          </div>

          <section className="seacrhCircle"></section>
        </div>

        {modalIsOpen ? (
          <div className="bothDropDowns">
            <div className="dropDownlocation">
              <img
                onClick={closeModal}
                className="close"
                src={close}
                alt="close"
              />

              <div>
                <p className="textLocation">New Location Search</p>

                <form>
                  <input
                    className="newLocationSearchInputHome"
                    placeholder="New Search"
                    type="text"
                    name="name"
                  />
                  <button
                    className="newLocationSearchButtonHome"
                    type="submit"
                  ></button>
                </form>
              </div>
            </div>

            <div className="dropDown">
              <img
                onClick={closeModal}
                className="closeRight"
                src={close}
                alt="close"
              />
              <div className="contentHome">
                <p>Dog Walkers In Your Area</p>
                <p>Milwaukee Wisconsin</p>
                <div className="list">
                  <ul className="dogWalkers scroll">
                    <li>Jane Doe</li>
                    <li>John Smith</li>
                    <li>Steve Smith</li>
                    <li>Jack White</li>
                    <li>Jane Smith</li>
                    <li>John White</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>

      <div className="orangeBox">
        <img className="illustration" src={illustration} alt="illustration" />
      </div>
      <div className="dogsRow">
        <img src={dog1} alt="dog1" />
        <img src={dog2} alt="dog2" />
        <img src={dog3} alt="dog3" />
      </div>
      <div className="bottomBorder"></div>
    </div>
  );
}

export default Home;
