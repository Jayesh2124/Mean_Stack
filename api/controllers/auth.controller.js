import { Role } from "../models/role.models.js";
import { User } from "../models/user.models.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { CreateError } from "../utils/error.js";
import { CreateSuccess } from "../utils/success.js";
import userTokenModels from "../models/userToken.models.js";
import nodemailer from 'nodemailer'


export const Register = async (req, res, next) => {
    try {
        const role = await Role.find({ role: "User" });
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(req.body.password, salt);
        const newUser = new User(
            {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                userName: req.body.userName,
                emails: req.body.email,
                password: hashPassword,
                roles: role
            }
        )
        await newUser.save();
        return next(CreateSuccess(200, "User is Registered!", newUser))
    } catch (error) {
        return next(CreateError(500, `Internal Server Error : ${error.message}`))
    }
}

export const Login = async (req, res, next) => {
    try {
        const user = await User.findOne({ emails: req.body.email })
            .populate("roles", "role");
        const { roles } = user;

        if (!user) {
            return next(CreateError(404, "User not found!"))
        }
        const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password);
        if (!isPasswordCorrect) {
            return next(CreateError(400, "Password is Incorrect!"))
        }
        const token = jwt.sign(
            {
                id: user._id,
                isAdmin: user.isAdmin,
                roles: roles
            },
            process.env.JWT_SECRETE
        )
        res.cookie("access_token", token, { httpOnly: true })
            .status(200)
            .json({
                status: 200,
                message: "Login Success!",
                data: user,
            })

    } catch (error) {
        return next(CreateError(500, `Internal Server Error : ${error.message}`))
    }
}

export const RegisterAdmin = async (req, res, next) => {
    try {
        const role = await Role.find({});
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bceypt.hash(req.body.password, salt);
        const newUser = new User(
            {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                userName: req.body.userName,
                emails: req.body.emails,
                password: hashPassword,
                roles: role
            }
        )
        await newUser.save();
        return next(CreateSuccess(200, "Admin is Registered!", newUser))
    } catch (error) {
        return next(CreateError(500, `Internal Server Error : ${error.message}`))
    }
}



export const sendEmail = async (req, res, next) => {
    try {
        const email = req.body.email;
        const user = await User.findOne({ emails: { $regex: '^' + email + '$', $options: 'i' } })
        if (!user) {
            return next(CreateError(404, "User not found to rest the email!"));
        }
        const payload = {
            email: user.emails
        }
        const expiryTime = 300;
        const token = jwt.sign(payload, process.env.JWT_SECRETE, { expiresIn: expiryTime });

        const newToken = new userTokenModels({
            userId: user._id,
            token: token,
        })

        const mailTransporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: "jayeshsutar1108@gmail.com",
                pass: "tujpmfnyeuwlaghh"
            }
        })

        console.log("portal ", process.env.LINE_URL)
        let mailDetails = {
            from: "jayeshsutar1108@gmail.com",
            to: email,
            subject: "Reset Password",
            html: `
            <html>
            <head>
                <title> Password Reset Request </title>
            </head>
                <body>
                    <div style="display: flex;
                    flex-direction: column;
                    border: 3px solid black;
                    gap: 0;">
                            <div style="justify-content: center;
                            display: flex;
                            text-decoration: underline;">
                                <h1 > Password Reset Request </h1>
                            </div>
                            <p> Dear ${user.userName}, </p>
                            <a style="display: flex; justify-content: center;" href="${process.env.LINE_URL}/reset/${token}"><button style="background-color: #4CAF50; color:white; padding: 14px 20px; border:none; cursor: pointer;
                                        border-radius:4px"> Reset Password</button> </a>
                            <p> Please note that this link is only valid for 5 min. If you did not request a password reset, please disregard
                                this message. </p>
                            <p> Thank you, </p>
                            <p> Jayesh2124 </p> 
                    </div>
                </body>
            </html>
            `
        };
        mailTransporter.sendMail(mailDetails, async (err, data) => {
            if (err) {
                console.log(err);
                return next(CreateError(500, "Something went wrong while sending mail"));
            } else {
                await newToken.save();
                return next(CreateSuccess(200, "Email sent Successfully"));
            }
        })

    } catch (error) {
        return next(CreateError(500, `Internal Server Error : ${error.message}`))
    }
}


export const resetPassword = (req,res,next) =>{
    const token = req.body.token;
    const newPassword = req.body.password;

    jwt.verify(token,process.env.JWT_SECRETE, async(err, data)=>{
        if(err){
            return next(CreateError(500,"Reset Link is Expired"));
        }
        else{
            const response = data
            const user = await User.findOne({ emails: { $regex: '^' + response.email + '$', $options: 'i' } })
            const salt = await bcrypt.genSalt(10);
            const encryptedPassword = await bcrypt.hash(newPassword,salt);
            user.password = encryptedPassword;
            try {
                const updatedUser = await User.findOneAndUpdate(
                    {_id:user._id},
                    {$set:user},
                    {new:true} 
                )
                return next(CreateSuccess(200, "Password Reset Successfully!"));
            } catch (error) {
                return next(CreateError(500,"Something went wrong while resetting password"));
            }

        }
    })
}