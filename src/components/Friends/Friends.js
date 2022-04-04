import React, { useState } from "react";
import FriendModal from "../Modal/FriendModal";
import { Avatar as AvatarAntd } from "antd";
import { useAuth } from "../../Contexts/AuthContexts";
import { Tab, Row, Col, ListGroup } from "react-bootstrap";
import { useFirestoreFriends } from "../../hooks/useFirestore";
import "./Friends.css";

export function Friends() {
  const { currentUser } = useAuth();
  const [modalShow, setModalShow] = useState(false);
  const [userModal, setUserModal] = useState(null);
  const { friendData } = useFirestoreFriends();

  return (
    <>
      <Tab.Container id="list-group-tabs-example">
        <Row>
          <Col sm={4}>
            <ListGroup className="friendListBG">
              {friendData &&
                friendData.map((item) => {
                  if (item.id === currentUser.uid) {
                  } else {
                    return (
                      <ListGroup.Item
                        className="FriendLink"
                        action
                        key={item?.id[5]}
                        href="#items"
                        onClick={(e) => {
                          setUserModal(item);
                          e.target.closest(".list-group-item").classList.add("active");
                          setModalShow(true);
                          document.querySelector("body").setAttribute("style", "overflow-Y: hidden !important");
                        }}
                      >
                        <AvatarAntd
                          className="headerAvatar"
                          shape="circle"
                          size={52}
                          src={
                            item?.userPhoto
                              ? item.userPhoto
                              : "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"
                          }
                        />
                        {"  "}
                        <span className="FriendsUsername">{item?.username}</span>
                      </ListGroup.Item>
                    );
                  }
                })}
            </ListGroup>
          </Col>
          <Col sm={8}>
            <Tab.Content className="friendListContent">
              <Tab.Pane eventKey="#items">
                {modalShow && (
                  <FriendModal
                    userModal={userModal}
                    show={modalShow}
                    onHide={() => {
                      setModalShow(false);
                      setUserModal(null);
                      Array.from(document.querySelectorAll(".list-group-item")).map((el) =>
                        el.classList.remove("active")
                      );
                    }}
                  />
                )}
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    </>
  );
}
