import { useState } from "react";

import AddAvailability from "./AddAvailability.tsx";
import ShowAvailability from "./ShowAvailability";

import "./custom.css";
import plusSign from "../../assets/add.png";
import eyeOpen from "../../assets/eye-open.png";
import eyeClosed from "../../assets/eye-closed.png";

export default function WalkerAvailabilty({ user, userParam }) {
  const [addAvailModal, setAddAvailModal] = useState(false);

  const [showAvailModal, setShowAvailModal] = useState(false);

  const toggleBoolean = (boolean) => {
    return boolean ? false : true;
  };

  const modalBgClickHandler = (e) => {
    if (e.target.classList.contains("add-avail-modal-bg")) {
      setAddAvailModal(toggleBoolean(addAvailModal));
    }
  };

  const addAvailabilitySection = (
    <>
      <h1 className="blackBar add-avail-bar">
        <span className="add-avail-bar-text">Add Availability</span>
        <article>
          <img
            className="add-avail-plus"
            alt="add availability plus sign"
            src={plusSign}
            onClick={() => {
              setAddAvailModal(toggleBoolean(addAvailModal));
            }}
          ></img>
        </article>
      </h1>
      {/* conditionally render availability with classes */}
      <div
        onClick={modalBgClickHandler}
        className={addAvailModal ? "add-avail-modal-bg" : "hidden"}
      >
        <AddAvailability user={user} />
      </div>
    </>
  );

  return (
    <div className="avail-container">
      <section className="show-avail-section">
        <h1 className="blackBar show-avail-bar">
          <span className="show-avail-bar-text">Availability</span>
          <article>
            <img
              className="show-avail-eye"
              alt={
                showAvailModal ? "show avail eye open" : "show avail eye closed"
              }
              src={showAvailModal ? eyeOpen : eyeClosed}
              onClick={() => {
                setShowAvailModal(toggleBoolean(showAvailModal));
              }}
            ></img>
          </article>
        </h1>
        {/* conditionally render availability with classes */}
        <div
          className={
            showAvailModal ? "show-avail-component-container" : "hidden"
          }
        >
          <ShowAvailability user={user} userParam={userParam} />
        </div>
      </section>
      <section className="add-avail-section">
        {userParam ? "" : addAvailabilitySection}
      </section>
    </div>
  );
}
