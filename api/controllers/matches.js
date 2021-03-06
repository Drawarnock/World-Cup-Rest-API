const mongoose = require('mongoose');
const Match = require('../models/match');

exports.get_all_matches = (req, res, next) => {
    Match.find()
        .select('id location stadium dateTime stage homeTeam awayTeam')
        .exec()
        .then(result => {
            res.status(200).json(result);
        })
        .catch(err => {
            res.status(500).json(err => {
                error: err
            });
        });
}

exports.get_match = (req, res, next) => {
    const id = req.params.matchId;
    Match.find()
        .where({ id: id })
        .select('id location stadium dateTime stage homeTeam awayTeam')
        .exec()
        .then(result => {
            res.status(200).json(result);
        })
        .catch(err => {
            res.status(500).json(err => {
                error: err
            });
        });
}

exports.create_match = (req, res, next) => {
    const match = new Match({
       _id: new mongoose.Types.ObjectId(),
       id: req.body.id,
       location: req.body.location,
       stadium: req.body.stadium,
       dateTime: req.body.dateTime,
       completed: req.body.completed,
       stage: req.body.stage,
       homeTeam: {
           teamName: req.body.homeTeam.teamName,
           group: req.body.homeTeam.group
        },
       awayTeam: {
        teamName: req.body.awayTeam.teamName,
        group: req.body.awayTeam.group
        }
    });

    match.save()
        .then(result => {
            res.status(200).json(result);
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
}

exports.update_match = (req, res, next) => {
    const id = req.params.matchId;
    console.log(id);
    const updatedMatch = {};
    for(const prop in req.body) {
        updatedMatch[prop] = req.body[prop];
    }
    Match.update({id: id}, { $set: updatedMatch })
        .exec()
        .then(result => {
            console.log(result);
            res.status(200).json({
                message: 'Match updated'
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
}

exports.delete_match = (req, res, next) => {
    const id = req.params.matchId;
    Match.remove({id: id})
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'match deleted'
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        })
}