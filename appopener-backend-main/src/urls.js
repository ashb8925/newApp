const db = require("../src/config/db");

const admin = require("firebase-admin");
const { customAlphabet } = require("nanoid/async");
const { numbers, lowercase } = require("nanoid-dictionary");

const linkRef = db.collection("Links");
const docRef = db.collection("Base Plan");


async function findURL(shortid) {
  
   const urlRef = linkRef.doc(shortid);
    const doc = await urlRef.get();
    if (!doc.exists) {
      console.log("No such document!");
      return null;
    } else {
      console.log("Document data:", doc.data());
      return doc.data();
    }
    
  
    //return { docthat, doc_tag, doc_id };
  }


  const generate_random_url = async () => {
    let checkurl;
    // console.log(lowercase + numbers);
    const nanoid = customAlphabet(lowercase + numbers, 9);
    const id = await nanoid();
  
    const userDocRef = linkRef.doc(id);
    const doc = await userDocRef.get();
    if (!doc.exists) {
      console.log("No such document exista!");
      checkurl = false;
    } else {
      console.log("Document data:", doc.data());
  
      checkurl = true;
    }
  
    if (checkurl == true) {
      generate_random_url();
    }
  
    return id;
  };


async function createURL(originalURL, tag, shortid, user) {
  const click_count = 0;
  const created_at = Date.now();
  const user_id = user;
  await linkRef.doc(shortid).set({ originalURL, id: shortid, click_count, user_id, created_at, tag });

  const url_count = admin.firestore.FieldValue.increment(1);

  let url_tag_category = {};

  if (tag === "Youtube") {
    url_tag_category.url_yt_count = admin.firestore.FieldValue.increment(1);
  } else if (tag === "Instagram") {
    url_tag_category.url_it_count = admin.firestore.FieldValue.increment(1);
  } else {
    url_tag_category.url_other_count = admin.firestore.FieldValue.increment(1);
  }

  try {
    await docRef.doc(user_id).set(
      {
        total_count: url_count,
        tag_count: url_tag_category,
      },
      { merge: true }
    );
  } catch (err) {
    console.log(err);
  }

    return created_at;
}

const url_count_increment = async (short_url) => {
  try {
    await linkRef.doc(short_url).update({
      click_count: admin.firestore.FieldValue.increment(1),
    });
  } catch (err) {
    console.log(err);
  }
};


  module.exports = {
    findURL,generate_random_url,createURL,url_count_increment
    
  };