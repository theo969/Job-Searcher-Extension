const express = require('express')
const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { first_name, last_name, email, password, confirmPassword, skills, experience } = req.body;

  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error!')
  }
})

module.exports = router;