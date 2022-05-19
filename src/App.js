import logo from './logo.svg';
import io from 'socket.io-client';
import React, { useEffect, useState } from 'react';
import './App.css';

function App() {

  const [socket, setSocket] = useState(null);
  const [noidungchat, setNoiDungChat] = useState("");

  useEffect(() => {
    const newSocket = io(`http://${window.location.hostname}:4000`);
    setSocket(newSocket);
    return () => newSocket.close();
  }, [setSocket]);

  useEffect(() => {
    if(socket !== null){
      socket.on("respone_message_from_chat", (message) => {
        console.log(message);
      })
    }
  }, [socket])

  const sendMessageToServer = (e) => {
    e.preventDefault();
    // let value = "test thu";
    socket.emit("message_chat", noidungchat);
    setNoiDungChat("");
  }

  const onChangeInput = (e) => {
    setNoiDungChat(e.target.value);
  }

  

  return (
    <div className="App">
      
      { socket ? (
        <div className="chat-container">
          Socket is connected
        </div>
      ) : (
        <div>Not Connected</div>
      )}

        
        <form onSubmit={sendMessageToServer}>
          <legend>Form chat</legend>
        
          <div class="form-group">
            <label for="">nội dung</label>
            <input value={noidungchat} type="text" class="form-control" id="" onChange={onChangeInput} />
          </div>
        
          
        
          <button type="submit" class="btn btn-primary">Submit</button>
        </form>
        

    </div>
  );
}

export default App;
