const express = require('express');
const nodemailer = require('nodemailer');
const app = express();
const port = 3000;


app.use(express.urlencoded({ extended: true })); // For parsing application/x-www-form-urlencoded


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html'); // Send HTML file on GET request
});


app.post('/submit-form', (req, res) => {
    const { username, email, message } = req.body; // Access form data

    
    const transporter = nodemailer.createTransport({
        service: 'gmail', 
        auth: {
            user: 'noahtouchstone@gmail.com', 
            pass: 'Opelika2020!', 
        },
    });

    // Email options
    const mailOptions = {
        from: email, // Sender's email (from the form)
        to: 'noahtouchstone@gmail.com', // Replace with your email
        subject: `Contact Form Submission from ${username}`,
        text: `You have a new message:\n\nName: ${username}\nEmail: ${email}\nMessage: ${message}`,
    };

    // Send email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
            res.status(500).send('An error occurred while sending your message.');
        } else {
            console.log('Email sent:', info.response);
            res.send('Your message has been sent successfully!');
        }
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
