const withAuth = (req, res, next) => {
  if (!req.session.loggedIn) {
    res.redirect("/");
    console.log("im here");
  } else {
    next();
  }
};

module.exports = withAuth;
