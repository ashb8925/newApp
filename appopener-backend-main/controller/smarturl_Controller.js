const urls = require("../src/urls");
const db = require("../src/config/db");
const linkRef = db.collection("Links");

var verifier = require('google-id-token-verifier');
var helperfn = require('../controller/helper');
const { validURL, get_Tag } = require("../src/validate");
const intend = require("../src/intend");
// const redis = require("redis");

const keys = require("../src/config/keys");
const users = require("../src/user");

// const client = redis.createClient(keys.redis.port, keys.redis.host, {
//     // auth_pass: "SRvVgrkQMjIyl9y2k4VI4SlFpfexabtE1AzCaOzXmNM=",
//     // tls: { servername: keys.redis.host }   
//      no_ready_check: true,
// });
const clientId = "69320367329-6k1p17bfh8looe2j57nqt2ftuq5fel6p.apps.googleusercontent.com";

// When any short url is clicked
const get_smarturl = async (req, res) => {
    const shortid = req.params.shortid;
    let tag = req.params.tag;

    //check the type of tag
    let tag_type = "";
    tag_type = helperfn.identify_tag_value(tag);
    if (tag_type === "") {
        return ("Tag does not exist!");
    }
    //console.log(tag_type);

    //First check that shortid is present in cache or not
    let url_obj = {};
    let cache_link = "";

    if (req.originalURL) {
        // console.log("req.originalURL: ", req.originalURL);
        url_obj.tag = tag_type;
        url_obj.originalURL = req.originalURL;
        url_obj.created_at = req.created_at;
        cache_link = "cache is true"
    } else {
        url_obj = await urls.findURL(shortid);
        if (url_obj === null) {
            return ("Link does not exist!");
        }
        cache_link = "cache is false"

        //Set to redis
        // console.log("url_obj originalURL: ", url_obj.originalURL);
        // client.setex(shortid, 432000, JSON.stringify(url_obj)); // add to cache 
    }
    // console.log("shortid: " + shortid);
    // console.log("tag: " + tag);
    //console.log("url_obj: ", url_obj);

    // console.log("Device - " + req.body.DeviceType); //Device is -  Mobile / Desktop
    // console.log("OsType -" + req.body.OsType); // OS is -  Android / iOS / Windows / other
    // console.log("BrowserType -" +req.body.BrowserType); // Browser is - 'messenger', 'facebook', 'line', 'twitter', 'wechat', 'miui', 'instagram', 'chrome', 'safari', 'ie', 'firefox'

    let mobile_os = req.body.OsType;
    let devicetype = req.body.DeviceType;

    const obj_provided = await intend.check_intend(mobile_os, devicetype, url_obj.tag, url_obj.originalURL);
    //console.log("obj_provided :", obj_provided);

    const app_intend = obj_provided.app_intend;
    const os_type = obj_provided.os_type;

    // console.log("app_intend: ", app_intend);
    // console.log("os_type: ", os_type);

    //Conditions for domain redirect
    if (tag === "youtube") {
        tag = "yt";
    } else if (tag === "instagram") {
        tag = "ig";
    }
    else if (tag === "spotify") {
        tag = "sp";
    }
    else if (tag === "telegram") {
        tag = "tg";
    } else if (tag === "twitter") {
        tag = "tw";
    }
    else if (tag === "linkedin") {
        tag = "lk";
    }
    else if (tag === "playstore") {
        tag = "ps";
    } else {
        tag = "web";
    }


    await urls.url_count_increment(shortid);
    const obj = { app_intend, os_type, originalURL: url_obj.originalURL };
    //console.log("obj:" + obj.originalURL);

    res.status(200);
    res.send({ app_intend, os_type, originalURL: url_obj.originalURL, cache_link, created_at: url_obj.created_at });
}




//Create Short URL
const create_openlink = async (req, res) => {

    console.log("here")
    //no user
    let originalURL = req.body.link;
    let tag = req.body.apptype;
    let user = "1234567890"; //userid for openlinks 
    let url_obj = {};
    const checkURL = validURL(originalURL);

    // console.log("original URL : " + originalURL);
    // console.log("tag:" + tag);
    // console.log("checkURL: " + checkURL);
    // console.dir("Req baseURL : " + req.baseUrl);

    if (!checkURL) {
        validateError = `URL is not valid`;
        return res.status(400).send("URL is invalid");
    }
    //Verify tag and url
    tag = get_Tag(originalURL);
    
    const shortid = await urls.generate_random_url();
    // console.log(shortid);
    const url = await urls.createURL(originalURL, tag, shortid, user);
    const created_at = await urls.createURL(originalURL, tag, shortid, user);

    url_obj.tag = tag;
    url_obj.originalURL = originalURL;
    url_obj.created_at = created_at

    //shortid added to cache 
    //client.setex(shortid, 432000, JSON.stringify(originalURL));
    // client.setex(shortid, 432000, JSON.stringify(url_obj));

    //res.send({ originalURL, url, tag });
    res.send({ originalURL, shortid, tag });

    //res.send(JSON.stringify(req.body));
}




//Create Short URL
const create_UserLink = async (req, res) => {
    //no user
    let originalURL = req.body.link;
    let tag = req.body.apptype;
    let tokenID = req.body.authtoken;
    let verifyToken = "";
    let user;
    let url_obj = {};
    // verify token first send by client 
    verifier.verify(tokenID, clientId, function (err, tokenInfo) {
        if (!err) {
            //console.log(tokenInfo);
            user = tokenInfo.sub;
        } else {
            //console.log(err);
            verifyToken = "Invalid";
        }
    });

    if (verifyToken === "Invalid") {
        return res.status(401).send({ message: "Invalid Token" });
    } else {
        const checkURL = validURL(originalURL);
        if (!checkURL) {
            validateError = `URL is not valid`;
            return res.status(400).send({ message: "URL is invalid" });
        }
        //Verify tag and url
        tag = get_Tag(originalURL);

        const shortid = await urls.generate_random_url();
        // console.log(shortid);
        //const url = await urls.createURL(originalURL, tag, shortid, user);
        const created_at = await urls.createURL(originalURL, tag, shortid, user);

        url_obj.tag = tag;
        url_obj.originalURL = originalURL;
        url_obj.created_at = created_at

        //shortid added to cache
        //client.setex(shortid, 432000, JSON.stringify(originalURL))
        // client.setex(shortid, 432000, JSON.stringify(url_obj))

        //res.status(200).send({ originalURL, url, tag });
        res.status(200).send({ originalURL, shortid, tag });
    }
};



const check_UserExist = async (req, res) => {

    let user_id = req.body.userid;
    let name = req.body.name;
    let email = req.body.email;

    users.findById(user_id).then((val) => {
        let check_user_exist = false;
        let message = "";
        // console.log(val);
        check_user_exist = val;
        if (check_user_exist === "yes") {
            check_user_exist = true;
            message = "User already exist";
        }
        else if (check_user_exist === "no") {
            const userObj = {
                user_id: user_id,
                thumbnail: "userpic.png",
                name: name,
                email: email,
                total_count: 0,
                tag_count: {
                    url_amz_count: 0,
                    url_it_count: 0,
                    url_other_count: 0,
                    url_yt_count: 0

                }
            }

            //send this object to fb
            const created_user = users.newUser(userObj);
            //console.log(created_user);
            check_user_exist = false;
            message = "New User created";

        }

        res.send({ check_user_exist, message });

    })

}



module.exports = { get_smarturl, create_openlink, create_UserLink, check_UserExist }