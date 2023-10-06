const express = require('express');

const { page, searchGroups, addGroups, leaveGroups, removeGroup, createGroup } = require('../controllers/groups')

const router = express.Router();

router.get('/', page);
router.get('/search-groups', searchGroups);
router.post('/add-groups', addGroups);
router.post('/leave-groups', leaveGroups);
router.post('/remove-group', removeGroup);
router.post('/create-group', createGroup);

module.exports = router;