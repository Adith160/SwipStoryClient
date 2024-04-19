import Header from "./components/Header/Header";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";

function App() {
  const show = false;
  return (
    <div style={{position:'relative', overflow:'hidden'}}>
       <Header />
       <Home />
       {show ?<>
       <Signup/>
       <Login /></>:''}
    </div>
  );
}

export default App;
