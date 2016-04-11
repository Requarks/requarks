"use strict";

var express = require('express'),
	 _ = require('lodash'),
	 slug = require('slug');
var router = express.Router();

// ----------------------------------------------------
// TEAMS - Check if user is part of a team
// ----------------------------------------------------

router.get('/', function(req, res, next) {

	db.Team.findOne({
		attributes: ['slug'],
		include: [{ model: db.User, where: { id: res.locals.usr.id }, attributes: ['id'] }]
	}).then((fteam) => {

		if(fteam) {
			res.redirect('/teams/' + fteam.slug);
		} else {
			res.redirect('/teams/create');
		}
	});

});

// ----------------------------------------------------
// TEAMS - Create new team
// ----------------------------------------------------

router.get('/create', function(req, res, next) {

	db.Team.count({
		include: [{ model: db.User, where: { id: res.locals.usr.id } }]
	}).then((teamCount) => {
		res.render('teams/create', { navbar_active: 'teams', teamCount });
	});

});

router.post('/create', function(req, res, next) {

	//-> Validate form

	req.sanitizeBody('team_create_name').trim();
	req.checkBody('team_create_name', 'required').notEmpty();
	req.checkBody('team_create_name', 'must be between 3 and 50 characters').isLength({min: 3, max: 50});
	req.checkBody('team_create_name', 'must be unique').isUniqueTeam();

	req.sanitizeBody('team_create_desc').trim();
	req.checkBody('team_create_desc', 'required').notEmpty();
	req.checkBody('team_create_desc', 'must be between 3 and 50 characters').isLength({min: 3, max: 50});

	// Create Team

	let errors = [];
	req.asyncValidationErrors().then(() => {

		let teamSlug = slug(req.body.team_create_name, {lower: true});
		
		db.Team.create({
			name: req.body.team_create_name,
			description: req.body.team_create_desc,
			slug: teamSlug
		}).then((team) => {
			return team.addUsers(res.locals.usr);
		}).then(() => {
			res.redirect('/teams/' + teamSlug);
		}).catch((err) => {
			console.log(err);
		});

	}).catch(function(errors) {
		console.log(errors);

		db.Team.count({
			include: [{ model: db.User, where: { id: res.locals.usr.id } }]
		}).then((teamCount) => {
			res.render('teams/create', { navbar_active: 'teams', teamCount });
		});

	});

});

// ----------------------------------------------------
// TEAMS - Display team
// ----------------------------------------------------

router.get('/:slug', function(req, res, next) {

	//-> Load all user's teams

	db.Team.findAll({
		include: [{ model: db.User, where: { id: res.locals.usr.id }, attributes: ['id'] }]
	}).then((teams) => {

		//-> Make sure user has access to the requested team

		let teamSlugs = _.map(teams, (t) => { return t.get('slug'); });

		if(_.includes(teamSlugs, req.params.slug )) {
			res.render('teams/teams', { navbar_active: 'teams' });
		} else {
			res.render('teams/default', { navbar_active: 'teams', msg: 'You are not authorized to access this team.' });
		}

	});

});

module.exports = router;
