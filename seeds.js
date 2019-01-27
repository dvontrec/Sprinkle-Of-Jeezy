var mongoose = require('mongoose');
// Imports all models
var db = require('./models');

// Creates sample quotes for dev detabase
var data = [
  {
    quote: 'The main objective is to make it out',
    artist: 'Lil Bibby',
    song: 'Somehow'
  },
  {
    quote: 'The sky is the limit',
    artist: 'Biggie',
    song: 'Skys the limit'
  },
  {
    quote:
      "The mind is a terrible thing to waste, I show love cause it's a terrible thing to hate.",
    artist: 'Guru',
    song: 'Peace of mine'
  },
  {
    quote:
      'I came, I saw, I conquered. From record sales to sold out concerts.t',
    artist: 'Jay Z',
    song: 'Encore'
  }
];

function seedDB() {
  //Remove all campgrounds
  db.Quote.remove({}, function(err) {
    if (err) {
      console.log(err);
    }
    console.log('Removed all Quotes!');
    //add a few campgrounds
    data.forEach(function(seed) {
      db.Quote.create(seed, (err, quote) => {
        if (err) return console.log(err);
        console.log('Quote created');
      });
    });
  });
  //add a few comments
}

module.exports = seedDB;
