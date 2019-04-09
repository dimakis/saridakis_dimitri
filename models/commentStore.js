'use strict';

const _ = require('lodash');
const JsonStore = require('./json-store');

const commentStore = {

    store: new JsonStore('./models/commentStore.json', {commentCollection: []}),
    collection: 'commentCollection',

    getCommentCollection() {
        return this.store.findAll(this.collection);
    },

    addComment(comment) {
        this.store.add(this.collection, comment);
    }
}

module.exports = commentStore;