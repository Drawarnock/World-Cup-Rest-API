const mongoose = require('mongoose');
const Player = require('../models/player');

exports.get_all_players = (req, res, next) => {
    Player.find()
        .select('id playerName position age country club played minutes goals assists yellowCards redCards')
        .exec()
        .then(result => {
            console.log(result);
            res.status(200).json(result);
        })
        .catch(err => {
            res.status(200).json({
                error: err
            })
        });
}

exports.get_player = (req, res, next) => {
    const id = req.params.playerId;
    Player.find()
        .where({id: id})
        .select('id playerName position age country club played minutes goals assists yellowCards redCards')
        .exec()
        .then(result => {
            console.log(result);
            res.status(200).json(result);
        })
        .catch(err => {
            res.status(200).json({
                error: err
            })
        });
}

exports.create_player = (req, res, next) => {
    const player = new Player({
        _id: new mongoose.Types.ObjectId(),
        id: req.body.id,
        playerName: req.body.playerName,
        position: req.body.position,
        age: req.body.age,
        country: req.body.country,
        club: req.body.club,
        played: req.body.played,
        minutes: req.body.minutes,
        goals: req.body.goals,
        assists: req.body.assists,
        yellowCards: req.body.yellowCards,
        redCards: req.body.redCards
    });

    player.save()
        .then(result => {
            res.status(200).json({
                message: 'player created',
                createdPlayer: player
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
}

exports.update_player = (req, res, next) => {
    const id = req.params.playerId;
    const updatedPlayer = {};
    for(const prop in req.body) {
        updatedPlayer[prop] = req.body[prop];
    }
    Player.update({ id: id}, { $set: updatedPlayer })
        .exec()
        .then(result => {
            console.log(result);
            res.status(200).json({
                message: 'Player updated'
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
}

exports.delete_player = (req, res, next) => {
    const id = req.params.playerId;
    Player.remove({id: id})
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'player deleted'
            })
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
}