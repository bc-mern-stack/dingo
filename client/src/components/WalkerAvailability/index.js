import React from "react";

import AddAvailability from "./AddAvailability";

export default function WalkerAvailabilty({ user }) {
  return (
    <>
      <h1 className="blackBar">Availability</h1>
      <AddAvailability user={user} />
    </>
  );
}
