var nodemailer = require('nodemailer');

var smtpTransport = nodemailer.createTransport('SMTP', {
    service: 'Gmail',
    auth: {
        user: 'keepupthestreak@gmail.com',
        pass: 'booty12345'
    }
});

smtpTransport.sendMail( createEmail( userEmail, dayCount ), function( error, response ) {
  if ( error ) {
    //do some proper error handling
  } else {
    console.log('Message Sent: ' + response.message );
  }
});

function createEmail ( userEmail, dayCount ) {
  var email = {
      from: 'Keep Streaking <keepupthestreak@gmail.com>',
      to: userEmail,
      subject: 'Keep up your ' + dayCount +  ' day streak!',
      text: "You're gonna lose your streak of " + dayCount + " days if you don't make a commit soon! GET ON IT! KEEP STREAKING!",
      html: ''
  };

  return email;
}

