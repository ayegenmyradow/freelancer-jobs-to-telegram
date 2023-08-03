const express = require('express');
const app = express();
const _fetch = require("./services/fetch")

require('dotenv').config()

const { PORT, FREELANCE_API, TELEGRAM_CHAT_ID, TELEGRAM_API } = process.env;

// Configurations
app.use(express.json());
app.use(express.urlencoded());
// Endpoints
app.get('/', async (req, res) => {
    try {
        let resp = await _fetch(FREELANCE_API)
        resp = JSON.parse(resp);

        resp.result.projects.forEach(async element => {
            const fl_host = "https://www.freelancer.com/projects/"
            const url = new URL(TELEGRAM_API);
            url.searchParams.append("chat_id", TELEGRAM_CHAT_ID);
            url.searchParams.append("text", fl_host + element.seo_url);
            try {
                await _fetch(url.toString());
                console.log(fl_host + element.seo_url)
            } catch (err) {
                console.log(err);
            }
        });
        res.send("SUCCESS");
    } catch (err) {
        console.log(err);
        res.status(500).send("Something went wrong");
    }
});

// Listening
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});
