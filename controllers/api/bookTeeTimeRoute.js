const router = require("express").Router();
const { Teetimes, User } = require("../../models");
const withAuth = require("../../utils/auth");
const nodemailer = require("nodemailer");

router.get("/", async (req, res) => {
  try {
    const timeData = await Teetimes.findAll();
    const time = timeData.map((times) => times.get({ plain: true }));
    res.render("user", {
      time,
      loggedIn: req.session.loggedIn,
      user_id: req.session.user_id,
      loggedIn: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});
// updates cards with individual times with a user id to associate with
router.put("/:id", withAuth, async (req, res) => {
  try {
    const objUp = {
      ...req.body,
      user_id: req.session.user_id,
      loggedIn: true,
    };

    const timeData = await Teetimes.update(objUp, {
      where: { id: req.params.id },
    });
    if (!timeData) {
      res.status(400).json({ message: "can not update an invalid tee time" });
      return;
    }
    res.status(200).json(timeData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/send", async (req, res) => {
  try {
    const eUse = await User.findOne({
      where: { email: req.body.email },
    });
    const uEmail = eUse.get({ plain: true });

    if (!uEmail) {
      res.status(400).json({ message: "user email error" });
      return;
    }
    const output = `
    <p>You have booked you tee time!</p>
    <h3>Golf N' Stuff Links</h3>
    <ul>
        </ul>
        <h3>Message</h3>
        <p>Congrats on booking your tee time. Please arrive 15 min before your time.
        The parking lot is located at
        742 Evergreen Terrace
        Springfield</p>
      `;

    let transporter = nodemailer.createTransport({
      host: process.env.HOST,
      port: process.env.PORTEMAIL,
      secure: true,
      auth: {
        user: process.env.USER,
        pass: process.env.PASSWORD,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    let mailOptions = {
      from: '"Golf N Stuff Links" <mvpcents@gmail.com>',
      to: uEmail.email,
      subject: "Congratulations on the tee time",
      text: "Ready to play?",
      html: output,
      amp: `amp-img src="./public/images/Lee_Carvallo_s_Putting_Challenge.jpg"`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return console.log(error);
      }
      console.log("Message sent: %s", info.messageId);
      console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
