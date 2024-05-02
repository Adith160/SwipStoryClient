import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";
import AddStory from "./components/AddStory/AddStory";
import ViewStory from "./components/ViewStory/ViewStory";
import Spinner from "./components/Spinner/Spinner";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [isMobile, setIsMobile] = useState(false);
  const [ShowSignup, setShowSignup] = useState(false);
  const [ShowLogin, setShowLogin] = useState(false);
  const [ShowAddStory, setShowAddStory] = useState(false);
  const [EditStory, setEditStory] = useState(false);
  const [StoryId, setStoryId] = useState("");
  const [isLogin, setIsLogin] = useState(false);
  const [ShowBookmark, setShowBookmark] = useState(false);
  const [rerender, setRerender] = useState(false);
  const [ShowSpinner, setShowSpinner] = useState(false);

  useEffect(() => {
    // Check if localStorage has 'name'
    const name = localStorage.getItem("name");
    if (name) {
      setIsLogin(true);
    }
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

  const rerenderHome = () => {
    setRerender(!rerender); // Toggle the state to force re-render
  };

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
        isLogin={isLogin}
        setIsLogin={setIsLogin}
        rerenderHome={rerenderHome}
        setShowBookmark={setShowBookmark}
        setEditStory={setEditStory}
      />
      <Home
        key={rerender} // Key prop to force re-rendering
        setShowAddStory={setShowAddStory}
        ShowAddStory={ShowAddStory}
        setEditStory={setEditStory}
        setStoryId={setStoryId}
        isLogin={isLogin}
        setShowLogin={setShowLogin}
        ShowBookmark={ShowBookmark}
        setShowBookmark={setShowBookmark}
        isMobile={isMobile}
        setShowSpinner={setShowSpinner}
      />
      {ShowSignup && (
        <Signup
          setShowSignup={setShowSignup}
          ShowSignup={ShowSignup}
          setIsLogin={setIsLogin}
          rerenderHome={rerenderHome}
          setShowSpinner={setShowSpinner}
        />
      )}
      {ShowLogin && (
        <Login
          setShowLogin={setShowLogin}
          ShowLogin={ShowLogin}
          setIsLogin={setIsLogin}
          rerenderHome={rerenderHome}
          setShowSpinner={setShowSpinner}
        />
      )}
      {ShowAddStory && (
        <AddStory
          setShowAddStory={setShowAddStory}
          ShowAddStory={ShowAddStory}
          isMobile={isMobile}
          StoryId={StoryId}
          EditStory={EditStory}
          rerenderHome={rerenderHome}
          setShowSpinner={setShowSpinner}
        />
      )}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/viewstory/:storyId" element={<ViewStory />} />
        </Routes>
      </BrowserRouter>

      {ShowSpinner && <Spinner />}
    </div>
  );
}

export default App;
