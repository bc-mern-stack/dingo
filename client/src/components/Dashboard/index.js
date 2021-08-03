import { useState } from "react";
import { Link } from "react-router-dom";

import Auth from "../../utils/auth";

import SearchModal from "./SearchModal";

import logo from "../../assets/dingoLogo.png";
import illustration from "../../assets/illustration.png";
import dog1 from "../../assets/dog1.png";
import dog2 from "../../assets/dog2.png";
import dog3 from "../../assets/dog3.png";

function Dashboard() {
  const [searchModalOpen, setSearchModal] = useState(false);


  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };

  return (
    <div className="allHomeElements">
      <div className="bluePat">
        <div className="logoAndLogin">
          <img className="logo" src={logo} alt="logo" />
          <div className="signUpBox" onClick={logout}>
            Log out
          </div>
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

          <div onClick={() => setSearchModal(true)} className="endNav element right">
            Find new dog walkers
          </div>

          <section className="seacrhCircle"></section>
        </div>

        {searchModalOpen ? (
          <SearchModal
          searchModalOpen={searchModalOpen} setSearchModal={ setSearchModal}
          ></SearchModal>
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

export default Dashboard;