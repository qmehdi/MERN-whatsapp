import React, { useEffect } from "react";
import "./App.css";
import Chat from "./Chat";
import Sidebar from "./Sidebar";
import Pusher from 'pusher-js';

function App() {
  
  /* This useEffect runs only once when the app component loads. 
  We want to put the pusher listener in useEffect because we don't want it 
  to attach multiple times
  */
  useEffect(() => {
    const pusher = new Pusher('1dd3c0c631623bcdec89', {
      cluster: 'mt1'
    });

    const channel = pusher.subscribe('messages');
    channel.bind('inserted', (data) => {
      alert(JSON.stringify(data));
    });
  }, [])

  return (
    <div className="app">
      <div className="app__body">
        <Sidebar />
        <Chat />
      </div>
    </div>
  );
}

export default App;
