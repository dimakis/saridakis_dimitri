'use strict';

const uuid = require('uuid');
const logger = require('../utils/logger');
const accounts = require('./accounts.js');
const invoiceStore = require('../models/invoiceCollectionLibrary');

const dashboard = {
    index(request, response) {
        logger.info('dashboard rendering');
        const loggedInUser = accounts.getCurrentUser(request);
        if (loggedInUser) {

            const totalInvoicesInCollection = invoiceStore.getAllInvoiceCollections();
            let totalInvoices = 0;
            for (let i in totalInvoicesInCollection)    {
                totalInvoices += totalInvoicesInCollection[i].invoices.length;
            }

            const viewData = {
                title: 'Invoice Dashboard',
                invoicelists: invoiceStore.getUserInvoiceCollections(loggedInUser.id),
                fullname: loggedInUser.firstName + ' ' + loggedInUser.lastName,
                totalInvoices: totalInvoices,
            };
            logger.info('about to render dashboard.index');
            response.render('dashboard', viewData);
        } else response.redirect('/');
    },

    deleteInvoiceCollection(request, response) {
        const invoiceCollectionId = request.params.id;
        logger.debug(`Deleting Invoice ${invoiceCollectionId}`);
        invoiceStore.removeInvoiceCollection(invoiceCollectionId);
        response.redirect('/dashboard');
    },

    addInvoiceCollection(request, response) {
        logger.info(`Getting into addInvoice in dashboard.js`)
        const loggedInUser = accounts.getCurrentUser(request);
        const newInvoiceCollection = {
            id: uuid(),
            userid: loggedInUser.id,
            title: request.body.title,
            invoices: [],
        };
        logger.debug('Creating a new InvoiceCollection', newInvoiceCollection);
        invoiceStore.addInvoiceCollection(newInvoiceCollection);
        response.redirect('/dashboard');
    },

};

module.exports = dashboard;