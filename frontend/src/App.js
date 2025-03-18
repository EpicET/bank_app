import "./App.css";
import { Routes, Route } from "react-router-dom";
import FrontPage from "./components/FrontPage/FrontPage";
import Home from "./components/Home/Home";
import Account from "./components/Account/Account";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<FrontPage />}></Route>
        <Route path="/Home/:userID" element={<Home />}></Route>
        <Route path="/:userID/:accountID" element={<Account />}></Route>
      </Routes>
    </div>
  );
}

export default App;