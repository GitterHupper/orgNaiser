import react from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import { Modal, Button } from "react-bootstrap";
import ProgressBarMultiple from "../ProgressBar/ProgressBarMultiple";

export default function UploadModal(props) {
  return (
    <Modal show={props.show} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">Drag and Drop Images</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div
          onDragEnter={props.handleDragEnter}
          onDragLeave={props.handleDragLeave}
          onDragOver={props.handleDragOver}
          onDrop={props.handleDrop}
          className="drag-area"
        >
          {props.preview ? (
            <>
              <ImageList sx={{ width: "99%", height: "220px" }} className="preview-wrapper" cols={5} rowHeight={74}>
                {props.preview &&
                  props.preview.map((item, i) => (
                    <ImageListItem key={i} className="preview-wrap" onClick={() => {}}>
                      <img
                        src={item}
                        alt={`preview_images_${i}`}
                        className="preview-images"
                        onClick={() => props.handleDeleteClick(i)}
                      />
                    </ImageListItem>
                  ))}
              </ImageList>
              <ProgressBarMultiple progress={props.progress} />
              <label htmlFor="alreadyFiles" className="btn btn-secondary alreadyFiles">
                Browse File
                <input id="alreadyFiles" type="file" hidden onChange={props.handleFiles} multiple />
              </label>
              <button className="btn btn-success uploadSelectedFiles" value="Upload" onClick={props.handleClickUpload}>
                Upload
              </button>
            </>
          ) : (
            <>
              <p className="header">Drag & Drop to Upload File</p>
              <span className="span">OR</span>

              <label htmlFor="BrowseFiles" className="btn btn-secondary">
                Browse File
                <input id="BrowseFiles" type="file" hidden onChange={props.handleFiles} multiple />
              </label>
            </>
          )}
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}
