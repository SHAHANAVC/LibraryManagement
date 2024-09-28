import React, { useEffect, useState } from "react";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import axios from "axios";
import uuid from "react-uuid";
import { useNavigate } from "react-router-dom";

function AddNew() {
  const navigate = useNavigate();
  const [id, setid] = useState(uuid().slice(0, 4));
  // console.log(id);
  const [bookName, setBookname] = useState("");
  const [author, setAuthor] = useState("");
  const [count, setCount] = useState(0);
  const [price, setPrice] = useState(0);

  const Submit = async (event) => {
    event.preventDefault()
    const body = {  id,
      bookName,
      author,
      count,
      price,}
 
  try {
    const result = await axios.post('http://localhost:5003/addBook', body);
    alert(result.data.message || result.statusText);
    console.log(result);
    if (result.status === 200) {
      navigate("/"); // Navigate to another route after successful submission
    }
  } catch (error) {
    console.error("Error:", error);
    alert("An error occurred while adding the book.");
  }
};

  return (
    <div>
      <Form className="mt-5 w-50 m-auto" onSubmit={Submit}>
        <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
          <Form.Label column sm="4">
            BOOK NAME
          </Form.Label>
          <Col sm="8">
            <Form.Control
              type="text"
              placeholder="NAME OF Book"
              required
              onChange={(event) => setBookname(event.target.value)}
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
          <Form.Label column sm="4">
            AUTHOR NAME
          </Form.Label>
          <Col sm="8">
            <Form.Control
              type="text"
              required
              placeholder="Author name"
              onChange={(event) => setAuthor(event.target.value)}
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
          <Form.Label column sm="4">
            COUNT
          </Form.Label>
          <Col sm="8">
            <Form.Control
              type="text"
              placeholder="tottal no of books"
              required
              onChange={(event) => setCount(event.target.value)}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
          <Form.Label column sm="4">
            PRICE
          </Form.Label>
          <Col sm="8">
            <Form.Control
              type="text"
              placeholder="price of book"
              required
              onChange={(event) => setPrice(event.target.value)}
            />
          </Col>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formPlaintextPassword">
          <div className="text-center mt-2">
            <Button
              variant="success"
              className="p-2"
              style={{ width: "170px" }}
              type="submit"
              onClick={((e)=>Submit(e))}
            >
              SAVE
            </Button>
          </div>
        </Form.Group>
      </Form>
    </div>
  );
}

export default AddNew;
