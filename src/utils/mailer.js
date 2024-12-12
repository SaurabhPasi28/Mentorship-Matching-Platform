// import User from "@/models/userModel";
// import nodemailer from "nodemailer"
// import bcryptjs from "bcryptjs"

// export const sendEmail= async({email, emailType, userId})=>{
//     try{
//         const hashedToken=await bcryptjs.hash(userId.toString(), 10)

//         if(emailType=== "VERIFY"){
//             await User.findByIdAndUpdate(userId,
//                 {verifyToken: hashedToken, verifyTokenExpiry: Date.now()+ 3600000}
//             )
//         }else if(emailType==="RESET"){
//             await User.findByIdAndUpdate(userId,
//                 {forgotPasswordToken: hashedToken, forgotPasswordTokenExpiry: Date.now()+ 3600000}
//             )
//         }
//         const transporter = nodemailer.createTransport({
//             host: "sandbox.smtp.mailtrap.io",
//             port: 2525,
//             auth: {
//               user: "f1cbd0c067e9cf",
//               pass: "bdbdd81937b7bf"
//             }
//           });
          

//           const mailOptions={
//             from: 'saurabh@pasi.ai',
//             to: email,
//             subject: emailType=== 'VERIFY'?  "Verify your email" : "Reset your password",
//             html: `<p>Click <p href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here </a> to  ${emailType === "VERIFY" ? "Verify your email": "reset your password"} 
//             or copy and paste the link below in your browser. <br> ${process.env.DOMAIN}/verifyemail?token=${hashedToken} </p>`,
//           }

//          const mailResponse= await transporter.sendMail(mailOptions)
//          return mailResponse;
//     }
//     catch(error){
//         throw new Error(error.message);
//     }
// }



// import User from "@/models/userModel";
// import nodemailer from "nodemailer";
// import bcryptjs from "bcryptjs";

// export const sendEmail = async ({ email, emailType, userId }) => {
//     try {
//         // Generate a hashed token using the userId
//         const hashedToken = await bcryptjs.hash(userId.toString(), 10);

//         // Update the user's token based on the email type
//         if (emailType === "VERIFY") {
//             await User.findByIdAndUpdate(userId, {
//                 verifyToken: hashedToken,
//                 verifyTokenExpiry: Date.now() + 3600000, // Token valid for 1 hour
//             });
//         } else if (emailType === "RESET") {
//             await User.findByIdAndUpdate(userId, {
//                 forgotPasswordToken: hashedToken,
//                 forgotPasswordTokenExpiry: Date.now() + 3600000, // Token valid for 1 hour
//             });
//         } else {
//             throw new Error("Invalid emailType provided");
//         }
        
//         // Configure the transporter for sending emails
//         const transporter = nodemailer.createTransport({
//             host: "sandbox.smtp.mailtrap.io", // Mailtrap host
//             port: 2525,
//             auth: {
//                 user: process.env.MAILTRAP_USER, // Use environment variables for credentials
//                 pass: process.env.MAILTRAP_PASS,
//             },
//         });

//         // Email content
//         const mailOptions = {
//             from: 'saurabh@pasi.ai',
//             to: email,
//             subject: emailType === "VERIFY" ? "Verify Your Email" : "Reset Your Password",
//             html: `
//                 <p>
//                     Click <a href="${process.env.DOMAIN}/${
//                 emailType === "VERIFY" ? "verifyemail" : "resetpassword"
//             }?token=${hashedToken}">here</a> to ${
//                 emailType === "VERIFY" ? "verify your email" : "reset your password"
//             }.
//                 </p>
//                 <p>Or copy and paste the link below in your browser:</p>
//                 <p>${process.env.DOMAIN}/${
//                 emailType === "VERIFY" ? "verifyemail" : "resetpassword"
//             }?token=${hashedToken}</p>
//             `,
//         };

//         // Send the email
//         const mailResponse = await transporter.sendMail(mailOptions);
//         return mailResponse;
//     } catch (error) {
//         console.error("Error sending email:", error);
//         throw new Error(error.message);
//     }
// };


import User from "@/models/userModel";
import nodemailer from "nodemailer";
import crypto from "crypto";

export const sendEmail = async ({ email, emailType, userId }) => {
  try {
    // Generate a secure random token
    const token = crypto.randomBytes(32).toString("hex");

    // Define token type and expiry
    const tokenData = {
      token,
      expiry: Date.now() + 3600000, // Token valid for 1 hour
    };

    // Update user document based on email type
    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userId, {
        verifyToken: tokenData.token,
        verifyTokenExpiry: tokenData.expiry,
      });
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(userId, {
        forgotPasswordToken: tokenData.token,
        forgotPasswordTokenExpiry: tokenData.expiry,
      });
    } else {
      throw new Error("Invalid emailType provided");
    }

    // Configure nodemailer transporter
    const transporter = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io", // Mailtrap host
      port: 2525,
      auth: {
        user: process.env.MAILTRAP_USER, // Environment variables for credentials
        pass: process.env.MAILTRAP_PASS,
      },
    });

    // Generate email HTML content
    const link = `${process.env.DOMAIN}/${
      emailType === "VERIFY" ? "verifyemail" : "resetpassword"
    }?token=${token}`;

    const mailOptions = {
      from: "saurabh@pasi.ai",
      to: email,
      subject: emailType === "VERIFY" ? "Verify Your Email" : "Reset Your Password",
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.5; color: #333;">
          <h2>${
            emailType === "VERIFY"
              ? "Email Verification"
              : "Password Reset Request"
          }</h2>
          <p>Click the link below to ${
            emailType === "VERIFY" ? "verify your email" : "reset your password"
          }:</p>
          <a href="${link}" style="color: #007BFF;">${link}</a>
          <p>If you didn’t request this, you can safely ignore this email.</p>
        </div>
      `,
    };

    // Send email
    const mailResponse = await transporter.sendMail(mailOptions);
    return mailResponse;
  } catch (error) {
    console.error(`Error in sendEmail (${emailType}):`, error);
    throw new Error("Email could not be sent. Please try again later.");
  }
};
