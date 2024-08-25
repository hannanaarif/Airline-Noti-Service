const express=require('express');
const {serverconfig,Logger}=require('./config');
const apiRoutes=require('./routes');
const app=express();
const mailsender=require('./config/email-config')
app.use(express.json());
app.use(express.urlencoded({extended:true}));
const PORT=serverconfig.PORT;

app.use('/api',apiRoutes);

app.listen(PORT,async ()=>{
    console.log(`Successfully started the server on PORT: ${PORT}`);
    try {
        const response= await mailsender.sendMail({
            from:serverconfig.GMAIL_EMAIL,
            to:'hannanaarif@gmail.com',
            subject:'is the service working',
            text:'Yes it is working now after text'
        })
        console.log(response)
        Logger.info("Successfully started the server",{});
    } catch (error) {
        console.log(error);
    }
   
})