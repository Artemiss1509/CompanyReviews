const db = require('../utils/DB-Connection');
const Review = require('../models/reviewModel');
const sequelize = require('../utils/DB-Connection');

const getReviews = async (req,res)=>{
    try {
        const name = req.query.name;
        const reviews = await Review.findAll({where:{companyName:name}});
        res.status(200).json(reviews);

    } catch(error){
        console.log(error);
    }
}

const addReview = async (req,res)=>{
    try {
        const review = await Review.create(req.body);
        res.status(201).json(review);
    } catch(error){
        console.log(error);
    }
}

const getAvg = async (req,res)=>{
    try {
        const name = req.query.name;
        const avg = await Review.findAll({
            attributes: [[sequelize.fn('AVG', sequelize.col('stars')),'avgStars']],
            where:{companyName:name}
        });
        res.status(200).json(avg);
    } catch(error){
        console.log(error);
    }
}

module.exports = {
    addReview,
    getReviews,
    getAvg  
        };
        