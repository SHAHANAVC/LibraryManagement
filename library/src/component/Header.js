import React from 'react'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
function Header() {
 
  return (
    <div>
        <Navbar className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="/"><i class="bi bi-book-half text-primary "></i>BOOK STALL</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          
                <Form inline>
        <Row>
          {/* <Col xs="auto">
            <Form.Control
              type="text"
              placeholder="Search"
              className=" mr-sm-2"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </Col> */}
          <Col xs="auto">
          <Navbar.Text>
            <Link to={"/addbook"}>
          <Button variant="primary">Add new</Button></Link>
          </Navbar.Text>
          </Col>
        </Row>
      </Form>

        </Navbar.Collapse>
      </Container>
    </Navbar>
    </div>
  )
}

export default Header