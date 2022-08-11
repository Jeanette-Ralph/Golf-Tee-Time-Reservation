// to fix an error
const router = require("express").Router();
const { Teetimes, User } = require("../models");
// for authenticating the user to view their profile
// const withAuth = require("../utils/auth");
// Render the homepage because we are not logged in yet.
// Render all of the tetimes
router.get("/", async (req, res) => {
  try {
    const dbTeetimesData = await Teetimes.findAll({});

    const dbUserData = await User.findAll({});

    const teetimes = dbTeetimesData.map((teetimes) =>
      teetimes.get({ plain: true })
    );

    const user = dbUserData.map((user) => user.get({ plain: true }));

    res.render("home", {
      teetimes,
      user,
    });
    console.log(user);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// router.get("/user", withAuth, async (req, res) => {
//   res.render("user", {
//     user_id: req.session.user_id,
//     loggedIn: req.session.loggedIn,
//   });
// });

module.exports = router;
