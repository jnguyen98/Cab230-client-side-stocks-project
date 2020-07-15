const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = express.Router();

// Status codes
const codeCreated = 201;
const codeUnauthorized = 401;
const codeBadRequest = 400;
const codeConflict = 409;


// POST /register. 
router.post('/register', function(req, res, next) {
  const email = req.body.email
  const password = req.body.password

  // If both email or password-fields are not filled, throw error
  if (!email || !password) {
    res.status(codeBadRequest).json({
      error: true,
      message: "Request body incomplete - email and password needed"
    })
    return;
  }
  // If the user already exists, throw an error of conflict
  const queryUsers = req.db.from("users").select("*").where("email", "=", email)
  queryUsers
    .then((users) => {
      if (users.length > 0) {
        // Print to console
        console.log("User already exists");
        res.status(codeConflict).json({ error: true, message:"User already exists!"})
        return;
      }

      // Insert user into the database if the user does not exist
      const saltRounds = 10;
      const hash = bcrypt.hashSync(password, saltRounds)
      return req.db.from("users").insert({ email, hash})
    })
    .then (() => {
      res.status(codeCreated).json({ success: true, message: "User created" })
    })
});


// POST /login. 
router.post('/login', function(req, res, next) {
  // Retrieve email and password from req.body
  const email = req.body.email
  const password = req.body.password

  // Ensure both email and password are provided. if not, throw error
  if( !email || !password) {
    console.log("Request body incomplete - email and password needed");
    res.status(codeBadRequest).json({
      error:true,
      message: "Request body incomplete - email and password needed"
    })
    return;
  }
  // Do a check if the user exist, if not - throw error
  const queryUsers = req.db.from("users").select("*").where("email", "=", email)
  queryUsers
    .then((users) => {
      if (users.length == 0) {
        res.status(codeUnauthorized).json({ error: true, message:"User does not exist"})
        return;
      }

      // This means user exist, now lets compare the password hashes
      const user = users[0]
      return bcrypt.compare(password, user.hash)
    })
    .then((match) => {

      // incorrect password, throw error
      if (!match) {
        res.status(codeUnauthorized).json({ error: true, message: "Incorrect password."})
        return;
      }
      
      // If corect password, return JWT token
      const secretKey = process.env.SECRETKEY; // Secret key obtain from env file
      const seconds = 60, minutes = 60, hours = 24;
      const expires_in = seconds * minutes * hours // Valid for 24 hours in seconds (seconds * minutes * hours)
      const exp = Date.now() + expires_in * 1000; // the time now + 24 hours
      const token = jwt.sign({ email, exp}, secretKey)
      res.json({ token_type: "Bearer", token, expires_in})
    })
});



module.exports = router;
