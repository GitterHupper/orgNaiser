import React, { useState, useEffect } from "react";
import { useAuth } from "../../Contexts/AuthContexts";
import "./UpdateProfilePic.css";
import { Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import "antd/dist/antd.css";

export default function UpdateProfilePic({ photoBin, setPhotoBin }) {
  const { currentUser } = useAuth();
  const [preview, setPreview] = useState();
  const [photourl, setPhotoURL] = useState(
    "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"
  );
  useEffect(() => {
    if (!photoBin) {
      setPreview(undefined);
      return;
    }
    const objectUrl = URL.createObjectURL(photoBin);
    setPreview(objectUrl);

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl);
  }, [photoBin]);

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files[0].size) setPhotoBin(e.target.files[0]);
  };

  useEffect(() => {
    if (currentUser?.photoURL) setPhotoURL(currentUser.photoURL);
  }, [currentUser]);

  return (
    <div className="">
      <label className="UpdatePFPBtn btn btn-secondary setter">
        <input type="file" onChange={handleChange} className="d-none" />
        <span className="">Set Profile Picture</span>
      </label>
      <Avatar
        className="avatar_icon"
        shape="circle"
        size={64}
        icon={<UserOutlined />}
        src={preview ? preview : currentUser ? currentUser.photoURL : photourl}
      />
    </div>
  );
}
