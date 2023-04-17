import "./App.css";
import LeftPanel from "./Components/LeftPanel";
import Content from "./Components/Content";
import ABESIT from "./Images/abesit.png";
import Login from "./Components/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Login />} />

        <Route
          exact
          path="/home"
          element={
            <>
              <img src={ABESIT} className="CompanyLogo" />
              <LeftPanel />
              <Content />
            </>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
