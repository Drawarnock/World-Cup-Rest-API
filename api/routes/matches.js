const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: '/GET to /matches'
    });
});

router.post('/', (req, res, next) => {
    res.status(200).json({
        message: '/POST to /matches'
    });
});

router.patch('/', (req, res, next) => {
    res.status(200).json({
        message: '/PATCH to /matches'
    });
});

router.delete('/', (req, res, next) => {
    res.status(200).json({
        message: '/DELETE to /matches'
    });
});

module.exports = router;