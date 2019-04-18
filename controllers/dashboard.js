'use strict';

const uuid = require('uuid');
const logger = require('../utils/logger');
const accounts = require('./accounts.js');
const invoiceStore = require('../models/invoiceCollectionLibrary');
const pictureStore = require('../models/picture-store');

const dashboard = {
    index(request, response) {
        logger.info('dashboard rendering');
        const loggedInUser = accounts.getCurrentUser(request);
        if (loggedInUser) {
            const viewData = {
                title: 'Invoice Dashboard',
                invoicelists: invoiceStore.getUserInvoiceCollections(loggedInUser.id),
                fullname: loggedInUser.firstName + ' ' + loggedInUser.lastName,
                album: pictureStore.getAlbum(loggedInUser.id),

            };
            logger.info('about to render dashboard.index');
            response.render('dashboard', viewData);
        } else response.redirect('/');
    },

    uploadPicture(request, response) {
        const loggedInUser = accounts.getCurrentUser(request);
        pictureStore.addPicture(loggedInUser.id, request.body.title, request.files.picture, function () {
            response.redirect('/dashboard');
        });
    },

    deleteInvoiceCollection(request, response) {
        const invoiceCollectionId = request.params.id;
        logger.debug(`Deleting Invoice ${invoiceCollectionId}`);
        invoiceStore.removeInvoiceCollection(invoiceCollectionId);
        response.redirect('/dashboard');
    },

    deleteAllInvoiceCollections(request, response) {
        const loggedInUser = accounts.getCurrentUser(request);
        invoiceStore.removeAllInvoiceCollections(loggedInUser.id);
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

    deleteAllPictures(request, response) {
        const loggedInUser = accounts.getCurrentUser(request);
        pictureStore.deleteAllPictures(loggedInUser.id);
        response.redirect('/dashboard');
    },

    deletePicture(request, response) {
        const loggedInUser = accounts.getCurrentUser(request);
        pictureStore.deletePicture(loggedInUser.id, request.query.img);
        response.redirect('/dashboard');
    },



};

module.exports = dashboard;