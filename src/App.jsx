/*global chrome*/
import React from 'react';
import Clock from "./components/clock";
import Weather from './components/weather';
import Drawer from './components/drawer';
import Todo from './components/todo';

function App() {
  const handleClick = () => {
    // Send a message to the background script to open a new tab
    chrome.runtime.sendMessage({ action: 'openNewTab' });
  };

  return (
    <div className="App">
      <Clock />
      <Weather />
      <Todo />
      {/* <Drawer /> */}
    </div>
  );
}

export default App;
