const identify_tag_value = (short_tag) => {
    if (short_tag === "yt" || short_tag === "youtube") {
        return "Youtube";
    } else if (short_tag === "ig" || short_tag === "instagram") {
        return "Instagram";
    }
    else if (short_tag === "sp" || short_tag === "spotify") {
        return "Spotify";
    }
    else if (short_tag === "tg" || short_tag === "telegram") {
        return "Telegram";
    }
    else if (short_tag === "tw" || short_tag === "twitter") {
        return "Twitter";
    }
    else if (short_tag === "lk" || short_tag === "linkedin") {
        return "Linkedin";
    }
    else if (short_tag === "ps" || short_tag === "playstore") {
        return "Playstore";
    } else if (short_tag === "web" || short_tag === "url") {
        return "Other";
    }
};

module.exports = { identify_tag_value }