'use strict';

const logger = require('../utils/logger');
const uuid = require('uuid');
const invoiceStore = require('../models/invoiceCollectionLibrary');
const accounts = require('./accounts.js');
const pictureStore = require('../models/picture-store');
//const invoiceEdit = require('../')

const updateInvoicePage = {
    index(request, response) {
        logger.info('updateInvoicePage rendering');
        const loggedInUser = accounts.getCurrentUser(request);
        const invoiceCollectionId = request.params.id;
        const invoiceCollection = invoiceStore.getInvoiceCollection(invoiceCollectionId);
        const invoiceId = request.params.invoiceId;
        const invoice = invoiceStore.getInvoice3(invoiceCollectionId, invoiceId);
        logger.info('im in the updateInvoicePage Controller with ' + loggedInUser + ", invoiceCollection = " + invoiceCollection +
            ", InvoiceCollection ID: " + invoiceCollectionId + ", invoice id= " + invoiceId + ", invo: " + invoice);
        if (loggedInUser) {
            const viewData = {
                title: 'InvoCol',
                invoice: invoice,

            };
            logger.info('logged in user' +loggedInUser + 'invoiceCollectionId = ' + invoiceStore.getInvoiceCollection(loggedInUser));
            response.render('updateInvoice', viewData);
        } else response.redirect('/dashboard');
    },

    getCurrentInvoice(request, response)  {
        const invoiceCollectionId = request.params.id;
        const invoiceId = request.params.invoiceId;
        logger.debug("getCurrentInvoice=> invoiceId: " + invoiceId + 'InvoiceCollectionId: ' + invoiceCollectionId);
response
    },

    updateInvoice(request, response) {
        const invoiceCollectionId = request.params.id;
        const invoiceId = request.params.invoiceId;
        logger.debug("updateInvoice=> invoiceId: " + invoiceId + 'InvoiceCollectionId: ' + invoiceCollectionId);
        const alterInvoice = {
            date: request.body.date,
            invoiceNumber: request.body.invoiceNumber,
            netAmount: request.body.netAmount,
            vatAmount: request.body.vatAmount,
            totalAmount: request.body.totalAmount,

        };
        invoiceStore.editInvoice(invoiceCollectionId, invoiceId, alterInvoice);
        response.redirect('/invoiceCollection/' + invoiceCollectionId);
    },
};

module.exports = updateInvoicePage;



