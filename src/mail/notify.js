
const hbs = require("nodemailer-express-handlebars");

const nodemailer = require("nodemailer");
const path = require("path");

const handlebarOptions = {
    viewEngine: {
        extName: ".hbs",
        partialsDir: path.resolve("src/views"),
        defaultLayout: false
    },
    viewPath: path.resolve("src/views"),
    extName: ".hbs"
};

const notifyEmail = async (options) => {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASSWORD
        }
    });

    transporter.use("compile", hbs(handlebarOptions));

    const message = {
        from: `${process.env.SMTP_FROM_NAME} <${process.env.SMTP_FROM_EMAIL}>`,
        to: options.sendTo, // Make sure options.sendTo is a valid email address
        subject: options.subject,
        template: "notifyEmail",
        context: {
            userName: options.username,
            description: options.description
        }
    };
    
    console.log("Email options:", options);
    try {
        const { accepted, ...rest } = await transporter.sendMail(message);
        console.log({ ...rest, accepted });
        if (accepted.length > 0) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        console.log("Error while sending email ",error);
    }
};

module.exports = notifyEmail;