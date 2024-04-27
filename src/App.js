import React, { useState, useEffect } from "react";
import Header from "./components/Header/Header";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";
import AddStory from './components/AddStory/AddStory';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [isMobile, setIsMobile] = useState(false);
  const [ShowSignup, setShowSignup] = useState(false);
  const [ShowLogin, setShowLogin] = useState(false);
  const [ShowAddStory, setShowAddStory] = useState(false);
  const [ShowStory, setShowStory] = useState(false);

  useEffect(() => {
    const isMobileDevice = () => {
      return window.innerWidth <= 768; 
    };
    setIsMobile(isMobileDevice());
    const handleResize = () => {
      setIsMobile(isMobileDevice());
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div style={{ position: "relative", overflow: "hidden" }}>
      <ToastContainer />
      <Header
        setShowSignup={setShowSignup}
        ShowSignup={ShowSignup}
        setShowLogin={setShowLogin}
        ShowLogin={ShowLogin}
        setShowAddStory={setShowAddStory}
        ShowAddStory={ShowAddStory}
        isMobile={isMobile}
      />
      <Home />
      {ShowSignup && <Signup setShowSignup={setShowSignup} ShowSignup={ShowSignup}/>}
      {ShowLogin && <Login setShowLogin={setShowLogin} ShowLogin={ShowLogin}/>}
      {ShowAddStory && <AddStory setShowAddStory={setShowAddStory} ShowAddStory={ShowAddStory} isMobile={isMobile}/>}
    </div>
  );
}

export default App;
