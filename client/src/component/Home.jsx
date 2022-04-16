import React from "react";

import Navbar from "./Navbar";
import Products from "./Products";

function Home() {
  return (
    <div >
      <Navbar />
      <br />
      <div>
        <Products />
      </div>
    </div>
  );
}

export default Home;
