const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const keys = require("./keys");

const User = require("../user");

//console.log(User);

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    //   User.findById(id).then((user) => {
    //     done(null, user);
    //   });

    const user = await User.findById(id);
    done(null, user);
});

passport.use(
    new GoogleStrategy(
        {
            // options for google strategy
            clientID: keys.google.clientID,
            clientSecret: keys.google.clientSecret,
            callbackURL: "/auth/google/redirect",
        },
        async (accessToken, refreshToken, profile, done) => {
            // check if user already exists in our own db
            //   User.findOne({ googleId: profile.id }).then((currentUser) => {
            //     if (currentUser) {
            //       // already have this user
            //       console.log("user is: ", currentUser);
            //       done(null, currentUser);
            //     } else {
            //       // if not, create user in our db
            //       new User({
            //         googleId: profile.id,
            //         username: profile.displayName,
            //         thumbnail: profile._json.image.url,
            //       })
            //         .save()
            //         .then((newUser) => {
            //           console.log("created new user: ", newUser);
            //           done(null, newUser);
            //         });
            //     }
            //   });

            const currentUser = await User.findOne({ googleId: profile.id });

            if (currentUser) {
                // already have this user
                console.log("currentUser: ", currentUser);
                done(null, currentUser);
            } else {
                // if not, create user in our db

                const userobj = { user_id: profile.id, name: profile.displayName, email: profile._json.email, thumbnail: profile._json.picture, token: accessToken };
                const newUser = await User.newUser(userobj);
                console.log("newUser: ", newUser);
                done(null, newUser);
            }
        }
    )
);
