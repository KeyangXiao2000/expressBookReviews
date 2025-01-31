const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();
var Promise = require('promise');

// .../register?username=xxx&password=yyy
public_users.post("/register", (req,res) => {
  if (!req.query.username) {
    res.send("Error: please provide username");
    return
  }
  if (!isValid(req.query.username)) {
    res.send("Error: username already exists");
    return
  }
  if (!req.query.password) {
    res.send("Error: please provide password");
    return
  }

  // Push a new user object into the users array based on query parameters from the request
  users.push({
    "username": req.query.username,
    "password": req.query.password,
  });
  // Send a success message as the response, indicating the user has been added
  res.send("The user " + req.query.username + " has been added!");
});

/*
// Get the book list available in the shop
public_users.get('/',function (req, res) {
  res.send(JSON.stringify({books}));
});
*/
// Code using Promise
public_users.get('/',function (req, res) {
  const returnbooks = new Promise((resolve, reject) => {
    try {
      const data = JSON.stringify(books);
      resolve(data);
    } catch (err) {
      reject(err);
    }
  })
  returnbooks.then(
    (data) => res.send(data),
    (err) => res.send("An error occured")
  )
});

/*
// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  let target_book = books[req.params.isbn];
  res.send(JSON.stringify({target_book}));
});
*/
// Code using Promise
public_users.get('/isbn/:isbn',function (req, res) {
  const returnbooks = new Promise((resolve, reject) => {
    try {
      let target_book = books[req.params.isbn];
      const data = JSON.stringify(target_book);
      resolve(data);
    } catch (err) {
      reject(err);
    }
  })
  returnbooks.then(
    (data) => res.send(data),
    (err) => res.send("An error occured")
  )
});

/*
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  let author = req.params.author;
  let target_entries = Object.entries(books).filter(([key, value]) => value.author === author);
  let target_books = Object.fromEntries(target_entries);
  res.send(JSON.stringify({target_books}));
});
*/
// Code using Promise
public_users.get('/author/:author',function (req, res) {
  const returnbooks = new Promise((resolve, reject) => {
    try {
      let author = req.params.author;
      let target_entries = Object.entries(books).filter(([key, value]) => value.author === author);
      let target_books = Object.fromEntries(target_entries);
      const data = JSON.stringify(target_books);
      resolve(data);
    } catch (err) {
      reject(err);
    }
  })
  returnbooks.then(
      (data) => res.send(data),
      (err) => res.send("An error occured")
  )
});

/*
// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  let title = req.params.title;
  let target_entries = Object.entries(books).filter(([key, value]) => value.title === title);
  let target_books = Object.fromEntries(target_entries);
  res.send(JSON.stringify({target_books}));
});
*/
// Code using Promise
public_users.get('/title/:title',function (req, res) {
  const returnbooks = new Promise((resolve, reject) => {
    try {
      let title = req.params.title;
      let target_entries = Object.entries(books).filter(([key, value]) => value.title === title);
      let target_books = Object.fromEntries(target_entries);
      const data = JSON.stringify(target_books);
      resolve(data);
    } catch (err) {
      reject(err);
    }
  })
  returnbooks.then(
      (data) => res.send(data),
      (err) => res.send("An error occured")
  )
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
    let target_reviews = books[req.params.isbn].reviews;
    res.send(JSON.stringify({target_reviews}));
});

module.exports.general = public_users;
