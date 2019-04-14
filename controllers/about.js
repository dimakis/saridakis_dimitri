'use strict';

const logger = require('../utils/logger');
const accounts = require ('./accounts.js');
const commentColl = require('../models/commentStore');
const invoiceLibrary = require('../models/invoiceCollectionLibrary')

const about = {
    index: function (request, response) {
        const loggedInUser = accounts.getCurrentUser(request);
        logger.info('about rendering');
        const invoiceCollections = invoiceLibrary.getAllInvoiceCollections();
        let totalInvoices = 0;
        for (let i in invoiceCollections) {
            totalInvoices = totalInvoices + invoiceCollections[i].invoices.length;
        }
        if (loggedInUser) {
            const viewData = {
                title: 'About .InvoCol.',
                fullname: loggedInUser.firstName + ' ' + loggedInUser.lastName,
                commentCollection: commentColl.getCommentCollection(),
                totalCollections: invoiceCollections.length,
                totalInvoices: totalInvoices,
            };
            response.render('about', viewData);
        } else response.redirect('/');
    },
};

module.exports = about;
