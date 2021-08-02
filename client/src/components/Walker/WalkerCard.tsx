import React from "react";

export default function WalkerCard({ user }: any) {
  const { username, about, email, address } = user;
  const { city, state } = address;
  return (
    <div className="walker-info-card">
      <div className="text alignRightSide">
        <h3>
          {city}, {state}
        </h3>
        <div className="about">
          <h3>About Me</h3>
          <div className = "aboutHolder scroll"><p>{about}</p></div>
          
        </div>
      </div>
      <div className="contactDogWalker text">
        <h3>Contact {username}</h3>
        <span>{email}</span>
      </div>
    </div>
  );
}
