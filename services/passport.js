const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const keys = require('../config/keys');
const mongooose = require('mongoose');

const User = mongooose.model('User');

//Serialize user
passport.serializeUser((user, done)=>{
    done(null, user._id);
});

passport.deserializeUser((id, done)=>{
    User.findById(id)
        .then((user)=> done(null, user))
        .catch((err)=> done(err, false));
});

passport.use(new GoogleStrategy({
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL: '/auth/google/callback',
    proxy: true
},(accessToken, refreshToken, profile, done)=>{
    //console.log(accessToken);
        
        User.findOne({googleID: profile.id})
            .then((existingUser)=>{
                if(existingUser){
                    //We already have a record with the given profile id
                    done(null, existingUser)
                } else {
                    new User({googleID: profile.id})
                    .save()
                    .then((user)=> done(null, user));
                }  
            }) 
        
}));