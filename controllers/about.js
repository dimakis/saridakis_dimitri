'use strict';

const logger = require('../utils/logger');
const accounts = require ('./accounts.js');
const commentColl = require('../models/commentStore');

const about = {
    index: function (request, response) {
        const loggedInUser = accounts.getCurrentUser(request);
        logger.info('about rendering');
        if (loggedInUser) {
            const viewData = {
                title: 'About .InvoCol.',
                fullname: loggedInUser.firstName + ' ' + loggedInUser.lastName,
                commentCollection: commentColl.getCommentCollection(),
            };
            response.render('about', viewData);
        } else response.redirect('/');
    },
};

module.exports = about;
