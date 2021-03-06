const moment = require('moment');
const express = require('express');
const router = express.Router();
const {Rental} = require('../models/rental');
const {Movie} = require('../models/movies');
const auth = require('../middleware/auth');

router.post('/',auth, async (req, res) => {
  if (!req.body.customerId) return res.status(400).send('customerId is not provided.');
  if (!req.body.movieId) return res.status(400).send('movieId is not provided.');

  const rental = await Rental.findOne({
    'customer._id': req.body.customerId,
    'movie._id': req.body.movieId,
  });

  if(!rental) return res.status(404).send('rental object could not be found.');

  if(rental.dateReturned) return res.status(400).send('Return already processed.');

  rental.dateReturned = new Date();
  await rental.save()

  rental.rentalFee = moment().diff(rental.dateOut,'days') * rental.movie.dailyRentalRate;
  await rental.save();
  

  await Movie.update({_id: rental.movie._id},{
    $inc: { numberInStock:1 }
  });
  

  return res.status(200).send(rental);
   
});

module.exports = router;