'use strict';

module.exports = function(transporter) {
  console.log(transporter);
  
  var User = require('../api/user/user.model');
  
  User.schema.post('save', sendVerificationEmail);

  function sendVerificationEmail(user) {
    console.log('sending verification email: ', user);
    var mailOptions = {
      from: 'Metaracer <omrra@metaracer.com>', // sender address
      to: user.email, // list of receivers
      subject: 'Please Verify Your Email Address ', // Subject line
      text: 'Hello world ✔', // plaintext body
      html: '<b>Hello world ✔</b>' // html body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, function(error, info){
        if(error){
            console.log(error);
        }else{
            console.log('Message sent: ' + info.response);
        }
    });
  }
  
};