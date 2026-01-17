import logo from './logo.svg';
import './App.css';
import MountingA from './lifecycle/MountingA';
import Fragments from './advance/Fragments';
import PureComponents from './advance/component/PureComponents';
function App() {
  return (
    <div className="App">
      {/* <MountingA/> */}
      {/* <Fragments/> */}
      <PureComponents/>
    </div>
  );
}

export default App;
