import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import { Col, Container, Row } from 'react-bootstrap'
import WaitingRoom from './components/WaitingRoom';
import { useState } from 'react';
import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr'
import { ChatRoom } from './components/ChatRoom'

function App() {
  const [conn, setConnection] = useState();
  const [messages, setMessages] = useState([])

  const joinChatRoom = async (username, chatroom) => {

    try {
      // initiate a connection

    const conn = new HubConnectionBuilder()
      .withUrl("http://localhost:5157/chat")
      .configureLogging(LogLevel.Information)
      .build();

      // set up handler
    conn.on("JoinSpecificChatRoom", (username, msg) => {
      setMessages(messages=>[...messages, {username, msg}])
        console.log("admin: ", msg)
        return(`admin: ${msg}`);
      });

    conn.on("ReceiveSpecificMessage", (username, msg) => {
        setMessages(messages=>[...messages, {username, msg}])
      })

      await conn.start();
      await conn.invoke("JoinSpecificChatRoom", {username, chatroom});

      setConnection(conn);

    } catch(e) {
      console.log(e);
    }
  }

  const sendMessage = async(username, message) => {
    try {
    await conn.invoke("SendMessage", message)
    setMessages(messages=>[...messages, {username, message}])

  } catch(e){
    console.log(e);
  }
}

  return (
    <div>
      <main>
        <Container>
        <Row class='px-5 my-5'>
          <Col sm='12'>
            <h1 className='font-weight-light'>webchat 1.0</h1>
          </Col>
        </Row>
        {!conn ? 
        <WaitingRoom joinChatRoom={joinChatRoom}></WaitingRoom> : <ChatRoom conn={conn} sendMessage={sendMessage} messages={messages}></ChatRoom>}

        </Container>
      </main>
    </div>
  );
}

export default App;
