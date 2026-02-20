import colors from 'colors';

/**
 * Simulates sending an email by logging it to the console with rich formatting.
 * In a production environment, this would integrate with Nodemailer, SendGrid, etc.
 */
const sendEmail = async (to: string, subject: string, html: string) => {
  console.log(colors.cyan.bold('\n--- Simulated Email Sent ---'));
  console.log(colors.yellow(`To: `) + to);
  console.log(colors.yellow(`Subject: `) + subject);
  console.log(colors.white(`Body: \n`) + html);
  console.log(colors.cyan.bold('---------------------------\n'));
};

export const EmailHelper = {
  sendEmail,
};
