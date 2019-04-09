'use strict';

const logger = require('../utils/logger');
const accounts = require ('./accounts.js');
const invoiceLibrary = require('../models/invoiceCollectionLibrary.js');

const start = {
index(request, response) {
    const loggedInUser = accounts.getCurrentUser(request);  
    logger.info('start rendering');
    if (loggedInUser) {
    const invoiceCollections = invoiceLibrary.getAllInvoiceCollections();
    let totalInvoices = 0;
    for (let i in invoiceCollections) {
        totalInvoices = totalInvoices + invoiceCollections[i].invoices.length;
    }

    const viewData = {
      title: 'Welcome to .InvoCol.',
      fullname: loggedInUser.firstName + ' ' + loggedInUser.lastName,
        totalCollections: invoiceCollections.length,
        totalInvoices: totalInvoices,
    };
    response.render('start', viewData);
    }
    else response.redirect('/');
  },
};

module.exports = start;
