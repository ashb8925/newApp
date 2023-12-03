const redis = require("redis");
const keys = require("../src/config/keys");

console.log("cache-host: " + keys.redis.host);
console.log("cache-port: " + keys.redis.port);

const client = redis.createClient(keys.redis.port, keys.redis.host, {
    // auth_pass: "SRvVgrkQMjIyl9y2k4VI4SlFpfexabtE1AzCaOzXmNM=",
    // tls: { servername: keys.redis.host }
    no_ready_check: true,
});

client.on("connect", () => {
    console.log("Client connected to redis...");
});

client.on("ready", () => {
    console.log("Client connected to redis and ready to use...");
});

client.on("error", (err) => {
    console.log(err.message);
});

client.on("end", () => {
    console.log("Client disconnected from redis");
});

const cache_links = (req, res, next) => {
    const shortid = req.params.shortid;
    try {
        client.get(shortid, async (err, data) => {
            if (err) {
                console.error(err);
                throw err;
            }

            if (data) {
                console.log("Links retrieved from Redis");
                console.log("data: ", JSON.parse(data));
                req.originalURL = JSON.parse(data).originalURL;
                req.created_at = JSON.parse(data).created_at;
                next();
            } else {
                next();
                // const url_obj = await findURL(shortid);
                // if (url_obj !== null) {
                //   client.setex(shortid, 10000, JSON.stringify(url_obj.originalURL));
                // }
            }
        });
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
};

const add_cahce_link = (shortid, originalURL) => {
    try {
        client.setex(shortid, 432000, JSON.stringify(originalURL));
    } catch (error) {
        console.error(error);
    }
};

module.exports = { cache_links, add_cahce_link };
