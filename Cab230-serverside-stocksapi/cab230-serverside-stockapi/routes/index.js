const express = require('express');
const jwt = require('jsonwebtoken');

const router = express.Router();

// Status codes
const codeOk = 200;
const codeNotFound = 404;
const codeBadRequest = 400;
const codeForbidden = 403;

// GET /stocks/symbols
router.get("/symbols",function(req,res,next){
  const noQuery = Object.keys(req.query).length === 0;
  // If theres no filtering specified, return just the stock symbols
  if(noQuery) 
  {
    req.db.from('stocks').select("name", "symbol", "industry")
    .distinct("name")
    .then((rows) => 
    {
      res.status(codeOk).json(rows);
      return;
    })
    // if something else goes wrong, catch error
    .catch((err) => {
      console.log(err)
      res.json({ Error: true, Message: "Error in MySQL query, or database connection" })
    })
  } 
  // Else, a query is specified
  else 
  {
      if(req.query.industry) 
      {
        var percentage = '%';
        var industry = percentage + req.query.industry + percentage;
        // find stocks from industries containing the query string
        req.db.from('stocks').select("name", "symbol", "industry").where('industry', 'LIKE', industry)
        .distinct("name")
        .then((rows) => {
          // if there is no json data (row len is 0), throw status not found
          if (rows.length == 0) 
          {
            res.status(codeNotFound).json({ error: true, message:"Industry sector not found"})
            return;
          } 
          // if row length is more than zero, return the rows.
          else 
          {
            res.status(codeOk).json(rows)
            return;
          }
        })
        // if something else goes wrong, catch error
        .catch((err) => {
          console.log(err)
          res.json({ Error: true, Message: "Error in MySQL query, or database connection" })
        })
      }
      else {
        // invalid query parameter
        res.status(codeBadRequest).json({error: true, message: "Invalid query parameter: only 'industry' is permitted"});
        return;
      }
    }
});

// GET /{symbol} 
router.get("/:symbol",function(req, res, next)
{
  // the symbol inserted as the parameter to stocks/stockSymbol
  const symbol = req.params.symbol;
  // Symbol validation:
  // check if symbol is upper case
  const symbolUpper = symbol.toUpperCase();
  // Symbol between 1-5 letters
  const symbolConstraint = symbol.length > 0 && symbol.length < 6
  if (symbol == symbolUpper && symbolConstraint) 
  {
    // If a from or to query parameter is specified
    if(req.query.from || req.query.to) 
    {
        res.status(codeBadRequest).json({error : true, message: "Date parameters only available on authenticated route /stocks/authed"});
        return;
    } 
    else 
    {
      // get stocks with the specified symbol
      req.db.from('stocks').select("*").where('symbol', '=', req.params.symbol)
      .then((rows) => 
      {
        // no stocks with that symbol is found
        if(rows.length == 0) 
        {
          res.status(codeNotFound).json({ error: true, message: "No entry for symbol in stocks database"});
          return;
        }
        else 
        {
          // Return the stock
          res.status(codeOk).json(rows[0]);  
          return;
        }  
      })
      // if something else goes wrong, catch error
      .catch((err) => {
        console.log(err)
        res.json({ Error: true, Message: "Error in MySQL query, or database connection" })
      })
    }
  } 
  // Symbol Fails validation - incorrect format
  else 
  {
    res.status(codeBadRequest).json({error : true, message: "Stock symbol incorrect format - must be 1-5 capital letters"})
    return;
  }
});


// Authorization for user 
const authorize = (req, res, next) => {
  const authorization = req.headers.authorization
  let token = null;
  // Attempt to retrieve token by determining if authorization is defined and its
  // Array length is 2 when splitted. e.g. ("Bearer ")
  if (authorization && authorization.split(" ").length == 2) 
  {
    // get the token as the second value of authorization array when splited
    token = authorization.split(" ")[1]
  } 
  else {
    // throw 403 status, forbidden if token is not found
    res.status(codeForbidden).json({error: true, message: "Unauthorized user"})
    return;
  }

  // Verify JWT and check expiration date using a try catch block
  try {
    // get secret key from env
    const secretKey = process.env.SECRETKEY; 
    // decode
    const decipheredToken = jwt.verify(token, secretKey)
    const TokenIsExpired = Date.now() > decipheredToken.exp
    // if token is expired throw error
    if (TokenIsExpired) 
    {
      res.status(codeForbidden).json({ error: true, message : "Token has expired"})
      return;
    }
    // Permit the user to go access the authenticated route
    else 
    {    
      next()
    }

    // catch invalid token
  } 
  catch (error) 
  {
    res.status(codeForbidden).json({error: true, message : "Token is not valid", "Error catched": error})
    return;
  }
}



// GET /authed/{symbol} 
// Authorization is required in parameters
router.get("/authed/:symbol", authorize, function(req,res, next){
  const symbol = req.params.symbol;
  // Symbol validation:
  // check if symbol is upper case
  const symbolUpper = symbol.toUpperCase();
  // Symbol between 1-5 letters
  const symbolConstraint = symbol.length > 0 && symbol.length < 6
  if (symbol == symbolUpper && symbolConstraint) {
    req.db.from('stocks').select("*").where('symbol', '=', req.params.symbol)
      .then((rows) => {
        // If there are no stocks containing that symbol (if rows.length == 0) then, throw error.
        if(rows.length == 0) 
        {
          res.status(codeNotFound).json({ error: true, message: "No entry for symbol in stocks database"})
          return;
        } 
         // If query params is specified 
        const hasQuery = Object.keys(req.query).length > 0;
        if(hasQuery) 
        {
          // Check if the query specifies both "to" and "from"
          if (req.query.from || req.query.to) 
          {
            const fromSpecified = req.query.from && Object.keys(req.query).length == 1;
            const toSpecified = req.query.to && Object.keys(req.query).length == 1;
            // check if the query only specifies "from"
            if (fromSpecified) 
            {
              req.db.from('stocks').select('*').where('timestamp', '>=', req.query.from).where('symbol', '=', req.params.symbol)
                .then((rows) => {

                  // check if there is a result
                if (rows.length == 0) 
                {
                  res.status(codeNotFound).json({error : true, message : "No entries available for query symbol for supplied date range"})
                  return;
                }
                else 
                {
                  // return stocks within time range
                  res.status(codeOk).json(rows)
                  return;
                }
              }) // if something else goes wrong, catch error
              .catch((err) => {
                console.log(err)
                res.json({ Error: true, Message: "Error in MySQL query, or database connection" })
              })
            }
            // Check if the query only specifies "to"
            else if (toSpecified) 
            {
              req.db.from('stocks').select('*').where('timestamp', '<=', req.query.to).where('symbol', '=', req.params.symbol)
                .then((rows) => {
                  // check if there is a result
                if (rows.length == 0) 
                {
                  res.status(codeNotFound).json({error : true, message : "No entries available for query symbol for supplied date range"})
                  return;
                }
                else 
                {
                  // return stocks within time range
                  res.status(codeOk).json(rows)
                }
              }) // if something else goes wrong, catch error
              .catch((err) => {
                console.log(err)
                res.json({ Error: true, Message: "Error in MySQL query, or database connection" })
              })
              return;
            } 

            // Check if the query contains entries for both "from" and "to"
            else if (req.query.to && req.query.from && Object.keys(req.query).length == 2 ) {

              // If from is later than the to date, throw the error
              const fromIsLaterTo = req.query.from > req.query.to;
              if (fromIsLaterTo) 
              {
                res.status(codeNotFound).json({error : true, message : "No entries available for query symbol for supplied date range"})
                return;
              } 
              else // Otherwise get the stocks from the database containing queries for both from & to
              {
                
                req.db.from('stocks').select('*').where('timestamp', '>=', req.query.from).where('timestamp', '<=', req.query.to).where('symbol', '=', req.params.symbol)
                  .then((rows) => {
                  // If the query does not return a result, throw query not found error
                  if (rows.length == 0) {
                    res.status(codeNotFound).json({error : true, message : "No entries available for query symbol for supplied date range"})
                    return;
                  }
                  else
                  {
                  // return stocks within time range
                  res.status(codeOk).json(rows)
                  return;
                  }
                }) // if something else goes wrong, catch error
                .catch((err) => {
                  console.log(err)
                  res.json({ Error: true, Message: "Error in MySQL query, or database connection" })
                })
                return;
              }
            }
            
            // Otheriwse, the query contains values other than 'from' and 'to'
            else 
            {
              res.status(codeBadRequest).json({error : true, message : "Parameters allowed are 'from' and 'to', example: /stocks/authed/AAL?from=2020-03-15"})
              return;
            } 
          } 
          // Otherwise, the query contains values other than 'from' or/and 'to'
          else 
          {
            res.status(codeBadRequest).json({error : true, message : "Parameters allowed are 'from' and 'to', example: /stocks/authed/AAL?from=2020-03-15"})
            return;
          }
        } 
        // if no query is specified, just return the latest stock information
        else 
        {
          res.status(codeOk).json(rows[0])
          return;
        }
          
    })


  } 
  else // otherwise if the symbol validation constraint fails, throw bad request error
  {
    res.status(codeBadRequest).json({error : true, message: "Stock symbol incorrect format - must be 1-5 capital letters"})
    return;
  }
});

module.exports = router;
