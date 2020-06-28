const express = require('express');
const router = express.Router();
const Note = require('../models/noteModel');

router.get('/', async (req, res) => {
    try {
        const notes = await Note.find({
            user: req.user.id,
        });
        res.json({ notes });
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

router.get('/:id/total', async (req, res) => {
    try {
        const notes = await Note.find({
            user: req.params.id,
        });
        res.json({ total: notes.length });
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

router.post('/', async (req, res) => {
    try {
        if (!req.body.note) {
            res.status(400).json({ error: 'please enter note' });
        }
        const note = new Note({
            note: req.body.note,
            user: req.user.id,
        });
        await note.save();
        res.json({
            done: true,
            note,
        });
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

router.patch('/:id/check', async (req, res) => {
    try {
        await Note.findByIdAndUpdate(req.params.id, { isCompleted: true });

        res.json({ completed: true });
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const note = req.body.note;

        if (!note) {
            res.status(400).json({ message: 'please enter note' });
        } else {
            await Note.findByIdAndUpdate(req.params.id, { note: note });
            res.json({ updated: true });
        }
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const note = await Note.findOne({
            _id: req.params.id,
            user: req.user.id,
        });

        if (note) {
            await Note.remove(note);

            res.json({ deleted: true });
        } else {
            res.status(404).json({
                message: 'note not found',
            });
        }
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

module.exports = router;
