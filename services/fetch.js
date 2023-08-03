const request = require("request");

const headers = {
    'Accept': 'application/json, text/javascript, */*',
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.2 Safari/605.1.15',
    'Content-Type': 'application/json; charset=UTF-8',
    "Connection": "keep-alive",
    "Accept-language": "en-us",
};


const fetch = (url, options = {}) => {
    return new Promise((resolve, reject) => {
        const timer = setTimeout(() => { reject(new Error("Timeout")); }, 120000);
        request({ ...options, headers: { ...headers, ...options.headers }, url }, (error, response, body) => {
            clearTimeout(timer);
            if (error) {
                reject({ error: true, msg: error });
            } else if (response.statusCode !== 200 || body === '""') {
                reject({ statusCode: response.statusCode, error: true, msg: response });
            } else {
                resolve(body);
            }
        });
    });
};

module.exports = fetch;