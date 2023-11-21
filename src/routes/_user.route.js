import express from 'express';
import authJwt from "../middlewares/authJwt.js"
import controller from "../controllers/_user.controller.js"
import authRole from "../controllers/authRole.controller.js"

// import { verifySignUp } from "../middlewares/index.js"; 
import verifySignUp from "../middlewares/verifySignUp.js"

const router = express.Router();


router.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

router.get("/test/all", controller.allAccess);

router.get("/test/user", [authJwt.verifyToken], controller.userBoard);

router.get(
  "/test/mod/:userid",
  [authJwt.verifyToken, authJwt.isModerator],
  controller.moderatorBoard
  );

router.get(
  "/test/admin/:userid",
  [authJwt.verifyToken, authJwt.isAdmin],
  controller.adminBoard
  );

router.post(
  "/test/signup",
  [
  verifySignUp.checkDuplicateFirstnameOrEmail,
  verifySignUp.checkRolesExisted
  ],
  authRole.signup
  );

router.post("/test/signin", authRole.signin);


export default router;
