import './App.css';
import LeftPanel from './Components/LeftPanel'
import Content from './Components/Content'
import ABESIT from "./Images/abesit.png";


function App() {
  return (
    <div className="App">
      <img src={ABESIT} className="CompanyLogo" />
      <LeftPanel />
      <Content />
    </div>
  );
}

export default App;
