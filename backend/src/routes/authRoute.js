const Router =  require("express");
const {
  signup,
  signin,
  //   logout,
  forgetPassword,
  forgetPasswod,
  //   verifyEmail,
    verifyPassResetCode,
    resetPassword,
}  = require("../controllers/authController");


const router = Router();

router.post("/signup", signup); // S4l3h
router.post("/signin", signin); // S4L3H
router.post('/forgetPassword', forgetPasswod); // mohamed 
router.route('/verifyResetCode').post(verifyPassResetCode); // mohamed
router.route('/resetPassword').put(resetPassword); // mohamed 

// router.post("/logout", logout); // K4R33M
// router.post("/forgot", forgotPassword); // K4R33M


module.exports =  router;
