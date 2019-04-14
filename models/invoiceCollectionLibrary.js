'use strict';


const _ = require('lodash');
const JsonStore = require('./json-store');
const cloudinary = require('cloudinary');
const path = require('path');
const logger = require('../utils/logger');

const invoiceCollectionLibrary = {


  store: new JsonStore('./models/invoiceCollectionLibrary.json', { invoiceCollection: [] }),
  collection: 'invoiceCollection',
  invoices: 'invoices',


  getAllInvoiceCollections() {
    //logger.info(store);
    return this.store.findAll(this.collection);
  },

  getInvoiceCollection(id) {
    return this.store.findOneBy(this.collection, { id: id });
  },

  getInvoice3(id, invoId) {
    //logger.info(store);
    const invoCol = this.store.findBy(this.collection, {id: id});
    const invo = this.invoCol.findBy(this.invoCol, {id: invoId});
    return invo;
  },

  getInvoice2(id, invoiceId) {
    const invoiceCollection = this.getInvoiceCollection(id);
    const invoices = invoiceCollection.invoices;
    const invo1 = invoices.invoiceId;
    let i = 0;
    let invo = 0;
    for (let i in invoices) {
      if(invoices.id === invoiceId) {
        invo = invoices[i]
      }
    }
    //const invo = invoices;
    //return invo1;
    //logger.info('in getInvoices: invoiceCollection' + invoiceCollection + ', invoices: '+ invoices + ', invo' + invo);
    //return this.store.findBy(this.collection, {id: id }, {invoiceId: invoiceId});//.findOneBy(this.collection, { id: id });
  },

  getUserInvoiceCollections(userid) {
    return this.store.findBy(this.collection, { userid: userid });
  },

  addInvoiceCollection(invoiceCollection) {
    this.store.add(this.collection, invoiceCollection);
  },

  removeInvoiceCollection(id) {
    const invoiceCollection = this.getInvoiceCollection(id);
    this.store.remove(this.collection, invoiceCollection);
  },

  removeAllInvoiceCollections() {
    this.store.removeAll(this.collection);
  },

  getInvoice(id, invoiceId)  {
    const invoiceCollection = this.getInvoiceCollection(id);
    const invoices = invoiceCollection.invoices;
    const invo = invoices.forEach();
    //return this.store.findOneBy(this.invoices, { id: invoiceId });
    return this.store.getElementById
  },

  addInvoice(id, invoice) {
    const invoiceCollection = this.getInvoiceCollection(id);
    //invoiceCollection.addPicture();
    invoiceCollection.invoices.push(invoice);
  },


  addPicture(userId, title, imageFile, response) {
    let album = this.getInvoiceCollection(userId);
    if (!album) {
      album = {
        userid: userId,
        photos: [],
      };
      this.store.add(this.collection, album);
    }

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
    });
  },
/*
  addPicture(userId, title, imageFile, response) {
    let album = this.getAlbum(userId);
    if (!album) {
      album = {
        userid: userId,
        invoices: [],
      };
      this.store.add(this.collection, album);
    }

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
    });
  },


  addPicToInvoice(id, invoiceId, picUrl)  {
    const invoiceCollection = this.invoiceCollection(id);
    const invoices = invoiceCollection.invoices;
    const
  },
*/
  getAllInvoices()  {
    return this.store.findAll(this.collection.invoices)
  },

  removeInvoice(id, invoiceId) {
    const invoiceCollection = this.getInvoiceCollection(id);
    const invoices = invoiceCollection.invoices;
    _.remove(invoices, { id: invoiceId});
  },

  editInvoice(id, invoiceId, invoiceDetails) {
    const invoiceCollection = this.getInvoiceCollection(id);
    logger.info('InvoiceCol Id: ' + invoiceCollection);
    const invoices = invoiceCollection.invoices;
    const thepos = invoices.findIndex(field=> field.id === invoiceId);
    invoices[thepos].date=invoiceDetails.date;
    invoices[thepos].invoiceNumber=invoiceDetails.invoiceNumber;
    invoices[thepos].netAmount=invoiceDetails.netAmount;
    invoices[thepos].vatAmount=invoiceDetails.vatAmount;
    invoices[thepos].totalAmount=invoiceDetails.totalAmount;
  },

  calcVat(id, invoice)  {
    const invoiceToCalc = this.collection.invoices.findByIds(invoiceCollection.id)

  }
  
};

module.exports = invoiceCollectionLibrary;