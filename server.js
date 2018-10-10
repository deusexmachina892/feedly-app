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

if(process.env.NODE_ENV === 'production'){
    //Express will serve up the production assets
    //Like our main.js file, or main.css file
    app.use(express.static('client/build'));

    //Express will serve up the index.html file
    //if it does not recognize the route
    const path = require('path');
    app.get('*', (req, res)=>{
        res.sendFile(path.resolve(__dirname,'client','build','index.html'));
    })
}

const port = 5000;
app.listen(port, ()=>{
    console.log(`Server running on ${port}`);
});