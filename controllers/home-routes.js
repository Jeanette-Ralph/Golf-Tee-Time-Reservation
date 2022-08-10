// to fix an error
const router = require("express").Router();
const { Teetimes, User } = require('../models');

// Render the homepage because we are not logged in yet.
// Render all of the tetimes
router.get('/', async (req, res) => {
  try {
    const dbTeetimesData = await Teetimes.findAll({
    });

    const teetimes = dbTeetimesData.map((teetimes) =>
      teetimes.get({ plain: true })
    );
    res.render('home', {
      teetimes
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/user', async (req, res) => {
  res.render('landingPage');
  try {
    const userData = await User.findByPk(req.session.user_id,
      {
        attributes: { exclude: ['password'] },
      });

    const user = userData.get({ plain: true });

    res.render('landingPage', {
      ...user,
      // append this property loggedIn
      loggedIn: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
