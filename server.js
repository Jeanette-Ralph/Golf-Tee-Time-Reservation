const path = require("path");
const express = require("express");
const session = require("express-session");
const hbs = require("express-handlebars");
// Initializes Sequelize with session store
const SequelizeStore = require("connect-session-sequelize")(session.Store);
const routes = require("./controllers");
const sequelize = require("./config/connection");
const nodemailer = require("nodemailer");
const app = express();
const PORT = process.env.PORT || 3001;

// Sets up session and connect to our Sequelize db
const sess = {
  // Very Secret Salt
  secret: "Super Ambitious Project",
  // Express session will use cookies by default, but we can specify options for those cookies by adding a cookies property to our session options.
  cookie: {
    // maxAge sets the maximum age for the session to be active. Listed in milliseconds. here it is 1 day
    maxAge: 86400,
    // httpOnly tells express-session to only store session cookies when the protocol being used to connect to the server is HTTP.
    httpOnly: true,
    // secure tells express-session to only initialize session cookies when the protocol being used is HTTPS. Having this set to true, and running a server without encryption will result in the cookies not showing up in your developer console.
    secure: false,
    // sameSite tells express-session to only initialize session cookies when the referrer provided by the client matches the domain out server is hosted from.
    sameSite: "strict",
  },
  resave: false,
  saveUninitialized: true,
  // Sets up session store
  store: new SequelizeStore({
    db: sequelize,
  }),
};

app.use(session(sess));

app.set("view engine", "hbs");
app.engine(
  "hbs",
  hbs.engine({
    extname: "hbs",
    default_layout: "main",
    layoutsDir: __dirname + "/views/layouts",
  })
);
app.set("view engine", "hbs");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(routes);

// think I have to link the js button to here to then send the email or perhaps it is in the hbs

{
  /* <li>Name: ${req.body.name}</li>
<li>Company: ${req.body.tee_tim}</li>
<li>Email: ${req.body.email}</li> */
}
app.post("/post", (req, res) => {
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

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () =>
    console.log(
      `\nServer running on port ${PORT}. Visit http://localhost:${PORT} and test creating a Golf Account!`
    )
  );
});
