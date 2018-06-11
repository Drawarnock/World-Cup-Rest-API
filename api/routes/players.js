const express = require('express');
const router = express.Router();
const checkAuth = require('../middlewares/check-auth');
const playersController = require('../controllers/players');

router.get('/', playersController.get_all_players);
router.get('/:playerId', playersController.get_player);
router.post('/', checkAuth, playersController.create_player);
router.patch('/:playerId', checkAuth, playersController.update_player);
router.delete('/:playerId', checkAuth, );

module.exports = router;