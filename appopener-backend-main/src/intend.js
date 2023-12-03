const config = require("dotenv").config();

const validate = require("../src/validate");
const urls = require("./urls");
const getIntend = require("./db/getIntend");
const url = require("url");

const check_intend = async (mobile_os, devicetype, platform, url) => {
    //mobileos - useragent
    // platform is youtube,instagram
    let intend_done;

    //console.log("url", url);

    switch (platform) {
        case "Youtube":
            intend_done = await youtube_intend(mobile_os, devicetype, url, platform);
            break;
        case "Instagram":
            intend_done = await instagram_intend(mobile_os, devicetype, url, platform);
            break;
        case "Spotify":
            intend_done = await spotify_intent(mobile_os, devicetype, url, platform);
            break;
        case "Telegram":
            intend_done = await telegram_intent(mobile_os, devicetype, url, platform);
            break;
        case "Twitter":
            intend_done = await twitter_intent(mobile_os, devicetype, url, platform);
            break;
        case "Linkedin":
            intend_done = await linkedin_intent(mobile_os, devicetype, url, platform);
            break;
        case "Playstore":
            intend_done = await playstore_intent(mobile_os, devicetype, url, platform);
            break;
        case "Other":
            //console.log(url);
            intend_done = await Other_intend(mobile_os, devicetype, url, platform);
            break;

        default:
            break;
    }
    return intend_done;
};
// Android / iOS / Windows / other
const youtube_intend = async (mobile_os, devicetype, url, platform) => {
    let os_type;

    if (validate.validateYouTubeUrl(url) == true) {
        const intend = url.split("//");
        const pure_intend = intend[1];
        const YOUTUBE_INTENDS = await getIntend.get_intend(platform);

        if (mobile_os === "Android") {
            const app_intend = YOUTUBE_INTENDS.intend_android_before + pure_intend + YOUTUBE_INTENDS.intend_android_after;
            os_type = "android";
            return { app_intend, os_type };

        } else if (mobile_os === "iOS" || mobile_os === "ios") {
            const app_intend = YOUTUBE_INTENDS.intend_ios_before + pure_intend + YOUTUBE_INTENDS.intend_ios_after;
            os_type = "ios";
            return { app_intend, os_type };
        } else if (mobile_os === "Windows" || devicetype === "Desktop") {
            os_type = "windows";
            const app_intend = url;
            return { app_intend, os_type };
        } else {
            os_type = "windows";
            const app_intend = url;
            return { app_intend, os_type };
        }
    } else {
        os_type = "windows";
        const app_intend = url;
        return { app_intend, os_type };
    }
};

const instagram_intend = async (mobile_os, devicetype, url, platform) => {
    let os_type;

    if (validate.validateInstagramUrl(url) === true) {
        const intend = url.split("//");
        const pure_intend = intend[1];

        const Instagram_INTENDS = await getIntend.get_intend(platform);

        if (mobile_os === "Android") {
            const app_intend = Instagram_INTENDS.intend_android_before + pure_intend + Instagram_INTENDS.intend_android_after;
            os_type = "android";
            return { app_intend, os_type };
        } else if (mobile_os === "iOS" || mobile_os === "ios") {
            const more_split = pure_intend.split("/");
            const app_intend = Instagram_INTENDS.intend_ios_before + more_split[1] + Instagram_INTENDS.intend_ios_after;
            os_type = "ios";
            return { app_intend, os_type };
        } else if (mobile_os === "Windows" || devicetype === "Desktop") {
            os_type = "windows";
            const app_intend = url;
            return { app_intend, os_type };
        } else {
            os_type = "windows";
            const app_intend = url;
            return { app_intend, os_type };
        }
    } else {
        os_type = "windows";
        const app_intend = url;
        return { app_intend, os_type };
    }
};

const Other_intend = async (mobile_os, devicetype, url, platform) => {
    let os_type;
    os_type = "windows";
    const app_intend = url;   
    return { app_intend, os_type };
    // try {
    //   if (mobile_os.isDesktop || mobile_os.isWindows || mobile_os.isMac) {
    //     console.log("Desktop: " + mobile_os.isDesktop + mobile_os.isWindows + mobile_os.isMac);

    //     os_type = "windows";
    //     const app_intend = url;
    //     return { app_intend, os_type };
    //   }

    //   const intend = url.split("//");
    //   const pure_intend = intend[1];

    //   const loginskip_url = `intent://${pure_intend}/#Intent;scheme=https;end`;
    //   return loginskip_url;
    // } catch (error) {
    //   console.log(error);
    // }
};

const spotify_intent = async (mobile_os, devicetype, og_url, platform) => {
    //const intend = url.split("//");
    //const pure_intend = intend[1]; 

    var url_split = url.parse(og_url, true);
    const spotify_path = url_split.pathname;
    console.log(spotify_path);

    const Spotify_INTENDS = await getIntend.get_intend(platform);
    if (mobile_os === "Android") {
        // console.log("mobile - android");
        const app_intend = Spotify_INTENDS.intend_android_before + spotify_path;
        os_type = "android";
        return { app_intend, os_type };

    } else if (mobile_os === "iOS" || mobile_os === "ios") {
        //console.log("mobile - ios");
        const app_intend = Spotify_INTENDS.intend_ios_before + spotify_path;
        os_type = "ios";
        return { app_intend, os_type };
    }
    else if (mobile_os === "Windows" || devicetype === "Desktop") {
        //os_type = "windows";
        const app_intend = og_url;
        return { app_intend, os_type };
    }
    else {
        os_type = "windows";
        const app_intend = og_url;
        return { app_intend, os_type };
    }
};

const telegram_intent = async (mobile_os, devicetype, og_url, platform) => {
    let os_type;
    var url_split = url.parse(og_url, true);
    let telegram_path = url_split.pathname; // remove / from /s/xxxxx
    telegram_path = telegram_path.substring(1);

    console.log(telegram_path);

    const Telegram_INTENDS = await getIntend.get_intend(platform);

    if (mobile_os === "Android") {
        const app_intend = Telegram_INTENDS.intend_android_before + telegram_path + Telegram_INTENDS.intend_android_after;
        os_type = "android";
        return { app_intend, os_type };
    } else if (mobile_os === "iOS" || mobile_os === "ios") {
        const app_intend = Telegram_INTENDS.intend_ios_before + telegram_path + Telegram_INTENDS.intend_ios_after;
        os_type = "ios";
        return { app_intend, os_type };
    } else if (mobile_os === "Windows" || devicetype === "Desktop") {
        os_type = "windows";
        const app_intend = og_url;
        return { app_intend, os_type };
    } else {
        os_type = "windows";
        const app_intend = og_url;
        return { app_intend, os_type };
    }

};

const twitter_intent = async (mobile_os, devicetype, og_url, platform) => {
    let os_type;
    var url_split = url.parse(og_url, true);
    let twitter_path = url_split.pathname;

    console.log(twitter_path);

    const Twitter_INTENDS = await getIntend.get_intend(platform);

    if (mobile_os === "Android") {
        const app_intend = Twitter_INTENDS.intend_android_before + twitter_path + Twitter_INTENDS.intend_android_after;
        os_type = "android";
        return { app_intend, os_type };
    } else if (mobile_os === "iOS" || mobile_os === "ios") {
        let app_intend = "";
        if (twitter_path.includes("status")) {
            //this for ios status
            const last_idofurl = twitter_path.split("/").pop();
            twitter_path = "status?id=" + last_idofurl;
            //console.log("ios - status = " + twitter_path);
            app_intend = Twitter_INTENDS.intend_ios_before + twitter_path + Twitter_INTENDS.intend_ios_after;
        }
        else {
            twitter_path = "user?screen_name=" + twitter_path.substring(1);
            //console.log("ios - profile = " + twitter_path);
            app_intend = Twitter_INTENDS.intend_ios_before + twitter_path + Twitter_INTENDS.intend_ios_after;

        }

        os_type = "ios";
        return { app_intend, os_type };
    } else if (mobile_os === "Windows" || devicetype === "Desktop") {
        os_type = "windows";
        const app_intend = og_url;
        return { app_intend, os_type };
    } else {
        os_type = "windows";
        const app_intend = og_url;
        return { app_intend, os_type };
    }

};

const linkedin_intent = async (mobile_os, devicetype, og_url, platform) => {
    let os_type;
    var url_split = url.parse(og_url, true);
    let linkedin_path = url_split.pathname;

    console.log(linkedin_path);

    const Linkedin_INTENDS = await getIntend.get_intend(platform);

    if (mobile_os === "Android") {
        const app_intend = Linkedin_INTENDS.intend_android_before + linkedin_path + Linkedin_INTENDS.intend_android_after;
        os_type = "android";
        return { app_intend, os_type };
    } else if (mobile_os === "iOS" || mobile_os === "ios") {
        linkedin_path = linkedin_path.substring(1);
        //console.log("ios - profile = " + twitter_path);
        const app_intend = Linkedin_INTENDS.intend_ios_before + linkedin_path + Linkedin_INTENDS.intend_ios_after;
        os_type = "ios";
        return { app_intend, os_type };
    } else if (mobile_os === "Windows" || devicetype === "Desktop") {
        os_type = "windows";
        const app_intend = og_url;
        return { app_intend, os_type };
    } else {
        os_type = "windows";
        const app_intend = og_url;
        return { app_intend, os_type };
    }

};

const playstore_intent = async (mobile_os, devicetype, og_url, platform) => {
    let os_type;
    const intend = og_url.split("=");
    const pure_intend = intend[1];

    console.log(pure_intend);

    const Playstore_INTENDS = await getIntend.get_intend(platform);

    if (mobile_os === "Android") {
        const app_intend = Playstore_INTENDS.intend_android_before + pure_intend + Playstore_INTENDS.intend_android_after;
        os_type = "android";
        return { app_intend, os_type };
    } else if (mobile_os === "iOS" || mobile_os === "ios") {
        const app_intend = og_url;
        os_type = "ios";
        return { app_intend, os_type };
    } else if (mobile_os === "Windows" || devicetype === "Desktop") {
        os_type = "windows";
        const app_intend = og_url;
        return { app_intend, os_type };
    } else {
        os_type = "windows";
        const app_intend = og_url;
        return { app_intend, os_type };
    }

};



module.exports = {
    check_intend,
    youtube_intend,
    instagram_intend,
    spotify_intent,
    telegram_intent,
    twitter_intent,
    linkedin_intent,
    playstore_intent,
    Other_intend,
};
