
const db = require("../src/config/db");

const docRef = db.collection("Base Plan");
const linkRef = db.collection("Links");
var verifier = require('google-id-token-verifier');
const clientId = "69320367329-6k1p17bfh8looe2j57nqt2ftuq5fel6p.apps.googleusercontent.com";



const get_user_dasboard = async (req,res)=>{
    
    let auth_token = req.body.authtoken;
    let verifyToken = "";
    let user_id;
  // verify token first send by client 
    verifier.verify(auth_token, clientId, function (err, tokenInfo) {
    if (!err) {
      //console.log(tokenInfo);
      user_id = tokenInfo.sub;
    } else {
      //console.log(err);
      verifyToken = "Invalid";
    }
  });

  if (verifyToken === "Invalid") {
    return res.status(401).send({ message: "Invalid Token" });
  } else {
    let user_arr = [];
    try {
        const snapshot = await linkRef
        .where("user_id", "==", user_id)
       
        .get()
        .then((snapshot) => {
            snapshot.docs.forEach((doc) => {
                user_arr.push(doc.data());
                //console.log(doc.data());
                //doc_id = doc.data().id;
                //docthat = doc.data().originalURL;
                //console.log(doc_id);
                //console.log(docthat);
            });
        });
        
    } catch (error) {
        console.log(error);
        
    }
    
  
    
   
   res.send({ user_arr });
  }
  
  
  }



module.exports = {get_user_dasboard}