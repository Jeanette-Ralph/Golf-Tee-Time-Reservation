const router = require("express").Router();
const aboutRoute = require("./aboutRoute");
const bookTeeTimeRoute = require("./bookTeeTimeRoute");
<<<<<<< HEAD
<<<<<<< HEAD
// const loginRoute = require("./loginRoute");
=======

>>>>>>> 502afbfe994e4d5603a9d513b14ed1f322e92577
=======
>>>>>>> develop
const userRoute = require("./userRoute");

router.use("/about", aboutRoute);
router.use("/book", bookTeeTimeRoute);
<<<<<<< HEAD
<<<<<<< HEAD
// router.use("/login", loginRoute);
=======

>>>>>>> 502afbfe994e4d5603a9d513b14ed1f322e92577
=======
>>>>>>> develop
router.use("/user", userRoute);

module.exports = router;
