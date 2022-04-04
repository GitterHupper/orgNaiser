import React, { useState, useEffect } from "react";
import UploadModal from "../Modal/UploadModal";
import { projectStorage, projectFirestore, timestamp } from "../../firebase/config";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";
import { auth } from "../../firebase/config";
import { checkImageWidth, resizeImage } from "./ResizeImg";
import { Alert } from "react-bootstrap";
import "./UploadForm.css";

export default function DragAndDrop() {
  const [modalShow, setModalShow] = useState(false);
  const [dragEnter, setDragEnter] = useState(false);
  const [files, setFiles] = useState(null);
  const [preview, setPreview] = useState(undefined);

  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const [progress, setProgress] = useState(0);

  const validTypes = ["image/jpeg", "image/png"];
  const objectUrls = [];
  const countOfMultipleUploadPromises = [];

  const dragAreaColor = document.querySelector(".drag-area");
  if (dragAreaColor) {
    dragEnter ? (dragAreaColor.style.background = "#e7e7e7") : (dragAreaColor.style.background = "#ffffff");
  }

  useEffect(() => {
    if (!files || files.length === 0) {
      setPreview(undefined);
      return;
    }
    setDragEnter(false);

    Array.from(files).map((file) => objectUrls.push(URL.createObjectURL(file)));

    setPreview(objectUrls);

    // free memory when ever this component is unmounted
    return () => objectUrls.map((url) => URL.revokeObjectURL(url));
  }, [files]);

  const handleFiles = (e) => {
    if (e.target.files[0].size && files) {
      let arr = [...files, ...e.target.files];
      setFiles(arr);
    } else setFiles(e.target.files);
  };
  const handleDrop = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setDragEnter(false);
    if (e.dataTransfer.files[0].size && files) {
      let arrDrop = [...files, ...e.dataTransfer.files];
      setFiles(arrDrop);
    } else setFiles(e.dataTransfer.files);
  };
  const handleDragEnter = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setDragEnter(true);
  };
  const handleDragLeave = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setDragEnter(false);
  };
  const handleDragOver = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setDragEnter(true);
  };

  const handleDeleteClick = (indexOf) => {
    let index = Number(indexOf);
    const copyOfFiles = Array.from(files);
    copyOfFiles.splice(index, 1);
    setFiles(copyOfFiles);
    if (copyOfFiles.length === 0) setPreview(undefined);
  };

  const handleUpload = async (file, i) => {
    const width = await checkImageWidth(file);
    if (width <= 1440) {
      countOfMultipleUploadPromises.push(file);
    } else {
      const resizedImage = await resizeImage(file);
      if (resizedImage) await countOfMultipleUploadPromises.push(resizedImage);
    }
    if (i === files.length - 1) {
      uploadMultipleImages(countOfMultipleUploadPromises);
    }
  };

  const handleClickUpload = () => {
    for (let i = 0; i < files.length; i++) {
      if (validTypes.includes(files[i].type)) {
        setError(undefined);
        handleUpload(files[i], i);
      } else {
        setError(true);
      }
    }
  };

  const progressSetter = async (promises) => {
    let count = 0;
    setProgress(0);
    for (const promise of promises) {
      promise.then(() => {
        count++;
        setProgress((count * 100) / promises.length);
      });
    }
    try {
      await Promise.all(promises);
      setModalShow(false);
      setFiles(undefined);
      setPreview(undefined);
      setSuccess(true);
    } catch (err) {
      setError(true);
    }
  };

  const uploadMultipleImages = (filePromises) => {
    const promises = [];
    filePromises.map((file) => {
      const storageRef = ref(projectStorage, `users/${auth.currentUser.uid}/images/${file.name}`);

      const uploadTask = uploadBytesResumable(storageRef, file);
      promises.push(uploadTask);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const prog = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        },
        (error) => console.log(error),
        async () => {
          await getDownloadURL(uploadTask.snapshot.ref).then((url) => {
            try {
              addDoc(collection(projectFirestore, `users/${auth.currentUser.uid}/images`), {
                url,
                createdAt: timestamp,
              });
            } catch (err) {
              setError(true);
            }
          });
        }
      );
    });
    progressSetter(promises);
  };

  return (
    <div>
      {modalShow && (
        <UploadModal
          error={error}
          handleFiles={handleFiles}
          handleDragEnter={handleDragEnter}
          handleDragLeave={handleDragLeave}
          handleDragOver={handleDragOver}
          handleClickUpload={handleClickUpload}
          handleDrop={handleDrop}
          handleDeleteClick={handleDeleteClick}
          preview={preview}
          progress={progress}
          files={files}
          show={modalShow}
          onHide={() => {
            setModalShow(false);
          }}
        />
      )}
      {success && (
        <>
          <Alert variant="success" className="successAlert" onClose={() => setSuccess(false)} dismissible>
            <Alert.Heading>All Images Uploaded Successfully!</Alert.Heading>
            <p>Keep Adding more Images and Building Your Gallery !</p>
          </Alert>
        </>
      )}
      {error && (
        <>
          <Alert variant="danger" onClose={() => setError(false)} dismissible>
            <Alert.Heading>Error Uploading Images, Please Try Again !</Alert.Heading>
            <p>Keep Adding more Images and Building Your Gallery !</p>
          </Alert>
        </>
      )}

      <button onClick={() => setModalShow(true)} className="btn btn-primary dragUpload button-17">
        upload
      </button>
    </div>
  );
}
