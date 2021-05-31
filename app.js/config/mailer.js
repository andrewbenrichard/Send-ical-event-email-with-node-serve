const nodemailer = require('nodemailer');
// const hbs = require("nodemailer-express-handlebars")


let transporter = nodemailer.createTransport({
    service: 'gmail',
    secure: false,
    auth: {
        user: 'eventsche111@gmail.com',
        pass: 'passowrdgenerator'
    },
    tls: {
        rejectUnauthorized: false
    }
});


// const handlebarOptions = {
//     viewEngine: {
//         extName: '.handlebars',
//         partialsDir: 'server/views/patials',
//         layoutsDir: 'server/views/layouts',
//         defaultLayout: '',
//     },
//     viewPath: 'server/views/templates',
//     extName: '.handlebars',
// };

// transporter.use('compile');



exports.welcomeMail = (email, name, content, subject) => transporter.sendMail({
    from: 'Vue Mailer',
    to: email,
    subject: "Event Details with "+name,
    text: subject,
    context: {
        user: name
    },
    icalEvent: {
        filename: 'invitation.ics',
        method: 'request',
        content: content
    }
});