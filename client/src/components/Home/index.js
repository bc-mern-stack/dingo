import { useState } from "react";
import { Link } from "react-router-dom";

import logo from "../../assets/dingoLogo.png";
import illustration from "../../assets/illustration.png";
import dog1 from "../../assets/dog1.png";
import dog2 from "../../assets/dog2.png";
import dog3 from "../../assets/dog3.png";

import SearchModal from "../Dashboard/SearchModal";

import AboutModal from "../AboutModal";

function Home() {
  const [searchModalOpen, setSearchModal] = useState(false);

  const [aboutModalOpen, setAboutModal] = useState(false);

  return (
    <div className="allHomeElements">
      <div className="bluePat">
        <div className="logoAndLogin">
          <img className="logo" src={logo} alt="logo" />

          <div className="" type="button"></div>
        </div>
        <nav className="navigation">
          <div className="element left">
            <Link to="/Login">
              <div className="element">Log in</div>
            </Link>
          </div>
          <section className="line"></section>
          <div className="element">
            <Link to="/SignUp">
              <span className="element">Sign up</span>
            </Link>
          </div>
          <section className="line"></section>
          <div className="element">
            <span
              className="element"
              onClick={(e) => {
                console.log("true");
                return setAboutModal(!aboutModalOpen);
              }}
            >
              About{" "}
            </span>
          </div>
          <section className="line"></section>

          <div
            onClick={() => setSearchModal(true)}
            className="endNav element right"
          >
            Find a dog walker
          </div>

          <section className="seacrhCircle"></section>
        </nav>
        {searchModalOpen ? (
          <SearchModal
            searchModalOpen={searchModalOpen}
            setSearchModal={setSearchModal}
          ></SearchModal>
        ) : (
          ""
        )}
      </div>
      {aboutModalOpen ? (
        <AboutModal
          aboutModalOpen={aboutModalOpen}
          setAboutModal={setAboutModal}
        ></AboutModal>
      ) : (
        ""
      )}
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
