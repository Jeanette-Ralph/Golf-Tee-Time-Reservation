const router = require("express").Router();
const { Teetimes, User } = require("../models");

router.get("/", async (req, res) => {
  try {
    const dbTeetimesData = await Teetimes.findAll({});
    const teetimes = dbTeetimesData.map((teetimes) =>
      teetimes.get({ plain: true })
    );
    res.render("home", {
      teetimes,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
