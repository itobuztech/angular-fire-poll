var admin = require('firebase-admin');

var serviceAccount = require('./sdk.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://firepoll-4a70f.firebaseio.com"
});

const uid = 'qG94ufcYIHW9OTzYsz1SdkSAtSW2';
// admin.auth().getUser(uid)
//   .then(function(userRecord) {
//     // See the UserRecord reference doc for the contents of userRecord.
//     console.log("Successfully fetched user data:", userRecord.toJSON());
//   })
//   .catch(function(error) {
//     console.log("Error fetching user data:", error);
//   });

  // admin.auth().setCustomUserClaims(uid, {admin: false}).then(() => {
  //   // The new custom claims will propagate to the user's ID token the
  //   // next time a new one is issued.
  //   });

  admin.auth().getUser(uid).then((userRecord) => {
    // The claims can be accessed on the user record.
    console.log(userRecord.customClaims.admin);
  });