/*global chrome*/
import React, { useCallback } from 'react';
import Clock from "./components/clock";
import Weather from './components/weather';
import Todo from './components/todo';
// import Drawer from './components/drawer';

const App = () => {
  const handleClick = useCallback(() => {
    chrome.runtime.sendMessage({ action: 'openNewTab' });
  }, []);

  return (
    <div className="App">
      <Clock />
      <Weather />
      <Todo />
      {/* <Drawer /> */}
      {/* Example button to trigger handleClick */}
      {/* <button onClick={handleClick}>Open New Tab</button> */}
    </div>
  );
};

export default App;