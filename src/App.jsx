// import { getDatabase, ref, set  } from 'firebase/database'

import { useState } from "react";
import { useFirebase } from "./context/Firebase";
import SignUp from "./component/SignUp";

function App() {
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  // const { signUpUserWithEmailAndPassword, putDataIntoDatabase } = useFirebase();

  return (
    <div className="w-10/12 mx-auto">
      {/* <h1>Firebase App</h1>
      <input
        onChange={(e) => setEmail(e.target.value)}
        type="email"
        placeholder="Email"
      />
      <input
        onChange={(e) => setPassword(e.target.value)}
        type="password"
        placeholder="password"
      />
      <button
        onClick={() => {
          signUpUserWithEmailAndPassword(email, password);
          putDataIntoDatabase("/users" + email.split("@")[0], { email: email, password: password });
        }}
      >
        Signup
      </button> */}
      <SignUp />
    </div>
  );
}

export default App;
