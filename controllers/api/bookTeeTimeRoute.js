const router = require("express").Router();
const { Teetimes } = require("../../models");
const withAuth = require("../../utils/auth");
const nodemailer = require("nodemailer");
// need an util-auth if we go old ways with auth
// const withAuth = require('../../utils/auth');

// go to book rout after auth?
router.get("/", withAuth, async (req, res) => {
  try {
    const timeData = await Teetimes.findAll();
    const time = timeData.map((times) => times.get({ plain: true }));
    res.render("user", {
      time,
      loggedIn: req.session.loggedIn,
      user_id: req.session.user_id,
    });
    console.log('---------------------logged in------------------------------');
    console.log(req.session.loggedIn);
    console.log('---------------------user id------------------------------');
    console.log(req.session.user_id);
    console.log('----------------------session-----------------------------');
    console.log(req.session);
    // res.status(200).json(timeData);
  } catch (err) {
    res.status(500).json(err);
  }
});
// updates cards with individual times with a user id to associate with
router.put("/:id", async (req, res) => {
  try {
    console.log("about to req.body");
    console.log(req.body);
    // undefined value
    const objUp = {
      ...req.body,
      user_id: req.session.user_id,
      // hard code user id
      // user_id: 4,
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
// post works in insomnia-now to link to the button
router.post("/send", async (req, res) => {
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
    <img src=/public/images/Lee_Carvallo_s_Putting_Challenge.jpg/>

  `;
  // this is copy pasta from nodemailer
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: process.env.HOST, //'mail.YOURDOMAIN.com',
    port: process.env.PORTEMAIL,
    secure: true, // true for 465, false for other ports
    auth: {
      user: process.env.USER,
      pass: process.env.PASSWORD,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  let mailOptions = {
    from: '"Golf N Stuff Links" <mvpcents@gmail.com>', // sender address
    to: "jamesplasencia@gmail.com", // list of receivers
    // to: `${req.body.email}`, // list of receivers
    subject: "Congratulations on the tee time", // Subject line
    text: "Ready to play?", // plain text body
    html: output, // html body
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log("Message sent: %s", info.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

    res.render("contact", { msg: "Email has been sent" });
  });
});

module.exports = router;
