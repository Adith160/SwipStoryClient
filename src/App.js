import Header from "./components/Header/Header";
import Home from "./components/Home/Home";
import Signup from "./components/Signup/Signup";

function App() {
  return (
    <div style={{position:'relative', overflow:'hidden'}}>
       <Header />
       <Home />
       <Signup/>
    </div>
  );
}

export default App;
