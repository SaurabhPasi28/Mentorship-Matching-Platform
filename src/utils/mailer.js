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



import User from "@/models/userModel";
import nodemailer from "nodemailer";
import bcryptjs from "bcryptjs";

export const sendEmail = async ({ email, emailType, userId }) => {
    try {
        // Generate a hashed token using the userId
        const hashedToken = await bcryptjs.hash(userId.toString(), 10);

        // Update the user's token based on the email type
        if (emailType === "VERIFY") {
            await User.findByIdAndUpdate(userId, {
                verifyToken: hashedToken,
                verifyTokenExpiry: Date.now() + 3600000, // Token valid for 1 hour
            });
        } else if (emailType === "RESET") {
            await User.findByIdAndUpdate(userId, {
                forgotPasswordToken: hashedToken,
                forgotPasswordTokenExpiry: Date.now() + 3600000, // Token valid for 1 hour
            });
        } else {
            throw new Error("Invalid emailType provided");
        }
        
        // Configure the transporter for sending emails
        const transporter = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io", // Mailtrap host
            port: 2525,
            auth: {
                user: process.env.MAILTRAP_USER, // Use environment variables for credentials
                pass: process.env.MAILTRAP_PASS,
            },
        });

        // Email content
        const mailOptions = {
            from: 'saurabh@pasi.ai',
            to: email,
            subject: emailType === "VERIFY" ? "Verify Your Email" : "Reset Your Password",
            html: `
                <p>
                    Click <a href="${process.env.DOMAIN}/${
                emailType === "VERIFY" ? "verifyemail" : "resetpassword"
            }?token=${hashedToken}">here</a> to ${
                emailType === "VERIFY" ? "verify your email" : "reset your password"
            }.
                </p>
                <p>Or copy and paste the link below in your browser:</p>
                <p>${process.env.DOMAIN}/${
                emailType === "VERIFY" ? "verifyemail" : "resetpassword"
            }?token=${hashedToken}</p>
            `,
        };

        // Send the email
        const mailResponse = await transporter.sendMail(mailOptions);
        return mailResponse;
    } catch (error) {
        console.error("Error sending email:", error);
        throw new Error(error.message);
    }
};
