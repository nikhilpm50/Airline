import React, { useState } from "react";
import "./style.css";

function Counter({ count, decrement, increment }) {
  return (
    <div className="counter-div">
      <button className="decrement" onClick={decrement}>
        -
      </button>
      <p>{count}</p>
      <button className="increment" onClick={increment}>
        +
      </button>
    </div>
  );
}

export default Counter;
