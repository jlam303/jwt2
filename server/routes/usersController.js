const express = require('express');
const router = express.Router();

const {
  readUsers,
  createUsers,
  updateUsers,
  deleteUser,
} = require('../controllers/users');

router.get('/', readUsers);
router.post('/', createUsers);
router.put('/:id', updateUsers);
router.delete('/:id', deleteUser);

module.exports = router;
