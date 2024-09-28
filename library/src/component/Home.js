import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Card from "react-bootstrap/Card";
import Form from 'react-bootstrap/Form';
import { InputGroup } from "react-bootstrap";

function Home() {
  const [books, setbooks] = useState([]);
  const fetchData = async () => {
    try {
      const { data } = await axios.get("http://localhost:5003/books");
      // console.log(data);
      setbooks(data.bookdata);
    } catch (error) {
      console.log("error", error);
    }
  };
  const deleteBook = async (id) => {
    const book = await axios.delete(`http://localhost:5003/delete/${id}`);
     console.log(book);
     alert(book.data.message)
    fetchData();
  };
  // const updateCount = async (id,newcount)=>{
  //      const sale= await axios.put(`http://localhost:5003/updatecount/${id}`,{count:newcount});
  //      console.log(sale);
  //      fetchData()

  // }
  const updateCount = async (id, newCount) => {
    try {
      await axios.put(`http://localhost:5003/updateCount/${id}`, { count: newCount });
      fetchData(); // Refresh data after updating count
    } catch (error) {
      console.log("Error updating count:", error);
    }
  };
  // const bookSale=(id,count)=>{
  //   if(count>0){
  //     updateCount(id,count-1)
  //   }
  //   else{
  //     alert('book out of stock')
  //   }
  // }
  const saleBook = (id, currentCount) => {
    if (currentCount > 0) {
      updateCount(id, currentCount - 1);
      alert('one book SOLD ')
    } else {
      alert('book out of stock')
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  const [searchQuery, setSearchQuery] = useState(""); 
  const filteredBooks = books.filter(
    (book) =>
      book.bookName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
    
    <div className="w-50 m-auto mt-5 mb-5">
        <InputGroup>
          <Form.Control
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <InputGroup.Text>
            <i className="bi bi-search"></i>
          </InputGroup.Text>
        </InputGroup>
      </div>
        
    <div className="d-flex flex-wrap justify-content-around">
    {filteredBooks.map((book) => (
      <Card key={book.id} style={{ width: "18rem", margin: "10px" }}>
        <Card.Img variant="top" src="https://upload.wikimedia.org/wikipedia/commons/5/5a/Books_HD_%288314929977%29.jpg" alt="Book image" style={{width:'285px',height:'150px'}} />
        <Card.Body>
         <Link to={`/edit/${book.id}`} className="mt-5 bg-light text-dark me-2" style={{textDecoration:'none'}}>

          <Card.Title>{book.bookName}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">{book.author}</Card.Subtitle>
          <Card.Text>
            <strong>Count:</strong> {book.count} <br />
            <strong>Price:</strong> {book.price}
          </Card.Text>
          </Link>
          <div className="d-flex flex-wrap justify-content-around">
          <Button variant={book.count > 0 ? "success" : "danger"} onClick={() => saleBook(book.id, book.count)} className="w-50">
          {book.count > 0 ? "Sale" : "Out of Stock"} 
            </Button>
          <Button variant="danger"  onClick={() => deleteBook(book.id)} className="w-50">
          <i class="bi bi-trash3-fill"></i>
            Delete
          </Button>
          </div>
        </Card.Body>
      </Card>
    
    ))}
  </div>
  </>
  );
}

export default Home;
