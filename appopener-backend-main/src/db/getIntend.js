require("dotenv").config();

const get_intend = async (tag) => {
  console.log("tag: ", tag);

  let intend_android_before, intend_android_after, intend_ios_before, intend_ios_after;

  if (tag == "Youtube") {
    intend_android_before = process.env.YT_intend_android_before;
    intend_android_after = process.env.YT_intend_android_after;
    intend_ios_before = process.env.YT_intend_ios_before;
    intend_ios_after = process.env.YT_intend_ios_after;
  } else if (tag == "Instagram") {
    intend_android_before = process.env.IG_intend_android_before;
    intend_android_after = process.env.IG_intend_android_after;
    intend_ios_before = process.env.IG_intend_ios_before;
    intend_ios_after = process.env.IG_intend_ios_after;
  }
  else if (tag == "Spotify") {
    intend_android_before = process.env.SPOTIFY_intent;
    intend_android_after = process.env.SPOTIFY_intent;
    intend_ios_before = process.env.SPOTIFY_intent;
    intend_ios_after = process.env.SPOTIFY_intent;
  }
  else if (tag == "Telegram") {
    intend_android_before = process.env.TELEGRAM_intent_android_before;
    intend_android_after = process.env.TELEGRAM_intent_android_after;
    intend_ios_before = process.env.TELEGRAM_intent_ios_before;
    intend_ios_after = process.env.TELEGRAM_intent_ios_after;
  }
  else if (tag == "Twitter") {
    intend_android_before = process.env.TWITTER_intent_android_before;
    intend_android_after = process.env.TWITTER_intent_android_after;
    intend_ios_before = process.env.TWITTER_intent_ios_before;
    intend_ios_after = process.env.TWITTER_intent_ios_after;
  }
  else if (tag == "Linkedin") {
    intend_android_before = process.env.LINKEDIN_intent_android_before;
    intend_android_after = process.env.LINKEDIN_intent_android_after;
    intend_ios_before = process.env.LINKEDIN_intent_ios_before;
    intend_ios_after = process.env.LINKEDIN_intent_ios_after;
  }
  else if (tag == "Playstore") {
    intend_android_before = process.env.PLAYSTORE_intent_android_before;
    intend_android_after = process.env.PLAYSTORE_intent_android_after;
    intend_ios_before = process.env.PLAYSTORE_intent_ios_before;
    intend_ios_after = process.env.PLAYSTORE_intent_ios_after;
  }

  return { intend_android_before, intend_android_after, intend_ios_before, intend_ios_after };
};

module.exports = { get_intend };
