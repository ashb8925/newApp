const db = require("../src/config/db");

const docRef = db.collection("Base Plan");
const linkRef = db.collection("Links");

// function newUser(userid, user_email, user_name) {
//   console.log(userid);

//   docRef
//     .doc(userid)
//     .set({ exist: true, email: user_email, name: user_name, user_id: userid })
//     .then(() => {
//       console.log("Document successfully written!");
//     })
//     .catch((error) => {
//       console.error("Error writing document: ", error);
//     });
//   return userid;
// }

const newUser = async (userobj) => {
    console.log("user: ", userobj);
    await docRef.doc(userobj.user_id).set(userobj, { merge: true });

    return {
        id: userobj.user_id,
        thumbnail: userobj.thumbnail,
        name: userobj.name,
        user_id: userobj.user_id,
        token: userobj.token,
    };
};

const findById = async (id) => {
    const snapshot = await docRef.doc(id).get();
    const user_data = snapshot.data(); // return for all userdata set
    let user_exist = "";
    if(user_data){
        user_exist = "yes";
    }
    else{
        user_exist = "no";

    }
    return user_exist;
};

const findOne = async (googleObj) => {
    const userid = googleObj.googleId;
    await docRef
        .doc(userid)
        .get()
        .then((doc) => {
            if (doc.exists) {
                console.log("Document data:", doc.data());
                return doc.data();
            } else {
                return null;
            }
        })
        .catch((error) => {
            console.log("Error getting document:", error);
        });
};

const findUser = async (userid) => {
    // const snapshot = await docRef.doc(userid).get();
    // const user_data = snapshot.data();
    let user_data;

    await docRef
        .doc(userid)
        .get()
        .then((doc) => {
            if (doc.exists) {
                console.log("Document data:", doc.data());
                user_data = doc.data();
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        })
        .catch((error) => {
            console.log("Error getting document:", error);
        });

    console.log(user_data);
    return user_data;
};

const updateUserExist = async (userid) => {
    await docRef
        .doc(userid)
        .update({ exist: true })
        .then(() => {
            console.log("User exists");
        })
        .catch((error) => {
            console.error("Error user existing: ", error);
        });
    return true;
};

async function logout_user_exist(userid) {
    let isexist;
    await docRef
        .doc(userid)
        .update({ exist: false })
        .then(() => {
            console.log("Logout Successfully");
            isexist = true;
        })
        .catch((error) => {
            console.error("Error logout: ", error);
            isexist = false;
        });
    return isexist;
}

async function getUserDashboard(user_id) {
    console.log(user_id);
    let user_arr = [];
    const snapshot = await linkRef
        .where("user_id", "==", user_id)
        .get()
        .then((snapshot) => {
            snapshot.docs.forEach((doc) => {
                user_arr.push(doc.data());
                //doc_id = doc.data().id;
                //docthat = doc.data().originalURL;
            });
        })
        .catch((err) => {
            console.log(err);
        });

    return user_arr;
}

module.exports = { newUser, findById, findOne, findUser, updateUserExist, getUserDashboard, logout_user_exist };
