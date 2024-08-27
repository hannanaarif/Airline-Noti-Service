const express=require('express');
const {serverconfig,Logger}=require('./config');
const apiRoutes=require('./routes');
const app=express();
const mailsender=require('./config/email-config');
const amqplib=require('amqplib');
const {EMAILSERVICE}=require('./services')

async function connectQueue(){
    try {
        const connection=await amqplib.connect("amqp://localhost");
        const channel=await connection.createChannel();
        await channel.assertQueue("noti-queue");
        channel.consume("noti-queue",async(data)=>{
            console.log(`${Buffer.from(data.content)}`);
            const object=JSON.parse(`${Buffer.from(data.content)}`);
            // const object=JSON.parse(Buffer.from(data).toString);
            await EMAILSERVICE.sendEmail("airnoti4@gmail.com",object.recepientEmail,object.subject,object.text);
            channel.ack(data);
        })  
    } catch (error) {
        console.log("while sending email got error",error);
        throw error;
    }
}


app.use(express.json());
app.use(express.urlencoded({extended:true}));
const PORT=serverconfig.PORT;

app.use('/api',apiRoutes);

app.listen(PORT,async ()=>{
    console.log(`Successfully started the server on PORT: ${PORT}`);
    Logger.info("Successfully started the server",{});
    await connectQueue();
    console.log("que is up");
})