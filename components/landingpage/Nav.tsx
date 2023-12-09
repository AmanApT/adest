import React from "react";
import "@/components/landingpage/Nav.css";

const Nav = () => {
  return (
    <nav>
      <div className="land-nav-left">Adest</div>

      <div className="land-nav-right">
        <ul>
          <li>PRODUCTS</li>
          <li>ABOUT US</li>
          <button className="get-started-btn" type="button">GET STARTED</button>
        </ul>
      </div>
    </nav>
  );
};

export default Nav;
