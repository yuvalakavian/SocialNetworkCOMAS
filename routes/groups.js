const express = require('express');

const { page, getGroups, searchGroups, addGroups, removeGroups } = require('../controllers/groups')

const router = express.Router();

router.get('/', page);
router.get('/get-groups', getGroups);
router.get('/search-groups', searchGroups);
router.post('/add-groups', addGroups);
router.post('/remove-groups', removeGroups);


module.exports = router;