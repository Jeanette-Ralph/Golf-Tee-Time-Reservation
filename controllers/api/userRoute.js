const router = require('express').Router();
const { json } = require('body-parser');
const { User } = require('../../models');

// for authenticating the user to view their profile
const withAuth = require('../../utils/auth');

// getting login and signup page, api/users/login
// router.get('/login', (req, res) => {
//     res.render('login');
// });

// creating user, api/users/signup
router.post('/signup', async (req, res) => {
    try {
        const userData = await User.create(
            {
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                user_name: req.body.user_name,
                email: req.body.email,
                password: req.body.password,
                role: req.body.role
            })

        // redirect to the login page
        res.redirect('/login');

        return res.json(userData);

    } catch (err) {
        res.status(400).json(err);
    }
});

// finding user info and verifying it
router.post('/login', async (req, res) => {
    try {

        const userData = await User.findOne(
            {
                where:
                    { user_name: req.body.user_name }
            });

        if (!userData) {
            res.status(400).json({ message: 'Incorrect username or password, please try again' });
            return;
        }

        // need to add check password to the user model
        const verifyPassword = await userData.checkPassword(req.body.password);

        if (!verifyPassword) {
            res.status(400).json({ message: 'Incorrect username or password, please try again' });
            return;
        }


        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.loggedIn = true;

            res.json({ user: userData, message: 'You are now logged in!' });
        });

        // redirecting to the profile
        res.redirect('/profile');

    } catch (err) {
        res.status(400).json(err);
    }
});

// using withAuth to only allow users access to the profile page
router.get('/profile', withAuth, async (req, res) => {
    try {
        const userData = await User.findByPk(req.session.user_id, {
            attributes: { exclude: ['password'] },
        });

        const user = userData.get({ plain: true });

        res.render('profile', {
            ...user,
            loggedIn: true
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

// redirecting to homepage from logout 
router.post('/logout', async (req, res) => {
    try {
        if (req.session.loggedIn) {
            req.session.destroy(() => {
                res.redirect('/');
            });
        }
    } catch (err) {
        res.status(400).json(err).end();
    }
});

module.exports = router;