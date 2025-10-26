const express = require('express');
const routes = express.Router();
const reviewController = require('../controllers/reviewController');


routes.post('/',reviewController.addReview);
routes.get('/',reviewController.getReviews);
routes.get('/avg',reviewController.getAvg);

module.exports = routes;