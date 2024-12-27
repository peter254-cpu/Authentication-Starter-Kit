import {
  PASSWORD_RESET_REQUEST_TEMPLATE,
  VERIFICATION_EMAIL_TEMPLATE,
} from "./emailTemplates.js";
import { mailtrapClient, sender } from "./mailtrap.config.js";

export const sendVerificationEmail = async (email, verificationToken) => {
  const recipient = [{ email }];
  try {
    const res = await mailtrapClient.send({
      from: sender,
      to: recipient,
      subject: "Verify Your Email",
      html: VERIFICATION_EMAIL_TEMPLATE.replace(
        "{verificationCode}",
        verificationToken
      ),
      category: "Email Verification",
    });
    console.log("Email Sent Successfully", res);
  } catch {
    console.error("Error Sending Email", error);
    throw new Error(`Error sending Email: ${error}`);
  }
};

export const sendWelcomeEmail = async (email, name) => {
  const recipient = [{ email }];
  try {
    const res = await mailtrapClient.send({
      from: sender,
      to: recipient,
      template_uuid: "1abc3f73-054c-41e4-a5d7-4409f1b25f9a",
      template_variables: {
        company_info_name: "Auth Company",
        name: "name",
      },
    });
    console.log("Welcome Email Sent Successfully", res);
  } catch (error) {
    431443;
    console.log("Error senidng verification emaill", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const sendPasswordResetEmail = async (email, resetURL) => {
  const recipient = [{ email }];
  try {
    const res = await mailtrapClient.send({
      from: sender,
      to: recipient,
      subject: "Reset your Password",
      html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetURL),
      category: "Password Reset",
    });
  } catch (error) {
    console.log("Couldn't send email to reset password", error.message);
    throw new Error(`Error Sending password reset email: ${error}`);
  }
};

export const sendResetSuccessEmail = async (email) => {
  const recipient = [{ email }];
  try {
    const res = await mailtrapClient.send({
      from: sender,
      to: recipient,
      subject: "Password Reset Success",
      html: PASSWORD_RESET_REQUEST_TEMPLATE,
      category: "Password Reset",
    });
  } catch (error) {
    console.log("Error in Password Rest", error.message);
    throw new Error(`Error Sending password reset success email: ${error}`);
  }
};
