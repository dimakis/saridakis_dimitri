'use strict';

const logger = require('../utils/logger');
const accounts = require ('./accounts.js');

const about = {
index(request, response) {
    const loggedInUser = accounts.getCurrentUser(request);  
    logger.info('about rendering');
    if (loggedInUser) {
    const viewData = {
      title: 'About Playlist 5',
      fullname: loggedInUser.firstName + ' ' + loggedInUser.lastName,
    };
    response.render('about', viewData);
   }
    else response.redirect('/');
  },
};

module.exports = about;
