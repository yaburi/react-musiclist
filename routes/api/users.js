const express = require('express');

const router = express.Router();

// Import our User model
const User = require('../../models/user');

// GET User list
router.get('/list', (req, res, next) => {
  // Find all matching users, ie. all of them
  User.find((err, users) => {
    if (err) {
      return res.send(err);
    }
    // Send the array of users
    return res.json(users);
  });
});

module.exports = router;
