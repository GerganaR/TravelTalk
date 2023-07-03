const express = require("express");
const { check } = require("express-validator");

const Auth = require("../middleware/check-auth");
const usersController = require("../controllers/users-controllers");
const fileUpload = require("../middleware/file-upload");

const router = express.Router();

router.get("/", usersController.getUsers);
router.get("/profile/:uid", usersController.getUserById);
router.get("/profile/following/:uid", usersController.getFriendsByUserId);
router.get("/profile/followers/:uid", usersController.getFollowersByUserId);
router.post("/login", usersController.login);
router.post(
  "/signup",
  fileUpload.single("image"),
  [
    check("name").not().isEmpty(),
    check("email").normalizeEmail().isEmail(),
    check("password").isLength({ min: 6 }),
  ],
  usersController.signup
);
router.put("/:id/follow", usersController.follow);
router.put("/:id/unfollow", usersController.unfollow);
//router.put("/unfollow", usersController.removeFollower);

module.exports = router;
