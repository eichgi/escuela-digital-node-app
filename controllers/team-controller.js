'use strict';

const TeamModel = require('../models/team-model'),
    errors = require('../middlewares/errors'),
    tm = new TeamModel();

class TeamController {

    getAll(req, res, next) {

        return (req.session.username) ?
            tm.getAll((docs) => {
                res.render('index', {
                    title: 'Indentation War',
                    data: docs,
                    user: req.session.username
                });
            })
            :
            errors.http401(req, res, next);
    }

    getOne(req, res, next) {
        let _id = req.params._id;

        return (req.session.username) ?
            tm.getOne(_id, (docs) => {
                res.render('edit', {
                    title: 'Editar contacto',
                    data: docs
                });
            })
            : errors.http401(req, res, next);
    }

    save(req, res, next) {

        let contacto = {
            _id: (req.body._id || null),
            name: req.body.name,
            twitter: req.body.twitter,
            country: req.body.country,
            side: req.body.side
        };
        return (req.session.username) ?
            tm.save(contacto, () => res.redirect('/'))
            : errors.http401(req, res, next);
    }

    delete(req, res, next) {
        let _id = req.params._id;

        return (req.session.username) ?
            tm.delete(_id, () => res.redirect('/'))
            : errors.http401(req, res, next);
    }

    addForm(req, res, next) {
        return (req.session.username) ?
            res.render('add', {title: 'Agregar contacto'})
            : errors.http401(req, res, next);
    }
}

module.exports = TeamController;
