function validURL(str) {
  var pattern = new RegExp(
    "^(https?:\\/\\/)?" + // protocol
      "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
      "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
      "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
      "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
      "(\\#[-a-z\\d_]*)?$",
    "i"
  ); // fragment locator
  return !!pattern.test(str);
}

function validateYouTubeUrl(check_url) {
  try {
    const urlObject = new URL(check_url);
    console.log("Hostname:", urlObject.hostname);
    return urlObject.hostname.includes("youtube") || urlObject.hostname.includes("youtu.be");
  } catch (error) {
    console.log("error: ", error.message);
  }
}

function validateInstagramUrl(check_url) {
  try {
    const urlObject = new URL(check_url);
    console.log("Hostname:", urlObject.hostname);
    return urlObject.hostname.includes("instagram");
  } catch (error) {
    console.log("error: ", error.message);
  }
}

function get_Tag(url) {
  try {
    const urlObject = new URL(url);
    console.log("Hostname:", urlObject.hostname);

    if (urlObject.hostname.includes("youtube") || urlObject.hostname.includes("youtu.be")) {
      tag = "Youtube";
    } else if (urlObject.hostname.includes("instagram")) {
      tag = "Instagram";
    }else if (urlObject.hostname.includes("open.spotify.com") || urlObject.hostname.includes("spotify")) {
      tag = "Spotify";
    }
    else if (urlObject.hostname.includes("www.t.me") || urlObject.hostname.includes("telegram")) {
      tag = "Telegram";
    }else if (urlObject.hostname.includes("twitter.com") || urlObject.hostname.includes("twitter") ) {
      tag = "Twitter";
    }else if (urlObject.hostname.includes("www.linkedin.com") || urlObject.hostname.includes("linkedin") ) {
      tag = "Linkedin";
    }
    else if (urlObject.hostname.includes("play.google.com") || urlObject.hostname.includes("play.google") ) {
      tag = "Playstore";
    } else {
      tag = "Other";
    }
    return tag;
  } catch (error) {
    console.log("error: ", error.message);
  }
}

module.exports = { validURL, validateYouTubeUrl, validateInstagramUrl, get_Tag };
