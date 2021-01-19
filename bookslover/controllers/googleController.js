const axios = require("axios");
const db = require("../models");

//define methods


module.exports = {
    //findAll searches entire API but returns ones not already saved (at some point in time)
    findAll: function (req, res) {
        const { query: params } = req;
        axios.get("https://www.googleapis.com/books/v1/volumes", { params })
            .then(results => results.data.items.filter(
                result =>

                    result.volumeInfo.title &&
                    result.volumeInfo.authors &&
                    result.volumeInfo.description &&
                    result.volumeInfo.infoLink &&
                    result.volumeInfo.imageLinks &&
                    result.volumeInfo.imageLinks.thumbnail
            ))
            .then(googleBooks => {
                db.Book.find().then(dbBooks =>
                    googleBooks.filter(googleBook =>
                        dbBooks.every(dbBook => dbBook.bookId.toString() !== googleBook.id)))
                    .then(books => res.json(books))
                    .catch(err => res.status(422).json(err));
            })
        }
};