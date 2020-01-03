const express = require("express");
const userCtrl = require("../controllers/user.controller");
const authCtrl = require("../controllers/auth.controller");

const router = express.Router();

router.route('/follow').post(userCtrl.addFollowing, userCtrl.addFollower);


router
  .route("/")
  .get(userCtrl.list)
  .post(userCtrl.create);
router
  .route("/:userId")
  .get(authCtrl.requireSignin, userCtrl.read)
  .put(authCtrl.requireSignin, authCtrl.hasAuthorization, userCtrl.update)
  .delete(authCtrl.requireSignin, authCtrl.hasAuthorization, userCtrl.remove);

router.route("/photo/:userId").get(userCtrl.photo, userCtrl.defaultPhoto);
router.route("/defaultphoto").get(userCtrl.defaultPhoto);
router.param("userId", userCtrl.userByID);
// authCtrl.requireSignin, userCtrl.addFollowing, userCtrl.addFollower

router
  .route("/unfollow")
  .put(
    authCtrl.requireSignin,
    userCtrl.removeFollowing,
    userCtrl.removeFollower
  );

router
  .route("/findpeople/:userId")
  .get(authCtrl.requireSignin, userCtrl.findPeople);

module.exports = router;
