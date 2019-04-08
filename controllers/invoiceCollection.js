'use strict';

const logger = require('../utils/logger');
const uuid = require('uuid');
const invoiceStore = require('../models/invoiceCollectionLibrary');
const accounts = require('./accounts.js');
const pictureStore = require('../models/picture-store');

const invoiceCollection = {
    index(request, response) {
        const loggedInUser = accounts.getCurrentUser(request);
        const invoiceCollectionId = request.params.id;
        logger.debug('InvoiceCollection id = ', invoiceCollectionId);
        if (loggedInUser) {
            const viewData = {
                title: 'InvoCol',
                invoiceCollection: invoiceStore.getInvoiceCollection(invoiceCollectionId),
                fullname: loggedInUser.firstName + ' ' + loggedInUser.lastName,
                album: pictureStore.getAlbum(loggedInUser.id),
            };
            logger.debug('InvoiceCollection id', invoiceStore.getInvoiceCollection(invoiceCollectionId));
            response.render('invoiceCollectionLibrary', viewData);
        }
        else response.redirect('/');
    },

    deleteInvoice(request, response) {
        const invoiceCollectionId = request.params.id;
        const invoiceId = request.params.invoiceId;
        logger.debug(`Deleting Invoice ${invoiceId} from InvoiceCollection ${invoiceCollectionId}`);
        invoiceStore.removeInvoice(invoiceCollectionId, invoiceId);
        response.redirect('/invoiceCollection/' + invoiceCollectionId);
    },

    addInvoice(request, response) {
        const invoiceCollectionId = request.params.id;
        const invoiceCollection = invoiceStore.getInvoiceCollection(invoiceCollectionId);
        const newInvoice = {
            id: uuid(),
            date: request.body.date,
            invoiceNumber: request.body.invoiceNumber,
            netAmount: request.body.netAmount,
            vatAmount: request.body.vatAmount,
            totalAmount: request.body.totalAmount,
            status: request.body.status,

        };
        //logger.info('getting', invoiceStore.getInvoiceCollection(invoiceCollectionId));
        invoiceStore.addInvoice(invoiceCollectionId, newInvoice);
        response.redirect('/invoiceCollection/' + invoiceCollectionId);
    },

    updateInvoice(request, response) {
        const invoiceCollectionId = request.params.id;
        const invoiceId = request.params.invoiceId;
        logger.debug("updating song " + invoiceId);
        const alterInvoice = {
            title: request.body.title,
            artist: request.body.artist,
        };
        invoiceStore.editInvoice(invoiceCollectionId, invoiceId, alterInvoice);
        response.redirect('/listInvoiceCollections/' + invoiceCollectionId);
    },

    uploadPicture(request, response) {
        const loggedInUser = accounts.getCurrentUser(request);
        pictureStore.addPicture(loggedInUser.id, request.body.title, request.files.picture, function () {
            response.redirect('/dashboard');
        });
    },

};

module.exports = invoiceCollection;