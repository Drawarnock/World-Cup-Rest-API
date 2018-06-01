const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: '/GET to /teams'
    });
});

router.post('/', (req, res, next) => {
    res.status(200).json({
        message: '/POST to /teams'
    });
});

router.patch('/', (req, res, next) => {
    res.status(200).json({
        message: '/PATCH to /teams'
    });
});

router.delete('/', (req, res, next) => {
    res.status(200).json({
        message: '/DELETE to /teams'
    });
});

module.exports = router;