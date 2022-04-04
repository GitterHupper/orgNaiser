import React, { useState } from "react";
import Header from "../Header/Header";
import UploadForm from "../UploadForm/UploadForm";
import ImageGrid from "../ImageGrid/ImageGrid";
import Modal from "../Modal/Modal";
import AccountMenu from "../Header/AccountMenu";
import { Friends } from "../Friends/Friends";
import "../../index.css";
import "./MainProgram.css";

const MainProgram = () => {
  const toReset = Array.from(document.querySelectorAll(".ResettingForMainProgram"));
  toReset.forEach((elem) => {
    elem.style.maxWidth = "1060px";
    elem.classList.remove("align-items-center");
  });
  const [selectedImg, setSelectedImg] = useState(null);

  return (
    <div className="APP">
      {/* <Dashboard /> */}
      <Header />
      <AccountMenu />
      <UploadForm />
      <Friends setSelectedImg={setSelectedImg} />
      <ImageGrid setSelectedImg={setSelectedImg} />
      {selectedImg && <Modal selectedImg={selectedImg} setSelectedImg={setSelectedImg} />}
    </div>
  );
};

export default MainProgram;
