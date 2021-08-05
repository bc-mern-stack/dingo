import { useState } from "react";
import { Link } from "react-router-dom";

import logo from "../../assets/dingoLogo.png";
import illustration from "../../assets/illustration.png";
import dog1 from "../../assets/dog1.png";
import dog2 from "../../assets/dog2.png";
import dog3 from "../../assets/dog3.png";

import SearchModal from "../Dashboard/SearchModal";

function Home() {

  const [searchModalOpen, setSearchModal] = useState(false);

  return (
    <div className="allHomeElements">
      

      <div className="bluePat">
        <div className="logoAndLogin">
          <img className="logo" src={logo} alt="logo" />

          <div className="" type="button"></div>
        </div>
        <nav className="navigation">
          <div className="element left hoverLink">
            <Link to="/Login">
              <div>Log in</div>
            </Link>
          </div>
          <section className="line"></section>
          <div className="element hoverLink">
            <Link to="/SignUp">
              <span >Sign up</span>
            </Link>
          </div>
          <section className="line"></section>
          <div className="element hoverLink">
            <Link to="/About"> 
              <span className="element">About</span>
            </Link>
          </div>
          <section className="line"></section>

          <div  onClick={() =>setSearchModal(true)} className="endNav element right">
           <span className = "notHidden">Find a dog walker</span> 
           <span className = "hideFind">Find</span>
          </div>

          <section className="seacrhCircle loggedCircle"></section>
        </nav>

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

export default Home;
