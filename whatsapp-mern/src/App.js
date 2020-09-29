import React, { useEffect, useState } from "react";
import "./App.css";
import Chat from "./Chat";
import Sidebar from "./Sidebar";
import Pusher from "pusher-js";
import axios from "./axios";

function App() {
  const [messages, setMessages] = useState([]);

  // For fetching all the messages in mongoDB at once when the app loads
  useEffect(() => {
    axios.get("/messages/sync").then((response) => {
      setMessages(response.data);
    });
  }, []);

  /* We want to put the pusher listener in useEffect because we don't want it 
     to attach multiple times. 
     Whenever a new message comes in, this useEffect will fetch that message
  */
  useEffect(() => {
    const pusher = new Pusher("1dd3c0c631623bcdec89", {
      cluster: "mt1",
    });

    // Set up listener to pusher
    // Every time a new message comes in, this code runs
    const channel = pusher.subscribe("messages");
    channel.bind("inserted", (newMessage) => {
      alert(JSON.stringify(newMessage));
      // Keep all current messages, but also add the new one
      setMessages([...messages, newMessage]);
    });

    /* Clean up function
       This ensures that after a new message comes in, 
       the listener for the new messages gets unmounted 
    */
    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    }
  }, [messages]);

  console.log(messages);

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
