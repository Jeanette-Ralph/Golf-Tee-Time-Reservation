const router = require("express").Router();
const { json } = require("body-parser");
const { User, Teetimes } = require("../../models");

// for authenticating the user to view their profile
const withAuth = require("../../utils/auth");

// getting login and signup page, api/users/login
router.get("/login", (req, res) => {
  res.render("login");
});

// creating user when they signup, api/users/signup
router.post("/signup", async (req, res) => {
  try {
    const userData = await User.create({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      user_name: req.body.user_name,
      username: req.body.user_name,
      email: req.body.email,
      password: req.body.password,
    });

    // adding in req.session save
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.status(200).json(userData);
    });

    console.log("in the signup post request");
  } catch (err) {
    res.status(400).json(err);
  }
});

// when they login this verifies their password and renders their profile
router.post("/login", async (req, res) => {
  try {
    const userData = await User.findOne({
      where: { user_name: req.body.user_name },
    });

    if (!userData) {
      res
        .status(400)
        .json({ message: "Incorrect username or password, please try again" });
      return;
    }

    // need to add check password to the user model
    const verifyPassword = await userData.checkPassword(req.body.password);

    if (!verifyPassword) {
      res
        .status(400)
        .json({ message: "Incorrect username or password, please try again" });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.loggedIn = true;
      req.session.email = userData.email;
      res.json({
        user: userData,
        username: userData.user_name,
        message: "You are now logged in!",
      });
    });
    console.log("-----------userData---------------");
    console.log(userData);
    // cant have two res it will kill the server!!
  } catch (err) {
    res.status(400).json(err);
  }
});

// using withAuth to only allow users access to the user profile page, user -> profile page
router.get("/", withAuth, async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ["password"] },
    });

    const user = userData.get({ plain: true });
    const timeData = await Teetimes.findAll();
    const time = timeData.map((times) => times.get({ plain: true }));
    console.log(userData);
    res.render("user", {
      ...user,
      time,
      // append this property loggedIn
      loggedIn: true,
    });
    console.log("-----------userData---------------");
    console.log(time);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/logout", async (req, res) => {
  try {
    if (req.session.loggedIn) {
      req.session.destroy(() => {
        // redirecting to homepage from logout
        console.log(loggedIn);
        res.redirect("/");
      });
    }
  } catch (err) {
    res.status(400).json(err).end();
  }
});

module.exports = router;
