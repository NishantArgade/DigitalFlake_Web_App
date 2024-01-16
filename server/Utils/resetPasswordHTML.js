export default (resetPasswordToken) => {
  return `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Password Reset</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                margin: 0;
                padding: 0;
                background-color: #f4f4f4;
            }
    
            .container {
                max-width: 600px;
                margin: 50px auto;
                background-color: #fff;
                padding: 20px;
                border-radius: 8px;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            }
    
            h2 {
                color: #333;
            }
    
            p {
                color: #555;
            }
    
            a {
                display: inline-block;
                padding: 10px 20px;
                margin: 20px 0;
                text-decoration: none;
                background-color: #007BFF;
                color: #fff !important; /* Text color set to white */
                border-radius: 5px;
            }
    
            a:hover {
                background-color: #0056b3;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <h2>Password Reset Request</h2>
            <p>We have received a password reset request. Please use the below link to reset your password.</p>
            <a href="http://localhost:5173/reset-password/${resetPasswordToken}" target="_blank">Reset Password</a>
            <p>This reset password link will be only valid for 10 minutes.</p>
        </div>
    </body>
    </html>
    
    `;
};
