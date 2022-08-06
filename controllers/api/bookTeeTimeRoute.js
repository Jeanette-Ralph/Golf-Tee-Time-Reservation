const router = require("express").Router();
const { Teetimes, User, Players } = require("../../models");
// need an util-auth if we go old ways with auth
// const withAuth = require('../../utils/auth');

router.get("/", function (req, res) {
  res.render("landingPage");
});

// router.get("/", async (req, res) => {
//   try {
//     const teeTime = await Teetimes.findAll({
//       include: [{ model: User }, { model: Players, through: User }],
//     });
//     // Serialize data so the template can read it
//     const times = teeTime.map((times) => times.get({ plain: true }));
//     // Pass serialized data and session flag into template
//     res.render("landingPage", {
//       times,
//       // render info based on session
//       // logged_in: req.session.logged_in
//     });
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// should /:id be /:time?

// first attempt
// router.put("/:id", async (req, res) => {
//   try {
//     const timeData = await Teetimes.update(req.body, {
//       where: { time: req.params.time }
//     });
//     if (!timeData) {
//       res.status(400).json({ message: "can not update an invalid tee time" });
//       return;
//     }
//     res.status(200).json(timeData);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// this def needs to worked on-attempting to update tee times- they are associted with user ids who then are associted with player ids
// is the user table the "pivot table" for times and players? mayhaps
router.put("/:id", (req, res) => {
  // update time data
  timeData
    .update(req.body, {
      where: {
        time: req.params.time,
      },
    })
    .then((user) => {
      // find all associated user from times
      return User.findAll({ where: { user_id: req.params.id } });
    })
    .then((times) => {
      // get list of current time_ids
      const timeDataIds = times.map(({ time_id }) => time_id);
      // create filtered list of new time_ids
      const newtimeDatas = req.body.time_id
        .filter((time_id) => !timeDataIds.includes(time_id))
        .map((tag_id) => {
          return {
            time_id: req.params.id,
            user_id,
          };
        });
      // figure out which ones to remove
      const timeDatasToRemove = timeDatas
        .filter(({ time_id }) => !req.body.time_id.includes(tag_id))
        .map(({ id }) => id);

      // run both actions
      return Promise.all([
        timeData.destroy({ where: { id: timeDataToRemove } }),
        timeData.bulkCreate(newtimeData),
      ]);
    })
    .then((updatedtimeData) => res.json(updatedtimeData))
    .catch((err) => {
      // console.log(err);
      res.status(400).json(err);
    });
});

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
    res.status(200).json(timeData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
// i need to
