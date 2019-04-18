'use strict';


const cloudinary = require('cloudinary');
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
                //album: pictureStore.getAlbum(loggedInUser.id),
            };
            logger.debug('InvoiceCollection id', invoiceStore.getInvoiceCollection(invoiceCollectionId));
            response.render('invoiceCollectionLibrary', viewData);
        } else response.redirect('/');
    },

    deleteInvoice(request, response) {
        const invoiceCollectionId = request.params.id;
        const invoiceId = request.params.invoiceId;
        logger.debug(`Deleting Invoice ${invoiceId} from InvoiceCollection ${invoiceCollectionId}`);
        invoiceStore.removeInvoice(invoiceCollectionId, invoiceId);
        response.redirect('/invoiceCollection/' + invoiceCollectionId);
    },

    addInvoice(request, response) {
        const loggedInUser = accounts.getCurrentUser(request);
        logger.info('logged in user Id = ' + loggedInUser);
        const invoiceCollectionId = request.params.id;
        const invoiceCollection = invoiceStore.getInvoiceCollection(invoiceCollectionId);
        logger.info('in addInvoice, invocolID = ' + invoiceCollectionId);
        const vatRateCalc = request.body.vatRate * .01;
        const netAmount = request.body.netAmount;
        let vatAmount1 = netAmount * vatRateCalc;
        const vatAmount = vatAmount1.toFixed(2);
        let totalAmount1 = (parseFloat(netAmount) + vatAmount1).toFixed(2);
        //const imgTitle = request.body.imageTitle;
        //let imgFile = request.file.myImage;
        const newInvoice = {
            id: uuid(),
            date: request.body.date,
            invoiceNumber: request.body.invoiceNumber,
            netAmount: request.body.netAmount,
            vatRate: request.body.vatRate,
            vatAmount: vatAmount,
            totalAmount: totalAmount1,
        };
        invoiceStore.addInvoiceToLibrary(invoiceCollectionId, newInvoice);
        response.redirect('/invoiceCollection/' + invoiceCollectionId);
    },

    updateInvoicePage(request, response) {
        const loggedInUser = accounts.getCurrentUser(request);
        const invoiceCollectionId = request.params.id;
        const invoiceId = request.params.invoiceId;
        logger.info('im in the invoiceCollection Controller, invoColID: ' + invoiceCollectionId + ', invo: ' + invoiceId);
        response.redirect('/updateInvoicePage/' + invoiceCollectionId + invoiceId + loggedInUser);

    },

    uploadPicture(request, response) {
        const loggedInUser = accounts.getCurrentUser(request);
        invoiceStore.addPicture(loggedInUser.id, request.body.imageTitle, request.files.image, function () {
            response.redirect('/invoiceCollection');
        });
    },
};

module.exports = invoiceCollection;

/*
    updateInvoice(request, response) {
        const invoiceCollectionId = request.params.id;

        //response.redirect('/invoiceCollection/editInvoice/' + invoiceCollectionId);

        const invoiceId = request.params.invoiceId;
        logger.debug("updating song " + invoiceId);
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


    /* function () {
                response.redirect('/invoiceCollection');
            });
        },
    /*
        calculateVat(request, response) {
            const
        }

                //this.uploadPicture(loggedInUserId,imgTitle,imgFile);
        //logger.info('imgTitle = ' + imgTitle + ', imgFile = ' + imgFile);
        //this.uploadPicture(loggedInUserId,request.body.imgTitle,request.body.imgFile);
        //logger.info('imgTitle = ' + imgTitle + ', imgFile = ' + imgFile);

        //this.uploadPicture(request, response);
/*
                //invoiceStore.addPicture(loggedInUser, picTitle, imageFile, response)
                imageFile.mv('tempimage', err => {
                    if (!err) {
                        cloudinary.uploader.upload('tempimage', result => {
                            console.log(result);
                            const picture = {
                                img: result.url,
                                title: title,
                            };
                            album.photos.push(picture);
                            response();
                        });
                    }
                }),

                /*
cloudinary.config({
    cloud_name: "dimdakis",
    api_key: "771758987377332",
    api_secret: "CAOT2N2hvimhH8zyJNPYBm8kw0E"
});
*/