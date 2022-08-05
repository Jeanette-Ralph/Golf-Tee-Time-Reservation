const router = require("express").Router();
const { teeTime } = require("../../models");
// need an util-auth if we go old ways with auth
// const withAuth = require('../../utils/auth');

router.get("/", async (req, res) => {
  res.send("<h1>Is this working?</h1>");
  //   this would "get" available tee times
});

module.exports = router;
