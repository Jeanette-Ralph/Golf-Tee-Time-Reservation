const router = require("express").Router();
const aboutRoute = require("./aboutRoute");
const bookTeeTimeRoute = require("./bookTeeTimeRoute");
// const loginRoute = require("./loginRoute");
const userRoute = require("./userRoute");

router.use("/about", aboutRoute);
router.use("/book", bookTeeTimeRoute);
// router.use("/login", loginRoute);
router.use("/user", userRoute);

module.exports = router;
