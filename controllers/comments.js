'use strict';

const logger = require('../utils/logger');
const uuid = require('uuid');
const invoiceStore = require('../models/invoiceCollectionLibrary');
const accounts = require('./accounts.js');
const commentStore = require('../models/commentStore');
const date = new Date();


const comment = {
    index(request, response) {
        const loggedInUser = accounts.getCurrentUser(request);
        const commentCollectionId = request.params.id;
        logger.debug('InvoiceCollection id = ', commentCollectionId);
        if (loggedInUser) {
            const viewData = {
                title: 'InvoCol',
                commentCollection: commentStore.getCommentCollection(),
                fullname: loggedInUser.firstName + ' ' + loggedInUser.lastName,
            };
            //logger.debug('InvoiceCollection id', invoiceStore.getInvoiceCollection(invoiceCollectionId));
            response.render('about', viewData);
        } else response.redirect('/');
    },

    addComment(request, response) {
        logger.info(`Getting into addInvoice in dashboard.js`)
        const loggedInUser = accounts.getCurrentUser(request);
        const newCommentCollection = {
            id: uuid(),
            userid: loggedInUser.id,
            comment: request.body.comment,
            name: loggedInUser.firstName + ' ' + loggedInUser.lastName,
            date: date,
        };
        //logger.debug('Creating a new InvoiceCollection', newInvoiceCollection);
        commentStore.addComment(newCommentCollection);
        response.redirect('/about');
    },
}

module.exports = comment;