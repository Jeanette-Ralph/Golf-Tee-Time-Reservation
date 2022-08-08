const router = require("express").Router();
const { Teetimes, User, Players } = require("../../models");
// need an util-auth if we go old ways with auth
// const withAuth = require('../../utils/auth');

router.get("/", async (req, res) => {
  try {
    const timeData = await Teetimes.findAll();
    const time = timeData.map((times) => times.get({ plain: true }));
    // this gets us to the page and times?
    res.render("landingPage", { time });

    // res.status(200).json(timeData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// should /:id be /:time?

// first attempt-having trouble updating
// 	"name": "SequelizeValidationError",
// "errors": [
// 	{
// 		"message": "Validation isEmail on availability failed",
router.put("/:id", async (req, res) => {
  try {
    const timeData = await Teetimes.update(req.body, {
      where: { availability: req.params.availability },
    });
    if (!timeData) {
      res.status(400).json({ message: "can not update an invalid tee time" });
      console.log(err);
      return;
    }
    console.log(err);
    res.status(200).json("success");
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// this def needs to worked on-attempting to update tee times- they are associted with user ids who then are associted with player ids
// is the user table the "pivot table" for times and players? mayhaps

// delete time
router.delete("/:id", async (req, res) => {
  try {
    const timeData = await Teetimes.update(req.body, {
      where: { time: req.params.time },
    });
    if (!timeData) {
      res.status(400).json({ message: "can not delete an invalid tee time" });
      return;
    }
    res.status(200).json("success");
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
// i need to
