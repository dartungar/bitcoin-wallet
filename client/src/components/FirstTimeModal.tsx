import React, { useEffect, useContext } from "react";
import { AppContext } from "../context/AppContext";
import Spinner from "react-bootstrap/Spinner";

const FirstTimeModal: React.FC = () => {
  const {
    state: { seed },
    actions: { affirmSeed },
  } = useContext(AppContext);

  // FirstTimeModal is rendered if seed is not present in local storage
  // so, on render we get seed and save it to local storage
  useEffect(() => {
    affirmSeed();
  }, []);

  return (
    <div className="seed-info-modal text-light">
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
