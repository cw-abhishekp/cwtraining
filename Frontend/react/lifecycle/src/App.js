import logo from './logo.svg';
import './App.css';
import MountingA from './lifecycle/MountingA';
import Fragments from './advance/Fragments';
import PureComponents from './advance/component/PureComponents';
import ParentComponent from './advance/component/ParentComponent';
import RefsDemo from './advance/RefsDemo';
import InputParentRefs from './advance/component/refComponentDemo/InputParentRefs';
import InputParentForwardRef from './advance/component/forwardRef/InputParentForwardRef';
import PortalDemo from './advance/PortalDemo';
import Hero from './advance/component/ErrorBoundary/Hero';
import Errorbound from './advance/component/ErrorBoundary/Errorbound';
function App() {
  return (
    <div className="App">
      {/* <MountingA/> */}
      {/* <Fragments/> */}
      {/* <ParentComponent/> */}
      {/* <RefsDemo/> */}
      {/* <InputParentRefs/> */}
      {/* <InputParentForwardRef/> */}
      {/* <PortalDemo/>  */}

      <Errorbound>
      <Hero name ="Superman"/>
       </Errorbound>

        <Errorbound>
      <Hero name = "Batman"/>
       </Errorbound>

       <Errorbound>
      <Hero name = "Joker"/>
      </Errorbound>
    </div>
  );
}

export default App;
