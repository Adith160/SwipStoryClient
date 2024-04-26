import Header from "./components/Header/Header";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";
import AddStory from './components/AddStory/AddStory'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ViewStory from "./components/ViewStory/ViewStory";
import { useState } from "react";

function App() {
  const [ShowSignup,setShowSignup] = useState(false);
  const [ShowLogin,setShowLogin] = useState(false);
  const [ShowAddStory,setShowAddStory] = useState(false);
  const [ShowStory,setShowStory] = useState(false);
  return (
    <div style={{position:'relative', overflow:'hidden'}}>
      <ToastContainer />
       <Header setShowSignup={setShowSignup} ShowSignup={ShowSignup} setShowLogin={setShowLogin} ShowLogin={ShowLogin} setShowAddStory={setShowAddStory} ShowAddStory={ShowAddStory}/>
       <Home />
       {ShowSignup && <Signup setShowSignup={setShowSignup} ShowSignup={ShowSignup}/>} 
       {ShowLogin && <Login setShowLogin={setShowLogin} ShowLogin={ShowLogin}/>}
       {ShowAddStory && <AddStory setShowAddStory={setShowAddStory}/>}
      {ShowStory && <ViewStory setShowStory={setShowStory}/>}
    </div>
  );
}

export default App;
