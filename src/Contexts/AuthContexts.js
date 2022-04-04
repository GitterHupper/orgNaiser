import React, { useState, useEffect, useContext } from "react";
import { auth } from "../firebase/config";
import { projectStorage } from "../firebase/config";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
  updateEmail,
  updatePassword,
  reauthenticateWithCredential,
  EmailAuthProvider,
  updateProfile,
} from "firebase/auth";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);

  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const signup = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const logout = () => {
    signOut(auth);
  };

  const reAuthenticate = (userProvidedPassword) => {
    const credentials = EmailAuthProvider.credential(auth.currentUser.email, userProvidedPassword);
    return reauthenticateWithCredential(auth.currentUser, credentials);
  };

  const resetPassword = (email) => {
    return sendPasswordResetEmail(auth, email);
  };

  const updateProfileEmail = (email) => {
    return updateEmail(auth.currentUser, email);
  };

  const updateProfilePassword = (password) => {
    return updatePassword(auth.currentUser, password);
  };

  const updateProfileView = async (file, displayName) => {
    if (file === "signin") {
      return updateProfile(auth.currentUser, {
        displayName,
      });
    } else {
      const fileRef = ref(projectStorage, `users/${auth.currentUser.uid}/pfp/${file.name}`);

      const snapshot = await uploadBytes(fileRef, file);
      const photoURL = await getDownloadURL(fileRef);

      return updateProfile(auth.currentUser, {
        displayName,
        photoURL,
      });
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    signup,
    login,
    logout,
    resetPassword,
    updateProfileEmail,
    updateProfilePassword,
    reAuthenticate,
    updateProfileView,
  };

  return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>;
}
