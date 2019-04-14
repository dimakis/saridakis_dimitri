'use strict';

const logger = require('../utils/logger');
const accounts = require ('./accounts.js');
const invoiceLibrary = require('../models/invoiceCollectionLibrary.js');

const start = {
index(request, response) {
    const loggedInUser = accounts.getCurrentUser(request);
    const loggedInUserId = loggedInUser.id;
    //const loggedInUserId2 = accounts.getCurrentUserUSerID2(request);
    //logger.info('start rendering' + "loggeduser Id " + loggedInUserId2);
    const invoiceCollections = invoiceLibrary.getAllInvoiceCollections();
    const userInvoCol = invoiceLibrary.getUserInvoiceCollections(loggedInUserId);
    logger.info('Logged in userID' + loggedInUserId);

    let totalInvoices = 0;
    let userInvoiceCollections = 0;
    let totalUserInvoices = 0;
    for (let i in invoiceCollections) {
        totalInvoices = totalInvoices + invoiceCollections[i].invoices.length;
        logger.info("loggedInUserId" + loggedInUserId + ", invoiceuser id " + invoiceCollections[i].userid );
        if(loggedInUserId === invoiceCollections[i].userid){
            userInvoiceCollections ++;
            totalUserInvoices += invoiceCollections[i].invoices.length;
            }
        }
    // for cat with most && least invoices
    let mostInvoices = 0;
    let leastInvoices = 0;
    for (let i in invoiceCollections)   {
        leastInvoices = invoiceCollections[0].invoices.length;
        mostInvoices = invoiceCollections[0].invoices.length;
        if (invoiceCollections[i].invoices.length > mostInvoices )  {
            mostInvoices = invoiceCollections[i];
        }
        if(invoiceCollections[i].invoices.length < leastInvoices)    {
            leastInvoices = invoiceCollections[i].invoices.length;
        }
    }
    //for cat with most && least invoices
    let mostUserInvoices = 0;
    let leastUserInvoices = 0;
    for (let i in userInvoCol)   {
        leastUserInvoices = userInvoCol[0].invoices.length;
        mostUserInvoices = userInvoCol[0].invoices.length;
        if (userInvoCol[i].invoices.length > mostUserInvoices)  {
            mostUserInvoices = userInvoCol[i];
        }
        if(userInvoCol[i].invoices.length < leastUserInvoices)    {
            leastUserInvoices = userInvoCol[i].invoices.length;
        }
    }


    //for cat avg items
    let avgPerUserCat = totalUserInvoices/userInvoiceCollections;
    //for total cat avg items
    let avgPerTotalCat = totalInvoices/invoiceCollections.length;

    logger.info("user invoice Collections = " + userInvoiceCollections + "totalUserInvoices = " + totalUserInvoices + ', mostTotalInvoices: ' + mostInvoices + ', leastTotalInvoices: ' + leastInvoices);
    if (loggedInUser) {
    const viewData = {
      title: 'Welcome to .InvoCol.',
      fullname: loggedInUser.firstName + ' ' + loggedInUser.lastName,
        totalCollections: invoiceCollections.length,
        totalInvoices: totalInvoices,
        totalUserInvoiceCollections: userInvoiceCollections,
        totalUserInvoices: totalUserInvoices,
        averagePerUserCat: avgPerUserCat.toFixed(2),
        averagePerTotalCat: avgPerTotalCat.toFixed(2),
        mostTotalInvoices: mostInvoices,
        leastTotalInvoices: leastInvoices,
        mostUserInvoices: mostUserInvoices,
        leastUserInvoices: leastUserInvoices,


    };
    response.render('start', viewData);
    }
    else response.redirect('/');
  },
};

module.exports = start;
