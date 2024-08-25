const dotenv=require('dotenv');

dotenv.config();

module.exports={
    PORT:process.env.PORT||5000,
    GMAIL_PASS:process.env.GMAIL_PASS,
    GMAIL_EMAIL:process.env.GMAIL_EMAIL
}