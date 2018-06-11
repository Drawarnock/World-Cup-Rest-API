const mongoose = require('mongoose');
const Team = require('../models/team');

exports.get_all_teams = (req, res, next) => {
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
}

exports.get_team = (req, res, next) => {
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
}

exports.get_group = (req, res, next) => {
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
}

exports.create_team = (req, res, next) => {
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
}

exports.update_team = (req, res, next) => {
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
}

exports.delete_team = (req, res, next) => {
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
}