import { useState, useEffect } from "react";
import { projectFirestore } from "../firebase/config";
import { collection, onSnapshot } from "firebase/firestore";
import { auth } from "../firebase/config";

const useFirestore = () => {
  // collection is refering to folder where images are added
  const [docs, setDocs] = useState([]);
  useEffect(
    () =>
      onSnapshot(collection(projectFirestore, `users/${auth.currentUser.uid}/images/`), (snapshot) =>
        setDocs(snapshot?.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
      ),
    []
  );
  return { docs };
};

const useFirestoreFriends = () => {
  const [friendData, setFriendData] = useState([]);

  useEffect(
    () =>
      onSnapshot(collection(projectFirestore, `users/`), (snapshot) =>
        setFriendData(snapshot?.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
      ),
    []
  );
  return { friendData };
};

const useFirestoreFriendsImages = (user) => {
  // collection is refering to folder where images are added
  const [friendImages, setFriendImages] = useState([]);
  useEffect(
    () =>
      onSnapshot(collection(projectFirestore, `users/${user}/images/`), (snapshot) =>
        setFriendImages(snapshot?.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
      ),
    []
  );
  return { friendImages };
};

export { useFirestore, useFirestoreFriends, useFirestoreFriendsImages };
