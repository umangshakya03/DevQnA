import React from "react";
import { FallingLines } from "react-loader-spinner";

const Loader = () => {
  return (
    <div
      className="loader"
      style={{
        display: "grid",
        placeContent: "center",
      }}
    >
      <FallingLines
        color=" #1E90FF"
        width="100"
        visible={true}
        ariaLabel="falling-lines-loading"
      />
    </div>
  );
};

export default Loader;
