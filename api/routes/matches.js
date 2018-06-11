const express = require('express');
const router = express.Router();
const checkAuth = require('../middlewares/check-auth');
const matchesController = require('../controllers/matches');

router.get('/', matchesController.get_all_matches);
router.get('/:matchId', matchesController.get_match);
router.post('/', checkAuth, matchesController.create_match);
router.patch('/:matchId', checkAuth, matchesController.update_match);
router.delete('/:matchId', checkAuth, matchesController.delete_match);

module.exports = router;