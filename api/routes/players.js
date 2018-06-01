const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: '/GET to /players'
    });
});

router.post('/', (req, res, next) => {
    res.status(200).json({
        message: '/POST to /players'
    });
});

router.patch('/', (req, res, next) => {
    res.status(200).json({
        message: '/PATCH to /players'
    });
});

router.delete('/', (req, res, next) => {
    res.status(200).json({
        message: '/DELETE to /players'
    });
});

module.exports = router;