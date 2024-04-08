const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookSchema = new Schema({
 Inquiry_No:String,
  Customer_name: String, 
  Customer_email: String, 
  Pdf_id: String, 
});

const bookModel = mongoose.model("books2", bookSchema);
module.exports = bookModel;
