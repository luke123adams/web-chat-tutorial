import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import { Col, Container, Row } from 'react-bootstrap'
import WaitingRoom from './components/waitingRoom';

function App() {
  return (
    <div>
      <main>
        <Container>
        <Row class='px-5 my-5'>
          <Col sm='12'>
            <h1 className='font-weight-light'>Luke's EXTREME webchat</h1>
          </Col>
        </Row>
        <WaitingRoom></WaitingRoom>

        </Container>
      </main>
    </div>
  );
}

export default App;
