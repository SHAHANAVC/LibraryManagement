const express = require("express");
const server = express();
const cors = require("cors");
const db = require("./services/db");
const logic = require("./services/logic");
server.use(
  cors({
    origin: "http://localhost:3000",
  })
);

server.use(express.json());
server.listen(5003, () => {
  console.log("server start");
});

server.get("/books", (req, res) => {
  logic.booksView().then((result) => {
    res.status(result.statusCode).json(result);
    // console.log(result);
  });
});

server.post("/addBook", (req, res) => {
  // console.log(req.body);

  db.bookData
    .create(req.body)
    .then((data) => res.status(200).json(data))
    .catch((err) => res.status(400).json(err));
});

server.delete("/delete/:id", (req, res) => {
  logic
    .deleteBook(req.params.id)
    .then((result) => {
      res.status(result.statusCode).json(result);
    })
    .catch((error) => {
      res
        .status(500)
        .json({ statusCode: 500, message: "Server error occurred" });
      console.log(error, "server error");
    });
});

// server.put("/updatecount/:id", (req, res) => {
//   logic.updateBookCount(req.params.id, req.body.count).then((result) => {
//     res.status(result.statusCode).json(result);
//    }).catch((error) => {
//     res.status(500).json({ statusCode: 500, message: "Server error occurred" });
//     console.log(error, "server error");
//   });
// });
server.put("/updateCount/:id", (req, res) => {
  const { id } = req.params;
  const { count } = req.body;
  // console.log(id,count);
  logic.updateBookCount(id, count).then((result) => {
    res.status(result.statusCode).json(result);
  });
});


server.get("/viewonebook/:id",(req,res)=>{
  logic.viewOneBook(req.params.id).then((result)=>{
    res.status(result.statusCode).json(result)
  })
})
// update book
server.put('/updatebook',(req,res)=>{
  const id = req.body.id
  const bookName= req.body.bookName
  const author= req.body.author
  const count = req.body.count
  const price = req.body.count
 logic.editBook(id,bookName,author,count,price).then((result=>{
  res.status(result.statusCode).json(result)
 }))
})
