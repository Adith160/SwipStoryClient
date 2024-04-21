import Header from "./components/Header/Header";
import Home from "./components/Home/Home";
// import Login from "./components/Login/Login";
// import Signup from "./components/Signup/Signup";
// import AddStory from './components/AddStory/AddStory'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ViewStory from "./components/ViewStory/ViewStory";

function App() {
  const show = false;
  return (
    <div style={{position:'relative', overflow:'hidden'}}>
      <ToastContainer />
       <Header />
       <Home />
       {/* {show ?<>
       <Signup/>
       <Login /></>:<AddStory />} */}
       <ViewStory />
    </div>
  );
}

export default App;
