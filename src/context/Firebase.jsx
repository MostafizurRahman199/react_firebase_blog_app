import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { getDatabase, ref, set } from "firebase/database";
import { useNavigate } from "react-router-dom";
import { addDoc, collection, getDocs, getFirestore } from "firebase/firestore";



//__________________________Context


const FirebaseContext = createContext();
export const useFirebase = () => useContext(FirebaseContext);





//__________________________Firebase Config

const firebaseConfig = {
  apiKey: "AIzaSyBEiXUPZ_XYunZhzA_UaZGb_Kq1tOs6AXg",
  authDomain: "fir-app-db3c0.firebaseapp.com",
  projectId: "fir-app-db3c0",
  storageBucket: "fir-app-db3c0.firebasestorage.app",
  messagingSenderId: "873625399799",
  appId: "1:873625399799:web:07206c5bcff1694b0d3ef2",
  databaseURL: "https://fir-app-db3c0-default-rtdb.firebaseio.com/",
  
};




//__________________________Initialize Firebase

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getDatabase(app);




// ___________________________Firestore Database

export const fireStoreDb = getFirestore(app);



// ___________________________Write Data Into Firestore Database

const writeData = async (collectionName, data)=>{
    const result = await addDoc(collection(fireStoreDb, collectionName), data);
    console.log(result);
    return result;
}


const getBlogs = async (collectionName) => {
    const querySnapshot = await getDocs(collection(fireStoreDb, collectionName));
    const blogs = [];
    querySnapshot.forEach((doc) => {
        blogs.push({ id: doc.id, ...doc.data() });
    });
    console.log(blogs);
    return blogs;
}








//__________________________Component start

const FirebaseProvider = ({ children }) => {




  //__________________________SignUp User With Email and Password

  const signUpUserWithEmailAndPassword = async (email, password) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log(userCredential);
      console.log("User Signed Up Successfully");
      setLoading(false);
      return userCredential;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };




  // ___________________________Sign In User With Email and Password

  const signInUserWithEmailAndPassword = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log(userCredential);
      console.log("User Signed In Successfully");
      return userCredential;
      setLoading(false);
    } catch (error) {
      console.log(error);
      throw error;
    }
  };






  // ___________________________SignUp with Google

  const GoogleProvider = new GoogleAuthProvider();

  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, GoogleProvider);
      console.log(result);
      console.log("User Signed In Successfully");
      setLoading(false);
      setUser(result.user);
      return result;
    } catch (error) {
      console.log(error.message);
    }
  };







  // ___________________________SignOut

  const signOutUser = ()=>{
    signOut(auth);
    console.log("User Signed Out Successfully");

  }





  //   ___________________________OnAuthStateChanged

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
      if (currentUser) {
        console.log("User is logged in", currentUser);
        setLoading(false);
      
      } else {
        console.log("User is logged out");
      }
    });
  
    return () => unsubscribe();
  }, []);






  //___________________________Put Data Into Database

  const putDataIntoDatabase = async (path, data) => {
    return await set(ref(db, path), data);
  };




  //___________________________State

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);







  //_________________________Firebase context Object that are passed to all components

  const firebase = {
    user,
    loading,
    error,
    signUpUserWithEmailAndPassword,
    putDataIntoDatabase,
    signInWithGoogle,
    signInUserWithEmailAndPassword,
    signOutUser,
    writeData,
    getBlogs,
  };



// ___________________________Component end and return

  return (
    <FirebaseContext.Provider value={firebase}>
      {children}
    </FirebaseContext.Provider>
  );
};

export default FirebaseProvider;
