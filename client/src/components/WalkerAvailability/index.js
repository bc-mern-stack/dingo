import React from "react";

import AddAvailability from "./AddAvailability.tsx";
import ShowAvailability from "./ShowAvailability";

export default function WalkerAvailabilty({ user }) {
  return (
    <>
      <ShowAvailability user={user} />
      <AddAvailability user={user} />
    </>
  );
}
