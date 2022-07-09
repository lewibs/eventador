import logo from './logo.svg';
import './App.css';
import React from 'react';
import Keylogger from 'lewibs-keylogger';
window.Keylogger = Keylogger.instance.start();

function App() {
  const [logger, setLogger] = React.useState(Keylogger.instance);
  const [toggle, setToggle] = React.useState(false);

  const lastHistory = logger.history[logger.history.length - 1] || {};

  React.useEffect(()=>{

    window.addEventListener("keydown", ()=>{
      setToggle(p=>!p);
    });

    window.addEventListener("keyup", ()=>{
      setToggle(p=>!p);
    });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <div>
          can also be stopped, started, and killed
        </div>
        <div>
          <h4>current keys</h4>
          {JSON.stringify(logger.pressed)}
        </div>
        <div>
          <h4>last history input</h4>
          pressed keys: {JSON.stringify(lastHistory.pressed)}<br/>
          time: {JSON.stringify(lastHistory.time)}<br/>
          event: {JSON.stringify(lastHistory.event)}<br/>
        </div>
      </header>
    </div>
  );
}

export default App;
