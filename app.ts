import {DB} from "./db";


const yargs_userInfo=require('yargs').argv;
let data={
    name:yargs_userInfo.name,
    email:yargs_userInfo.email,
    address:yargs_userInfo.address
}


let db_obj=new DB();



if(yargs_userInfo.opt==="s"){
    
    db_obj.select();
    //console.log(data1);
    
    
}
if(yargs_userInfo.opt==="c"){
    db_obj.create(data);
}if(yargs_userInfo.opt==="u"){
    db_obj.update(10,data);
}if(yargs_userInfo.opt==="d"){
    db_obj.delete(yargs_userInfo.id)
}




// var nodemailer = require('nodemailer');

// var transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: 'jobayer@webpers.com',
//     pass: 'webpersJobayer64'
//   }
// });

// var mailOptions = {
//   from: 'jobayer@webpers.com',
//   to: 'jobayer@webpers.com',
//   subject: 'Demo mail test',
//   text: 'Dummy mail body',
//   attachments:[
//       {
//         filename: 'license.png',
//         path:'https://cdn.pixabay.com/photo/2014/09/28/10/36/road-sign-464647_960_720.png'
//       }
//   ]
// };

// transporter.sendMail(mailOptions, function(error, info){
//   if (error) {
//     console.log(error);
//   } else {
//     console.log('Email sent: ' + info.response);
//   }
// });