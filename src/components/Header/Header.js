import React from "react";
import "antd/dist/antd.css";
import "./Header.css";

const Header = () => {
  return (
    <div className="Header">
      {" "}
      <h1 className="orgNaiser">OrgNaiser</h1>
      <h2>Your Pictures</h2>
      <p>The only place you need to organize your gallery.</p>
    </div>
  );
};

export default Header;
