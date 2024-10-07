import { Router } from "express";
import {
  signup,
  signin,
  //   logout,
  //   forgotPassword,
  //   verifyEmail,
  //   resetPassword,
} from "../controllers/authController.js";

const router = Router();

router.post("/signup", signup); // S4l3h
router.post("/signin", signin); // S4L3H

// router.post("/logout", logout); // K4R33M
// router.post("/forgot", forgotPassword); // K4R33M

// router.post("/verify-email", verifyEmail); // M0H4MM3D
// router.post("/reset-password/:id", resetPassword); // M0H4MM3D

export default router;
