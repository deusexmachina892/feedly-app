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
},async (accessToken, refreshToken, profile, done)=>{
    //console.log(accessToken);
        
            let user = await User.findOne({googleID: profile.id});
            if(user) return done(null, user);
            user = new User({googleID: profile.id})
            await user.save();

            return done(null, user);
        
}));