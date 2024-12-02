const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
exports.getIndexPage=(req,res)=>{
 res.status(200).json({message:"Welcome to the home"})
}
