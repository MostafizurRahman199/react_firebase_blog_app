import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signInWithEmailAndPassword,
  signOut,
  GithubAuthProvider,
  TwitterAuthProvider,
} from "firebase/auth";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { getDatabase, ref, set, increment } from "firebase/database";

import { addDoc, collection, doc, getDocs, getFirestore, updateDoc, getDoc } from "firebase/firestore";



//__________________________Context & Config


const FirebaseContext = createContext();
export const useFirebase = () => useContext(FirebaseContext);





//__________________________Firebase Config

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
};

if (!firebaseConfig.apiKey) {
  throw new Error('Firebase API key is missing. Please check your environment variables.');
}




//__________________________Initialize Firebase

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getDatabase(app);
export const fireStoreDb = getFirestore(app);




// ___________________________Firestore Database Operations

// 1. Write Data
const writeData = async (collectionName, data)=>{
    const result = await addDoc(collection(fireStoreDb, collectionName), data);
    console.log(result);
    return result;
}


// 2. Get Blogs
const getBlogs = async (collectionName) => {
    const querySnapshot = await getDocs(collection(fireStoreDb, collectionName));
    const blogs = [];
    querySnapshot.forEach((doc) => {
        blogs.push({ id: doc.id, ...doc.data() });
    });
    console.log(blogs);
    return blogs;
}


// 3. Update Likes
const updateLike = async (collectionName, id, likes, likedBy) => {
    if (!collectionName || !id) {
        throw new Error('Collection name and document ID are required');
    }
    try {
        const docRef = doc(fireStoreDb, String(collectionName), String(id));
        const result = await updateDoc(docRef, { 
            likes: Number(likes),
            likedBy: likedBy
        });
        console.log("Likes and likedBy array updated successfully");
        return result;
    } catch (error) {
        console.error("Error updating likes and likedBy:", error);
        throw error;
    }
}


// 4. Add Comment
const addComment = async (collectionName, id, comment) => {
    try {
        const docRef = doc(fireStoreDb, String(collectionName), String(id));
        // First get the current document
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
            // Ensure currentComments is always an array
            let currentComments = docSnap.data().comments;
            if (!Array.isArray(currentComments)) {
                currentComments = [];
            }
            
            // Append new comment to existing comments array
            const result = await updateDoc(docRef, { 
                comments: [...currentComments, comment],
                commentCount: increment(1)
            });
            return result;
        }
    } catch (error) {
        console.error("Error adding comment:", error);
        throw error;
    }
}



// 5. Update Bookmark
const updateBookmark = async (collectionName, docId, bookmarkedBy) => {
  try {
      const docRef = doc(fireStoreDb, collectionName, docId);
      await updateDoc(docRef, {
          bookmarkedBy: bookmarkedBy,
          isBookmarked: true,
      });
  } catch (error) {
      console.error("Error updating bookmark:", error);
      throw error;
  }
};



// 6. Get Bookmarked Posts
const getBookmarkedPosts = async (userId) => {
    try {
        const querySnapshot = await getDocs(collection(fireStoreDb, 'blogs'));
        const bookmarkedPosts = [];
        
        querySnapshot.forEach((doc) => {
            const post = doc.data();
            // Check if the post is bookmarked by the current user
            if (post.bookmarkedBy && post.bookmarkedBy.includes(userId)) {
                bookmarkedPosts.push({ id: doc.id, ...post });
            }
        });
        
        return bookmarkedPosts;
    } catch (error) {
        console.error("Error fetching bookmarked posts:", error);
        throw error;
    }
};

// 7. Delete Comment
const deleteComment = async (collectionName, blogId, commentIndex) => {
  try {
      const docRef = doc(fireStoreDb, String(collectionName), String(blogId));
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
          const currentComments = docSnap.data().comments;
          // Remove the comment at the specified index
          currentComments.splice(commentIndex, 1);
          
          // Update the document with the new comments array
          const result = await updateDoc(docRef, { 
              comments: currentComments,
              commentCount: increment(-1)
          });
          return result;
      }
  } catch (error) {
      console.error("Error deleting comment:", error);
      throw error;
  }
}



// ___________________________Realtime Database Operations
const putDataIntoDatabase = async (path, data) => {
    return await set(ref(db, path), data);
};



//__________________________Authentication Operations
const FirebaseProvider = ({ children }) => {




  // State
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);






  // 1. Email/Password Sign Up
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




  // 2. Email/Password Sign In
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






  // 3. Google Sign In
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



// 4. Github Login

const githubProvider = new GithubAuthProvider();
const signInWithGithub = async ()=>{
  try {
    const result = await signInWithPopup(auth, githubProvider);
    console.log(result);
    console.log("User Signed In Successfully");
    setLoading(false);
    setUser(result.user);
    return result;
  } catch (error) {
    console.log(error.message);
    throw error;
  }
}


// 5. Twitter Sign In
const twitterProvider = new TwitterAuthProvider();
const signInWithTwitter = async () => {
  try {
    const result = await signInWithPopup(auth, twitterProvider);
    console.log("Twitter sign-in successful");
    setLoading(false);
    setUser(result.user);
    return result;
  } catch (error) {
    console.log(error.message);
    throw error;
  }
};





  // 4. Sign Out
  const signOutUser = ()=>{
    signOut(auth);
    console.log("User Signed Out Successfully");

  }





  // 5. Auth State Observer
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






  // Context Value Object
  const firebase = {
    // Auth-related
    user,
    loading,
    error,
    signUpUserWithEmailAndPassword,
    signInWithGoogle,
    signInUserWithEmailAndPassword,
    signOutUser,
    
    // Realtime Database
    putDataIntoDatabase,
    
    // Firestore
    writeData,
    getBlogs,
    updateLike,
    addComment,
    updateBookmark,
    getBookmarkedPosts,
    deleteComment,
    signInWithGithub,
    signInWithTwitter,
  };



// ___________________________Component end and return

  return (
    <FirebaseContext.Provider value={firebase}>
      {children}
    </FirebaseContext.Provider>
  );
};

export default FirebaseProvider;
