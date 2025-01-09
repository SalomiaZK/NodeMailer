import { createTransport } from 'nodemailer';
import 'dotenv/config';  // Charge automatiquement le fichier .env
import TheMail from "./src/entity/TheMail.js"


  const  transporter = createTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.FORWARDER_EMAIL,
    pass: process.env.PASSWORD
  }
});

let mailOptions = new TheMail(
  process.env.FORWARDER_EMAIL, 
  process.env.RECEIVER_EMAIL, 
  "SENDING EMAIL WITH NODEMAILER" , 
  'hehehehehehhehe '

)

// var mailOptions = {
//   from: 'hei.salomia.20@gmail.com',
//   to: 'salomia.razakarivony@gmail.com',
//   subject: 'Sending Email using Node.js',
//   text: 'sorry ! another one was needed'
// };

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    throw new Error(error)
  } else {
    return('Email sent successfully');
  }
});