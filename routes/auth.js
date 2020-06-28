const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();
const passport = require('passport');
const keys = require('../config/keys'); 
const User = require('../models/userModel');
const Note = require('../models/noteModel');


router.get('/user', passport.authenticate('jwt', {session: false}), async (req, res) => {
    try {
        const user = await User.findOne({
            _id: req.user.id,
        });
        res.json(user);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

router.get('/users', async (req, res) => {
    console.log(req.user);
    try {
        const users = await User.find();
        const notes = await Note.find();
        const usersNotes = notes.filter(note => note.user);


        _users = users.map(user => {
            const total = usersNotes.filter(note => note.user.equals(user._id)).length;
            return {
                email: user.email,
                total: total
            };
        });
        res.json(_users);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

router.post('/login', async (req, res) => {
    const candidate = await User.findOne({email: req.body.email});
    
    if (candidate) {
        const passwordResult = bcrypt.compareSync(req.body.password, candidate.password);
        if (passwordResult) {
            const token = jwt.sign({
                email: candidate.email,
                userId: candidate._id,
            }, keys.jwt, {expiresIn: 60 * 60});
            
            res.status(200).json({
                token: `Bearer ${token}`,
            });
        } else {
            res.status(401).json({
                message: 'invalid password',
            });
        }
    } else {
        res.status(404).json({
            message: 'user not found',
        });
    }
});

router.post('/register', async (req, res) => {
    const candidate = await User.findOne({email: req.body.email});

    if (candidate) {
        res.status(409).json({
            message: 'email address already exists'
        });
    } else {
        const salt = bcrypt.genSaltSync(10);
        const password = req.body.password;
        const user = new User({
            email: req.body.email,
            password: bcrypt.hashSync(password, salt),
        });
        try {
            await user.save();
            res.json({
                created: true,
                user: user,
            });
        } catch(e) {
            res.status(500).json({error: e.message});
        }
    }
});

router.put('/password', passport.authenticate('jwt', {session: false}), async (req, res) => {
    const candidate = await User.findOne({
        _id: req.user.id
    });

    if (candidate) {
        const passwordResult = bcrypt.compareSync(req.body.password, candidate.password);
        if (passwordResult) {
            const salt = bcrypt.genSaltSync(10);
            const newPassword = req.body.newPassword;
            candidate.password = bcrypt.hashSync(newPassword, salt);

            await candidate.save();
            res.json({
                message: 'password was updated',
            });
        } else {
            res.status(401).json({
                message: 'invalid password',
            });
        }
    } else {
        res.status(404).json({
            message: 'user not found',
        });
    }
});

module.exports = router;