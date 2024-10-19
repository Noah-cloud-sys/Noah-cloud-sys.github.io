const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// Set up body-parser to handle form data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve HTML form directly from the server
app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Form Submission</title>
    </head>
    <body>
        <h1>Contact Us</h1>
        <form action="/submit-form" method="POST">
            <label for="name">Name:</label><br>
            <input type="text" id="name" name="name" required><br><br>

            <label for="email">Email:</label><br>
            <input type="email" id="email" name="email" required><br><br>

            <label for="message">Message:</label><br>
            <textarea id="message" name="message" required></textarea><br><br>

            <button type="submit">Submit</button>
        </form>
    </body>
    </html>
  `);
});

// Handle form submission (POST request)
app.post('/submit-form', (req, res) => {
  const { name, email, message } = req.body;

  // Log the form data to the console
  console.log(`Form Data Received:
  Name: ${name}
  Email: ${email}
  Message: ${message}`);

  // Send a response back to the client
  res.send(`Thank you, ${name}. We have received your message.`);
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
