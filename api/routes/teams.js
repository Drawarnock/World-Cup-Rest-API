const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function(req, file,cb) {
        cb(null, './uploads/');
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname);
    }
});

const fileFilter = (req, file, cb) => {

    if(file.mimetype === 'image/png' || file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg') {
        cb(null, true);
    } else {
        cb(null, false);
    }
}

const upload = multer({
    storage: storage,
    limits: {
    fileSize: 1024 * 512
    },
    fileFilter: fileFilter
});

const Team = require('../models/team');

router.get('/', (req, res, next) => {
    Team.find()
        .select('id teamName group played wins draws loses point goalsFor goalsAgaint, goalsDiff, teamFlag')
        .exec()
        .then(result => {
            console.log(result);
            res.status(200).json(result);
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
});

router.get('/:teamName', (req, res, next) => {
    const teamName = req.params.teamName;
    Team.find()
        .where({ teamName: teamName})
        .select('id teamName group played wins draws loses point goalsFor goalsAgaint, goalsDiff teamFlag')
        .exec()
        .then(result => {
            console.log(result);
            if(result.length>0) {
                res.status(200).json(result);
            } else {
                res.status(404).json({ message: 'not valid entry endpoint for provided team name'});
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

router.get('/group/:group', (req, res, next) => {
    const group = req.params.group;
    Team.find()
        .where({ group: group})
        .select('id teamName group played wins draws loses point goalsFor goalsAgaint, goalsDiff teamFlag')
        .exec()
        .then(result => {
            console.log(result);
            if(result.length>0) {
                res.status(200).json(result);
            } else {
                res.status(404).json({ message: 'not valid entry endpoint for provided team name'});
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

router.post('/', upload.single('teamFlag'), (req, res, next) => {
    const team = new Team({
        _id: new mongoose.Types.ObjectId(),
        id: req.body.id,
        teamName: req.body.teamName,
        group: req.body.group,
        played: req.body.played,
        wins: req.body.wins,
        draws: req.body.draws,
        loses: req.body.loses,
        points: req.body.points,
        goalsFor: req.body.goalsFor,
        goalsAgainst: req.body.goalsAgainst,
        goalsDiff: req.body.goalsDiff,
        teamFlag: req.file.path
    });

    team.save()
        .then(result => {
            console.log(result);
            res.status(201).json({
                message:'team created',
                createdTeam: team
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
});

router.patch('/:teamName', upload.single('teamFlag') ,(req, res, next) => {
    console.log(req.file)
    const teamName = req.params.teamName;
    const updatedTeam = {};
    for(const prop in req.body) {
        updatedTeam[prop] = req.body[prop];
    }

    if(req.file) {
        updatedTeam['teamFlag'] = req.file.path
    }
    

    Team.update({teamName: teamName}, { $set: updatedTeam })
        .exec()
        .then(result => {
            console.log(result);
            res.status(200).json({
                message: teamName + ' team updated'
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
});

router.delete('/:teamName', (req, res, next) => {
    const teamName = req.params.teamName;
    Team.remove({teamName: teamName})
        .exec()
        .then(result => {
            console.log(result);
            res.status(200).json({
                message: teamName + ' team deleted'
            });
        })
        .catch(err => {
            res.status(200).json({
                error: err
            });
        });
});

module.exports = router;