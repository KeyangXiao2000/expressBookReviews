const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username)=>{ //returns boolean
  for (const user of users) {
    if (user.username === username) return false;
  }
  return true;
}

const authenticatedUser = (username,password)=>{
  for (const user of users) {
    if (user.username === username) {
        if (user.password === password) {
            return true;
        }
        else return false;
    }
  }
  return false;
}

//only registered users can login
regd_users.post("/login", (req,res) => {
  const user = req.body.user;
  if (!user) {
    return res.status(404).json({message: "Body Empty"});
  }
  if (!authenticatedUser(user.username, user.password)) {
    return res.status(401).json({message: "Incorrect Username or Password"});
  }

  // Generate JWT access token
  let accessToken = jwt.sign({
    data: user
  }, 'access', { expiresIn: 60 * 60 });

  // Store access token in session
  req.session.authorization = {
    accessToken
  }
  return res.status(200).send("User successfully logged in");
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  const username = jwt.verify(req.session.authorization['accessToken'], "access").data.username;
  const isbn = req.params.isbn;
  const content = req.query.content;
  books[isbn].reviews[username] = content;
  const target_book = books[isbn];
  res.send(JSON.stringify({target_book}));
});

// Delete a book review
regd_users.delete("/auth/review/:isbn", (req, res) => {
  const username = jwt.verify(req.session.authorization['accessToken'], "access").data.username;
  const isbn = req.params.isbn;
  delete books[isbn].reviews[username];
  const target_book = books[isbn];
  res.send(JSON.stringify({target_book}));
});



module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
