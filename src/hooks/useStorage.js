import { useState, useEffect } from "react";
import { projectStorage, projectFirestore, timestamp } from "../firebase/config";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";
import { auth } from "../firebase/config";

const useStorage = (file) => {
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);
  const [url, setUrl] = useState(null);

  useEffect(() => {
    // references
    const storageRef = ref(projectStorage, `users/${auth.currentUser.uid}/images/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        let percentage = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        setProgress(percentage);
      },
      (err) => {
        setError(err);
      },
      async () => {
        await getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          try {
            addDoc(collection(projectFirestore, `users/${auth.currentUser.uid}/images/`), {
              url,
              createdAt: timestamp,
            });
          } catch (err) {
            setError(err);
          }
          setUrl(url);
        });
      }
    );
  }, [file]);

  return { progress, url, error };
};

export default useStorage;
