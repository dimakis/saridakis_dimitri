'use strict';

const express = require('express');
const router = express.Router();

const start = require('./controllers/start');
const dashboard = require('./controllers/dashboard.js');
const invoiceCollection = require('./controllers/invoiceCollection.js');
const about = require('./controllers/about.js');
const accounts = require ('./controllers/accounts.js');

router.get('/', accounts.index);
router.get('/login', accounts.login);
router.get('/signup', accounts.signup);
router.get('/logout', accounts.logout);
router.post('/register', accounts.register);
router.post('/authenticate', accounts.authenticate);

router.get('/start', start.index);

router.get('/dashboard', dashboard.index);
router.get('/dashboard/deleteInvoiceCollection/:id', dashboard.deleteInvoiceCollection);
router.post('/dashboard/addInvoiceCollection', dashboard.addInvoiceCollection);

router.post('/invoiceCollection/uploadpicture', invoiceCollection.uploadPicture);
//router.get('/invoiceCollection/deleteAllPictures', invoiceCollection.deleteAllPictures);
//router.get('/invoiceCollection/deletePicture', invoiceCollection.deletePicture);

router.get('/invoiceCollection/:id', invoiceCollection.index);
router.get('/invoiceCollection/:id/deleteInvoice/:invoiceId', invoiceCollection.deleteInvoice);     //###might be invoiceId
router.post('/invoiceCollection/:id/addInvoice', invoiceCollection.addInvoice);

router.get('/about', about.index);

module.exports = router;