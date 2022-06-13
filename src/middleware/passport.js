// const GoogleStrategy = require("passport-google-oauth20").Strategy;
// const passport = require("passport");

// const GOOGLE_CLIENT_ID ="701299292873-bs2t2etrste45cckscck75rlg218mimc.apps.googleusercontent.com";
// const GOOGLE_CLIENT_SECRET = "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";

// passport.use(
//   new GoogleStrategy(
//     {
//       clientID: GOOGLE_CLIENT_ID,
//       clientSecret: GOOGLE_CLIENT_SECRET,
//       callbackURL: "/auth/google/callback",
//     },
//     function (accessToken, refreshToken, profile, done) {
//       done(null, profile);
//     }
//   )
// );

// passport.serializeUser((user, done) => {
//   done(null, user);
// });

// passport.deserializeUser((user, done) => {
//   done(null, user);
// });
