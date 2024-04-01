import { Row, Col } from "react-bootstrap";
import MessageContainer from "./MessageContainer";
import SendMessageForm from "./SendMessageForm";
// import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";

export const ChatRoom = ({messages, sendMessage, conn}) => 

 <div>
    <Row className="px-5 py-4">
        <Col sm={10}>
            <h2>ChatRoom</h2>
        </Col>
        <Col>

        </Col>
    </Row>
    <Row className="px-5 py-5">
        <Col sm={12}>
            <MessageContainer conn={conn} messages={messages}/>
        </Col>
        <Col sm={12}>
            <SendMessageForm messages={messages} sendMessage={sendMessage}></SendMessageForm>
        </Col>
    </Row>
</div>