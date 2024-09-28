const { startSession } = require("mongoose");
const db = require("./db");
// logic for view
const booksView = () => {
  return db.bookData.find({}).then((result) => {
    if (result) {
      return {
        statusCode: 200,
        bookdata: result,
      };
    } else {
      return {
        statusCode: 400,
        message: "no data found",
      };
    }
  });
};

const addNew = async (id, bookName, author, count, price) => {
  try {
    const existingBook = await db.bookData.findOne({ bookName });
    // console.log(existingBook);
    if (existingBook) {
      return {
        statusCode: 401,
        message: "Book already exists",
      };
    } else {
      const newBook = new db.bookData({
        id,
        bookName,
        author,
        count,
        price,
      });
      await newBook.save();
      return {
        statusCode: 200,
        message: "Successfully completed",
      };
    }
  } catch (err) {
    return {
      statusCode: 500,
      message: "An error occurred",
      error: err.message,
    };
  }
};
// delete
const deleteBook = (params_id) => {
  return db.bookData
    .deleteOne({ id: params_id })
    .then((result) => {
      if (result.deletedCount === 1) {
        return {
          statusCode: 200,
          message: "Successfully deleted",
        };
      } else {
        return {
          statusCode: 400,
          message: "Book not found",
        };
      }
    })
    .catch((error) => {
      console.log(error, "server error");
      return {
        statusCode: 500,
        message: "Server error occurred",
      };
    });
};
// update count
const updateBookCount = (id, count) => {
  //  const find = db.bookData.findById({id})
  //  console.log(find);
  return db.bookData
    .updateOne({ id }, { $set: { count } })
    .then((result) => {
      // console.log(result);
      if (result.modifiedCount === 1) {
        return {
          statusCode: 200,
          message: "Count successfully updated",
        };
      } else {
        return {
          statusCode: 400,
          message: "Book not found or count not modified",
        };
      }
    })
    .catch((error) => {
      console.log(error, "server error");
      return {
        statusCode: 500,
        message: "Server error occurred",
      };
    });
};

// to get one book data
const viewOneBook = (id) => {
  // console.log(id);
  return db.bookData
    .findOne({ id })
    .then((result) => {
      console.log(result);
      if (result) {
        return {
          statusCode: 200,
          book: result,
        };
      } else {
        return {
          statusCode: 400,
          message: "book not found",
        };
      }
    })
    .catch((err) => {
      return {
        statusCode: 500,
        message: "server error",
      };
    });
};

// editBook data
const editBook = async (id, bookName, author, count, price) => {
  try {
   return db.bookData.updateMany(
      { id },
      { $set: { bookName, author, count, price } }
    ).then((result)=>{
      if(result){
        return{
          statusCode:200,
          message:'succesfully updated'
        }
      }else{
        return{
          statusCode:400,
          message:'updated faild'
        }
      }
    })
  } catch (error) {
    console.log(error, "server error");
    return{
      statusCode:500,
      message:'server Error'
    }
  }
};
module.exports = {
  booksView,
  addNew,
  deleteBook,
  // updateCount,

  updateBookCount,
  viewOneBook,
  editBook
};
