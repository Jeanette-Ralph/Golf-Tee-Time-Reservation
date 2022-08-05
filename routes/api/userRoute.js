const router = require('express').Router();
const { User } = require('../../models/user');

// getting login and signup page
router.get('/login', (req, res) => {
    res.render('login');
});

// creating user 
router.post('/signup', async (req, res) => {
    try {
        const userData = await User.create(
            {
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                user_name: req.body.user_name,
                email: req.body.email,
                password: req.body.password
            })
        return userData;
    } catch (err) {
        res.status(400).json(err);
    }
});

// finding user info anad verifying it
router.post('/login', async (req, res) => {
    try {
        const userData = await User.findOne(
            {
                where:
                    { user_name: req.body.user_name }
            });

        if (!userData) {
            res
                .status(400)
                .json({ message: 'Incorrect username or password, please try again' });
            return;
        }

        // need to add check password to the user model
        const verifyPassword = await userData.checkPassword(req.body.password);

        if (!verifyPassword) {
            res
                .status(400)
                .json({ message: 'Incorrect username or password, please try again' });
            return;
        }

        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;

            res.json({ user: userData, message: 'You are now logged in!' });
        });

    } catch (err) {
        res.status(400).json(err);
    }
});

// redirecting to homepage from logout 
router.post('/logout', async (req, res) => {
    try {
        if (req.session.logged_in) {
            req.session.destroy(() => {
                res.redirect('/');
            });
        }
    } catch (err) {
        res.status(400).json(err).end();
    }
});

module.exports = router;