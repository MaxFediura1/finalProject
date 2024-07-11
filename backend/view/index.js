const nodemailer = require("nodemailer");
const handlebars = require("handlebars");
const {readFile} = require("fs").promises
  
//   async function sendEmail() {
//     const info = await transporter.sendMail({
//       from: '', 
//       to: 'maxfediura@gmail.com', 
//       subject: "Hello ✔",
//       text: "Hello world?", 
//       html: "<b>Hello world?</b>", 
//     });
//     console.log("Message sent: %s", info.messageId);
//   }
  





const readHTMLFile = async (path) =>{ 
  return readFile(path, { encoding: "utf-8" })
}


const config = {
    service:process.env.SERVICE,
    auth: {
        user:process.env.EMAIL,
        pass:process.env.PASSWORD,
    },
}

  const sendEmail = async (name,email) => {
    const transporter = nodemailer.createTransport(config);

    try
    {
        const html = await readHTMLFile(__dirname + "/emailTemplate.hbs");
        const template = handlebars.compile(html);
        
        const htmlToSend = template({name});
        const mailOptions = {
            from: `training web <${process.env.EMAIL}>`,
            to: email,
            subject: "registration",
            html:htmlToSend
        };
        await transporter.sendMail(mailOptions)
        console.log("email sent")
    } catch (error) {
        console.log(error)
    }

  };

  module.exports = {sendEmail}