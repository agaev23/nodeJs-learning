const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const app = express();
const noteRouter = require('./routes/note');
const authRouter = require('./routes/auth');


const port = process.env.port || 8080;

mongoose.connect('mongodb://localhost:27017/notes', {useNewUrlParser: true, useUnifiedTopology: true});

app.use(express.json());
app.use(passport.initialize());
require('./middleware/passport')(passport);
app.use(require('morgan')('dev'));
app.use(require('cors')());
app.use('/api/auth', authRouter);
app.use('/api/note', passport.authenticate('jwt', {session: false}), noteRouter);

app.listen(port, () => console.log(`Server has been started on ${port}`));