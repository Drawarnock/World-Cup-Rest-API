const express = require('express');
const router = express.Router();
const checkAuth = require('../middlewares/check-auth');
const uploadImages = require('../middlewares/upload-images');
const teamsController = require('../controllers/teams');

router.get('/', teamsController.get_all_teams);
router.get('/:teamName', teamsController.get_team);
router.get('/group/:group', teamsController.get_group);
router.post('/', checkAuth ,uploadImages.upload.single('teamFlag'), teamsController.get_team);
router.patch('/:teamName', checkAuth, uploadImages.upload.single('teamFlag') , teamsController.update_team);
router.delete('/:teamName', checkAuth, teamsController.delete_team);

module.exports = router;