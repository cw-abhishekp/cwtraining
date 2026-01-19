import React from 'react';
import './App.css';
import ComponentD from './component/ComponentD';
import { UserProvider } from './component/UserContext';
import FunctionalComponentContext from './component/FunctionalComponentContext';

const ChannelContext = React.createContext()
function App() {
  return (
    <div className="App">
      {/* here we are proving the value harsh to all the children of component D now anyone can use it with UserConsumerConext */}
      <UserProvider value = "Harsh">
        <ChannelContext.Provider value ="Inside Channel Context">
      <ComponentD/>
      </ChannelContext.Provider>
      </UserProvider>
      <hr></hr>
      <hr></hr>
      <hr></hr>
      <hr></hr>
      <hr></hr>
      <hr></hr>
    </div>
  );
}

export {ChannelContext}
export default App;
