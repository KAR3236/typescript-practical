import * as nodemailer from 'nodemailer';

export async function sendEmail(subject: string, text: string) {
  // Create a Nodemailer transporter
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'kaushikrathod3236@gmail.com',
      pass: 'Kaushik@3236',
    },
  });

  // Define email options
  const mailOptions = {
    from: 'kaushikrathod3236@gmail.com',
    to: 'kaushik.rathod@tatvasoft.com',
    subject,
    text,
  };

  try {
    // Send the email
    return await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error('Error sending email:', error);
  }
}
