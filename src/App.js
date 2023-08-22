import React from 'react';
import EnergyUsesGraph from './components/EnergyUsesGraph';
import EnergyDistributionGraph from './components/EnergyDistributionGraph';
import Header from './components/Header';
import "./App.css"
import { useContext } from 'react';
import { ToggleTheme } from './context/ToggleTheme';



function App() {
  const {myTheme} = useContext(ToggleTheme)

  return (
    <div className="App">
<Header/>
<div className={myTheme?"light":"dark"}>
   <EnergyUsesGraph />
   <EnergyDistributionGraph/>
   </div>
    </div>
  );
}

export default App;