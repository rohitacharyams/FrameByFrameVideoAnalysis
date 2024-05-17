import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  // Your Firebase project configuration
  apiKey: "AIzaSyCIt95A5KcxItV1tMHgi-kMzTfAuQa8vqM",
  authDomain: "danceai-e04af.firebaseapp.com",
  projectId: "danceai-e04af",
  storageBucket: "danceai-e04af.appspot.com",
  messagingSenderId: "217881943779",
  appId: "1:217881943779:web:67b1a530ee690dce502fd6",
};

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);

export { auth, app };
