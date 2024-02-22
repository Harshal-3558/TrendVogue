import connectDB from "@/middleware/mongoose";
import user from "@/models/user";
import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";

const handler = async (req, res) => {
  if (req.method == "POST") {
    let u = await user.findOne({ email: req.body.email });
    if (u) {
      const transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        auth: {
          user: "alexandrine77@ethereal.email",
          pass: "HSyj1bFa8njkR1UEgz",
        },
      });
      const token = jwt.sign(
        { email: u.email, name: u.name },
        process.env.JWT_SECRET_KEY,
        { expiresIn: "2d" },
      );
      const info = await transporter.sendMail({
        from: "alexandrine77@ethereal.email", // sender address
        to: u.email, // list of receivers
        subject: "Password Reset", // Subject line
        html: `
          <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
          <html xmlns="http://www.w3.org/1999/xhtml">

          <head>
            <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Reset your password</title>
            <!--[if mso]><style type="text/css">body, table, td, a { font-family: Arial, Helvetica, sans-serif !important; }</style><![endif]-->
          </head>

          <body style="font-family: Helvetica, Arial, sans-serif; margin: 0px; padding: 0px; background-color: #ffffff;">
            <table role="presentation"
              style="width: 100%; border-collapse: collapse; border: 0px; border-spacing: 0px; font-family: Arial, Helvetica, sans-serif; background-color: rgb(239, 239, 239);">
              <tbody>
                <tr>
                  <td align="center" style="padding: 1rem 2rem; vertical-align: top; width: 100%;">
                    <table role="presentation" style="max-width: 600px; border-collapse: collapse; border: 0px; border-spacing: 0px; text-align: left;">
                      <tbody>
                        <tr>
                          <td style="padding: 40px 0px 0px;">
                            <div style="padding: 20px; background-color: rgb(255, 255, 255);">
                              <div style="color: rgb(0, 0, 0); text-align: left;">
                                <h1 style="margin: 1rem 0">Trouble signing in?</h1>
                                <p style="padding-bottom: 16px">We've received a request to reset the password for this user account.</p>
                                <p style="padding-bottom: 16px"><a href="${process.env.NEXT_PUBLIC_HOST}/PasswordReset?token=${token}" target="_blank"
                                    style="padding: 12px 24px; border-radius: 4px; color: #FFF; background: #2B52F5;display: inline-block;margin: 0.5rem 0;">Reset
                                    your password</a></p>
                                <p style="padding-bottom: 16px">If you didn't ask to reset your password, you can ignore this email.</p>
                                <p style="padding-bottom: 16px">Thanks,<br>The TrendVogue team</p>
                              </div>
                            </div>
                            <div style="padding-top: 20px; color: rgb(153, 153, 153); text-align: center;">
                              <p style="padding-bottom: 16px">© 2023 - TrendVogue. All rights reserved.</p>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>
          </body>
          </html>`,
      });
      res.status(200).json({ success: true, message: info });
    } else {
      res.status(500).json({ success: false });
    }
  }
};

export default connectDB(handler); //To check whether connected to DB or not and then it is returned