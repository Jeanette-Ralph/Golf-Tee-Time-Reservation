const router = require("express").Router();
const { Teetimes, User, Players } = require("../../models");
// need an util-auth if we go old ways with auth
// const withAuth = require('../../utils/auth');

// go to book rout after auth?
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
// updates cards with indqviual times with a user id to associate with
router.put("/:id", async (req, res) => {
  try {
    // undefined value
    const objUp = {
      ...req.body,
      // user_id: req.session.user_id,
      // hard code user id
      user_id: 2,
    };
    console.log(objUp);
    const timeData = await Teetimes.update(objUp, {
      where: { id: req.params.id },
    });
    if (!timeData) {
      console.log("great");
      res.status(400).json({ message: "can not update an invalid tee time" });
      return;
    }
    res.status(200).json(timeData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// logged in users booked teetimes

module.exports = router;
