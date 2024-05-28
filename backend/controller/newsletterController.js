// backend/controller/newsletterController.js
const mailchimp = require('@mailchimp/mailchimp_marketing');

mailchimp.setConfig({
  apiKey: process.env.MAILCHIMP_API_KEY,
  server: process.env.MAILCHIMP_SERVER_PREFIX // e.g. 'us1'
});

exports.subscribe = async (req, res) => {
  const { email } = req.body;

  try {
    const response = await mailchimp.lists.addListMember(process.env.MAILCHIMP_AUDIENCE_ID, {
      email_address: email,
      status: 'subscribed',
    });

    res.status(200).json({ message: 'Subscription successful', response });
  } catch (error) {
    console.error('Error subscribing to newsletter', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
