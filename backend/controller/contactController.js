const Contact = require('../model/Contact');
const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
  service: process.env.SMPT_SERVICE,
  host: process.env.SMPT_HOST,
  port: process.env.SMPT_PORT,
  secure: true,
  auth: {
    user: process.env.SMPT_MAIL,
    pass: process.env.SMPT_PASSWORD,
  },
});

exports.submitContactForm = async (req, res) => {
  const { name, email, message } = req.body;
  const ipAddress = req.ip;

  try {
    const contact = new Contact({ name, email, message, ipAddress });
    await contact.save();

    const userMailOptions = {
      from: process.env.SMPT_MAIL,
      to: email,
      subject: 'Thank you for contacting us',
      text: `Hi ${name},\n\nThank you for reaching out. We have received your message and will get back to you shortly.\n\nYour Message:\n${message}\n\nBest regards,\nYour Company`,
    };

    const adminMailOptions = {
      from: process.env.SMPT_MAIL,
      to: process.env.SMPT_MAIL,
      subject: 'New Contact Us Message',
      text: `New message from:\n\nName: ${name}\nEmail: ${email}\nMessage: ${message}\nIP Address: ${ipAddress}`,
    };

    await transporter.sendMail(userMailOptions);
    await transporter.sendMail(adminMailOptions);

    res.status(200).send('Message sent successfully');
  } catch (error) {
    console.error('Error saving message to database or sending email', error);
    res.status(500).send('Internal Server Error');
  }
};
