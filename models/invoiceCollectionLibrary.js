'use strict';


const _ = require('lodash');
const JsonStore = require('./json-store');

const invoiceCollectionLibrary = {


  store: new JsonStore('./models/invoiceCollectionLibrary.json', { invoiceCollection: [] }),
  collection: 'invoiceCollection',


  getAllInvoiceCollections() {
    //logger.info(store);
    return this.store.findAll(this.collection);
  },

  getInvoiceCollection(id) {
    return this.store.findOneBy(this.collection, { id: id });
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

  addInvoice(id, invoice) {
    const invoiceCollection = this.getInvoiceCollection(id);
    //invoiceCollection.addPicture();
    invoiceCollection.invoices.push(invoice);
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
    const invoiceCollection = this.invoiceCollection(id);
    const invoices = invoiceCollection.invoices;
    const thepos = invoices.findIndex(field=> field.id === invoiceId);
    invoices[thepos].title=invoiceDetails.title;
    invoices[thepos].artist=invoiceDetails.artist;
  },

  calcVat(id, invoice)  {
    const invoiceToCalc = this.collection.invoices.findByIds(invoiceCollection.id)

  }
  
};

module.exports = invoiceCollectionLibrary;