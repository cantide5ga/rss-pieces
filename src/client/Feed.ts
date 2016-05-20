import * as Promise from 'bluebird';
import * as request from 'request';

let cachedArticles: Promise<Array<Article>> = null;
const requestAsync = Promise.promisify(request)({ uri: 'http://localhost:3000' });
const key = 'message_body';

//two levels of caching: 'session' (via cachedArticles var) and a broader persistant cache
export function getFeeds(): Promise<Array<Article>> {
    if(!cachedArticles) {
        const cachedMessageBody = localStorage.getItem(key);
        
        if(!cachedMessageBody) {
            cachedArticles = requestAsync
                .then(message => {
                    const messageBody = message['body'];
                    localStorage.setItem(key, messageBody);
                    return (<Array<Article>>JSON.parse(messageBody))
                })
        } else {
            cachedArticles = Promise.resolve(<Array<Article>>JSON.parse(cachedMessageBody))
        }
    }

    return cachedArticles
}

//TODO consider decoration of this var; this is a cross cutting concern
(() => {
    const ttl = 300000; // invalidates every 5 minutes
    setInterval(() => {
        cachedArticles = null;
        localStorage.removeItem(key);    
    }, ttl)
})();