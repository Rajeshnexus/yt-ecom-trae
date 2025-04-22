import { useState, useEffect } from "react";
import { auth } from "../firebase";
import {
  GoogleAuthProvider,
  FacebookAuthProvider,
  TwitterAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { FaGoogle, FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";

export function Login() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  const handleLogin = async (providerName: string) => {
    let provider;
    switch (providerName) {
      case "google":
        provider = new GoogleAuthProvider();
        break;
      case "facebook":
        provider = new FacebookAuthProvider();
        break;
      case "twitter":
        provider = new TwitterAuthProvider();
        break;
      case "instagram":
        alert("Instagram login is not natively supported by Firebase Auth.");
        return;
      default:
        return;
    }
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      alert("Login failed: " + (error as any).message);
    }
  };

//   const handleLogout = async () => {
//     await signOut(auth);
//   };

  if (user) {
    return (
      <div style={{ textAlign: "center", marginTop: "2rem" }}>
        <h2>Welcome, {user.displayName || user.email}!</h2>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 350, margin: "4rem auto", padding: 24, borderRadius: 8, background: "#fff", boxShadow: "0 2px 8px #0001" }}>
      <h2 style={{ textAlign: "center" }}>Sign in to your account</h2>
      <button style={{ width: "100%", margin: "8px 0", display: "flex", alignItems: "center", gap: 8 }} onClick={() => handleLogin("google")}>
        <FaGoogle /> Continue with Google
      </button>
      <button style={{ width: "100%", margin: "8px 0", display: "flex", alignItems: "center", gap: 8, background: "#3b5998", color: "#fff" }} onClick={() => handleLogin("facebook")}>
        <FaFacebook /> Continue with Facebook
      </button>
      <button style={{ width: "100%", margin: "8px 0", display: "flex", alignItems: "center", gap: 8, background: "#1da1f2", color: "#fff" }} onClick={() => handleLogin("twitter")}>
        <FaTwitter /> Continue with X (Twitter)
      </button>
      <button style={{ width: "100%", margin: "8px 0", display: "flex", alignItems: "center", gap: 8, background: "#e1306c", color: "#fff" }} onClick={() => handleLogin("instagram")}>
        <FaInstagram /> Continue with Instagram
      </button>
    </div>
  );
}