const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
require('./models/user');
const passportConfig = require('./services/passport');
const keys = require('./config/keys');

const app = express();

//middlewares
app.use(
    cookieSession({
        maxAge: 30*24*60*60*1000,
        keys: [keys.cookieKey]
    })
);
app.use(passport.initialize());
app.use(passport.session());

mongoose.connect(keys.mongoURI, {useNewUrlParser: true})
    .then(()=>{
        console.log('Connected to db');
    })
    .catch((err)=>{
        console.warn(err.message);
    })

require('./routes/auth')(app);

const port = process.env.PORT || 3000;
app.listen(port, ()=>{
    console.log(`Server running on ${port}`);
});