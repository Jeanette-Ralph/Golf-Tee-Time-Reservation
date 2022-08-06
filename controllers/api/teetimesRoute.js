const router = require('express').Router();
// use object destructuring to import our two models by name
const { Teetimes, User } = require('../../models');

// GET all Tee Times 
router.get('/', async (req, res) => {
  try {
    // find all library cards and perform a JOIN to include all associated Readers
    const teetimesData = await Teetimes.findAll({
      include: [{ model: User }],
    });
    res.status(200).json(teetimesData);
  } catch (err) {
    res.status(500).json(err);
  }
});


module.exports = router;
