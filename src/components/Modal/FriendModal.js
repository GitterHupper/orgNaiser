import React, { useState } from "react";
import Modal from "../Modal/Modal";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import { motion } from "framer-motion";
import { Avatar as AvatarAntd } from "antd";
import { Modal as ReactModal, Button } from "react-bootstrap";
import { useFirestoreFriendsImages } from "../../hooks/useFirestore";

import "./Modal.css";

export default function FriendModal(props) {
  const [selectedImg, setSelectedImg] = useState(null);

  const FriendsImages = useFirestoreFriendsImages(props.userModal?.id);

  let sortedDocs;
  if (FriendsImages) sortedDocs = [].concat(FriendsImages.friendImages).sort((a, b) => b.createdAt - a.createdAt);
  return (
    <ReactModal
      show={props.show}
      onHide={props.onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <ReactModal.Header closeButton>
        <ReactModal.Title id="contained-modal-title-vcenter">
          <AvatarAntd
            className="headerAvatar"
            shape="circle"
            size={52}
            src={
              props.userModal?.userPhoto
                ? props.userModal?.userPhoto
                : "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"
            }
          />
          {"  "}
          {props.userModal?.username}
        </ReactModal.Title>
      </ReactModal.Header>
      <ReactModal.Body>
        <h4>Users biography</h4>
        <p>
          Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam.
          Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
        </p>
        <ImageList
          sx={{ width: "100%", height: "auto" }}
          cols={3}
          rowHeight={164}
          style={{ maxHeight: "350px", minHeight: "350px" }}
        >
          {FriendsImages &&
            sortedDocs.map((item, i) => (
              <ImageListItem
                key={i}
                className="img-wrap-friends"
                onClick={() => {
                  setSelectedImg(item.url);
                }}
              >
                <motion.img
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                  src={item.url}
                  alt="friend_images"
                  loading="lazy"
                />
              </ImageListItem>
            ))}
        </ImageList>

        {selectedImg && <Modal selectedImg={selectedImg} setSelectedImg={setSelectedImg} />}
      </ReactModal.Body>
      <ReactModal.Footer>
        <Button
          onClick={() => {
            props.onHide();
          }}
        >
          Close
        </Button>
      </ReactModal.Footer>
    </ReactModal>
  );
}
