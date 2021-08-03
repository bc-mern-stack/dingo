import { useState } from "react";
import { Link } from "react-router-dom";

import bluePattern from "../../assets/bluePattern.png";
import logo from "../../assets/dingoLogo.png";
import illustration from "../../assets/illustration.png";
import dog1 from "../../assets/dog1.png";
import dog2 from "../../assets/dog2.png";
import dog3 from "../../assets/dog3.png";
import user from "../../assets/user.png";
import close from "../../assets/close.png";

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

  const firstTimeUserModal = (
    <div className="centeredView">
      <img onClick={LetMeGo} className="closeModal" src={close} alt="close" />

      <div className="modalViewLeft">
        <h1 className="textStyle">Do you want to walk dogs?</h1>
        <Link to="/DogWalker">
          <button type="button" className="buttonClose button textStyle">
            Let's go
          </button>
        </Link>
      </div>
      <div className="modalViewRight">
        <h1 className="textStyle">Need someone to walk dogs?</h1>
        <Link to="/User">
          <button
            type="button"
            className="buttonClose button textStyle"
            onClick={(e) => e.preventDefault()}
          >
            Let's go
          </button>
          &nbsp;
        </Link>
      </div>
    </div>
  );

  /**********************************************/
  return (
    <div className="allHomeElements">
      {FirstTimeUser ? firstTimeUserModal : ""}

      <div className="bluePat">
        <div className="logoAndLogin">
          <img className="logo" src={logo} alt="logo" />
          <Link to="/SignUp">
            <div className="signUpBox" type="button">
              First time user?
              <img className="user" src={user} alt="user" />
            </div>
          </Link>
        </div>
        <div className="navigation">
          <div className="element left">Location</div>
          <section className="line"></section>
          <div className="element">
            <Link to="/User">
              <span className="element">Owner appointments</span>
            </Link>
          </div>
          <section className="line"></section>
          <div className="element">
            <Link to="/DogWalker">
              <span className="element">Walking for others</span>
            </Link>
          </div>
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
