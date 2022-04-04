import React, { useState } from "react";
import ProgressBar from "../ProgressBar/ProgressBar";
import { checkImageWidth, resizeImage } from "./ResizeImg";
import DragAndDrop from "./DragAndDrop";
import { Alert } from "react-bootstrap";
import "./UploadForm.css";

const UploadForm = () => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const validTypes = ["image/jpeg", "image/png"];

  const handleUpload = async (img) => {
    const width = await checkImageWidth(img);
    if (width <= 1440) {
      setFile(img);
    } else {
      const resizedImage = await resizeImage(img);
      setFile(resizedImage);
    }
  };

  const changeHandler = (event) => {
    let selected = event.target.files[0];
    if (selected && validTypes.includes(selected.type)) {
      setError(null);
      handleUpload(selected);
    } else {
      setFile(null);
      setError("Error Getting File or File Type Doesn't Match ( jpeg / png )");
    }
  };

  return (
    <>
      <form className="form-class">
        <label className="custom-file-upload">
          <input type="file" onChange={changeHandler} />
          <span className="plusicon">+</span>
        </label>
        <div className="output">
          {error && <div className="error"> {error} </div>}
          {file && <div className="success"> {file.name} </div>}
          {file && <ProgressBar file={file} setFile={setFile} setSuccess={setSuccess} />}
          {success && (
            <>
              <Alert variant="success" className="successAlert" onClose={() => setSuccess(false)} dismissible>
                <Alert.Heading>Image Uploaded Successfully!</Alert.Heading>
                <p>Keep Adding more Images and Building Your Gallery !</p>
              </Alert>
            </>
          )}
        </div>
      </form>

      <DragAndDrop />
    </>
  );
};

export default UploadForm;
