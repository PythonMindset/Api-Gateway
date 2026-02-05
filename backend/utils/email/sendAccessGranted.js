const fs = require('fs');
const path = require('path');
const transporter = require('../../config/email');

async function sendAccessGrantedEmail(email, password, loginUrl = process.env.ALLOWED_ORIGINS + '/login') {
    try {
        const templatePath = path.join(__dirname, 'accessGranted.html');
        let htmlContent = fs.readFileSync(templatePath, 'utf8');

        htmlContent = htmlContent.replace(/{{email}}/g, email);
        htmlContent = htmlContent.replace(/{{password}}/g, password);
        htmlContent = htmlContent.replace(/{{loginUrl}}/g, loginUrl);
        htmlContent = htmlContent.replace(/{{name}}/g, process.env.PROJECT_MANAGER_NAME || 'Project Manager');

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Welcome to Project Manager - Your Account Credentials',
            html: htmlContent
        };

        const info = await transporter.sendMail(mailOptions);
        console.log('Access granted email sent:', info.messageId);
        return { success: true, messageId: info.messageId };
    } catch (error) {
        console.error('Error sending access granted email:', error);
        throw error;
    }
}

module.exports = sendAccessGrantedEmail;