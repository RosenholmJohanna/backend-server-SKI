const express = require('express');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const router = express.Router();
const bcrypt = require('bcrypt');
//const cors = require('cors');

require('dotenv').config();

const secretKey = process.env.SECRET_ACCESS_TOKEN; 
const hashedSecret = crypto.createHash('sha256').update(secretKey).digest('hex'); 


router.get('/', (req, res) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
    console.log('Token received on the backend:', token); 
  
  if (!token) return res.status(401).send('Access Denied');

  try {
    //const verified = jwt.verify(token, 'secretKey');
      const verified = jwt.verify(token, hashedSecret); //  
    if (verified.role === 'admin') {
      res.json({ data: 'Secret data for admin!' });
    } else {
      res.json({ data: 'Secret data for user!' });
    }
  } catch {
    res.status(401).send('Invalid Token - cannot get backend');
  }
});

module.exports = router;







// const express = require('express');
// const jwt = require('jsonwebtoken');

// const router = express.Router();

// router.get('/', (req, res) => {
//   const authHeader = req.headers['authorization'];
//   const token = authHeader && authHeader.split(' ')[1];

//   if (!token) return res.status(401).send('Access Denied');

//   try {
//     const verified = jwt.verify(token, 'secretKey');
//     if (verified.role === 'admin') {
//       res.json({ data: 'Secret data for admin!' });
//     } else {
//       res.json({ data: 'Secret data for user!' });
//     }
//   } catch {
//     res.status(401).send('Invalid Token');
//   }
// });

// module.exports = router;
