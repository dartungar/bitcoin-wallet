import React, { useEffect, useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import Spinner from "react-bootstrap/Spinner";

const FirstTimeModal = () => {
  const {
    state: { seed },
    actions: { affirmSeed },
  } = useContext(AppContext);

  useEffect(() => {
    affirmSeed();
  }, []);
  return (
    <div className="seed-info-modal">
      <h5>Your seed:</h5>
      {seed ? (
        <>
          {seed}
          <br />
          <a href="/">to home page</a>
        </>
      ) : (
        <Spinner animation="border" />
      )}
    </div>
  );
};

export default FirstTimeModal;
