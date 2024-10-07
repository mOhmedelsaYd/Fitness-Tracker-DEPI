const bcryptjs = require("bcryptjs");
const User = require("../models/userModel");
const generateToken = require('../utils/generateTokenAndSetCookie');
const crypto = require('crypto');  // Assuming you're using modules
const sendEmail = require("../nodemailer/emails");
const asyncHandler = require('express-async-handler');
const ApiError = require('../utils/ApiError');

exports.signup = async (req, res) => {
  
    // 1-create user

    const user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    });

    // 2-generate token
    const token = generateToken(user._id);

    res.status(201).json({data: user, token})
};





exports.signin = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      throw new Error("All inputs are required");
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User not found" });
    }

    const isPasswordValid = !!(await bcryptjs.compare(password, user.password)); // user.password => hashed password

    if (!isPasswordValid) {
      return res
        .status(400)
        .json({ success: false, message: "Wrong credentials" });
    }

    generateToken(user._id);

    res.status(200).json({
      success: true,
      message: "Logged in successfully",
      user: {
        ...user._doc,
        password: undefined,
      },
    });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};


// @desc forget password
// @route POST /api/auth/forgetPassword
// @access Public

exports.forgetPasswod = asyncHandler(async (req, res, next) => {
    // 1- get user by email
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
        return next(new ApiError(`There is no user for this email ${req.body.email}`, 404))
    }
    // 2- check if user exists, generate reset random 6 number, save it in our db
    const resetCode = Math.floor(100000 + Math.random() * 900000).toString();
    const hasedResetCode = crypto.createHash('sha256').update(resetCode).digest('hex');

    //saved hased reset code in db 
    user.passwordResetCode = hasedResetCode;
    user.passwordResetExpires = Date.now() + 10 * 60 * 1000; // 10 min
    user.passwordResetVerified = false // not verified yet

    await user.save();

    // 3- send the reset code via email
    
    
    const message = `Hi ${user.name},\nWe received a request to reset the password on your E-shop Account. \n${resetCode} \nEnter this code to complete the reset. \nThanks for helping us keep your account secure.\nThe E-shop Team`;
    try {
        await sendEmail({
            email: user.email,
            subject: 'Your password reset code (valid for 10 min)',
            message,
        });
    } catch (err) {
        user.passwordResetCode = undefined
        user.passwordResetExpires = undefined
        user.passwordResetVerified = undefined
        await user.save();

        return next(new ApiError('Email could not be sent', 500))
    }

    res.status(200).json({status: 'Success', message: 'Reset code sent to email'})
})


// @desc verify reset password
// @route POST /api/auth/verifyResetCode
// @access Public

exports.verifyPassResetCode = asyncHandler(async (req, res, next) => {
    // 1) get user based on  reset code
    const hashedResetCode = crypto.createHash('sha256').update(req.body.resetCode).digest('hex');

    const user = await User.findOne({ passwordResetCode: hashedResetCode, passwordResetExpires: {$gt: Date.now()} });

    if (!user) {
        return next(new ApiError(`Invalid reset code or expired`, 400))
    }

    // 2) Reset code valid
    user.passwordResetVerified = true

    await user.save();

    res.status(200).json({status: 'Success', message: 'Reset code verified'})
})


// @desc reset password
// @route PUT /api/auth/resetPassword
// @access Public

exports.resetPassword = asyncHandler(async (req, res, next) => {
    // 1) get user based on email

    const user = await User.findOne({ email: req.body.email });
    if (!user) {
        return next(new ApiError(`there is no user with this email`, 404))
    }
    // check if reset code verified
    if (!user.passwordResetVerified) {
        return next(new ApiError(`password reset code has not been verified`, 400))
    }

    user.password = req.body.newPassword;
    user.passwordResetCode = undefined;
    user.passwordResetExpires = undefined;
    user.passwordResetVerified = undefined;

    await user.save();
    // 3) if everything is ok, generate token
    const token = generateToken(user._id);

    res.status(200).json({ data: user, token });
})