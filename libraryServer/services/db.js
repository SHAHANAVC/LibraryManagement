const db = require("mongoose");
db.connect("mongodb://localhost:27017/LIBRARY");
const bookData = db.model("book", {
  id: String,
  bookName: { type: String, required: true, unique: true },
  author: { type: String, required: true},
  count: Number,
  price: Number,
});
module.exports ={bookData};
