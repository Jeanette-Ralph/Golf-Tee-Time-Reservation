const router = require("express").Router();
const { Teetimes, User } = require("../models");

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
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
