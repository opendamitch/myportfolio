const sgMail = require('@sendgrid/mail');

// Set your SendGrid API key
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

module.exports = async (req, res) => {
    // Check if the request method is POST
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed', allowedMethods: ['POST'] });
    }

    // Destructure name, email, and message from the request body
    const { name, email, message } = req.body;

    // Check if name, email, and message are provided
    if (!name || !email || !message) {
        return res.status(400).json({ error: 'Please provide name, email, and message' });
    }

    // Define the email message
    const msg = {
        to: 'opendamitch@gmail.com', // Update with your email address
        from: email,
        subject: 'New Form Submission',
        text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
    };

    try {
        // Send the email
        await sgMail.send(msg);
        return res.status(200).json({ message: 'Email sent successfully' });
    } catch (error) {
        console.error('Error sending email:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};
