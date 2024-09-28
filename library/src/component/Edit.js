import React , {useState,useEffect} from'react'
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function Edit() {
  const {id}=useParams()
  const[bookName,setbkName] = useState()
  const[author,setAuthor] = useState()
  const[count,setcount] = useState()
  const[price,setprice] = useState()
  const viewBook = async()=>{
      const {data}= await axios.get(`http://localhost:5003/viewonebook/${id}`)
      console.log(data);
      setbkName(data.book.bookName)
      setAuthor(data.book.author)
      setcount(data.book.count)
      setprice(data.book.price)
  }
  const updateBook = async ()=>{
    try {
      await axios.put(`http://localhost:5003/updatebook`,{
        id,bookName,author,count,price
      })
      alert("succesfully updated")
      viewBook()
      
    } catch (error) {
      alert(error,'error')
    }
  }
  useEffect(()=>{
    viewBook()
  },[])
  return (
    <div>
            <Form   className="mt-5 w-50 m-auto" onSubmit={updateBook}>
      <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
        <Form.Label column sm="4">
          BOOK NAME
        </Form.Label>
        <Col sm="8">
          <Form.Control type="text" value={bookName} onChange={(event)=>setbkName(event.target.value)}/>
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
        <Form.Label column sm="4">
          AUTHOR NAME
        </Form.Label>
        <Col sm="8">
          <Form.Control type="text" value={author} onChange={(event)=>setAuthor(event.target.value)}/>
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
        <Form.Label column sm="4">
          COUNT
        </Form.Label>
        <Col sm="8">
          <Form.Control type="text" value={count} onChange={(event)=>setcount(event.target.value)} />
        </Col>
      </Form.Group>
      <Form.Group as={Row} className="mb-3" >
        <Form.Label column sm="4">
          PRICE
        </Form.Label>
        <Col sm="8">
          <Form.Control type="text"  value={price} onChange={(event)=>setprice(event.target.value)} />
        </Col>
      </Form.Group>
      
      <Form.Group className="mb-3" controlId="formPlaintextPassword">
      <div className='text-center mt-2'> 
        <Button variant="success" className='p-2' type='submit' style={{width:"170px"}}>SAVE</Button>  
        </div>
        </Form.Group>
            </Form>
    </div>
  )
}

export default Edit