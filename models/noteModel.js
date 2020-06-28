const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Note = mongoose.model('Note', { 
    note: {
        type: String,
        required: true
    },
    isCompleted: {
        type: Boolean,
        default: false
    },
    user: {
        ref: 'users',
        type: Schema.Types.ObjectId,
    }
});

module.exports = Note;
