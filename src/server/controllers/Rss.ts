import * as Promise from 'bluebird';
import * as feedRead from 'feed-read';

const feed = Promise.promisify(feedRead);
let cachedArticles: Promise<Article[]> = null;
// TODO urls?
let cachedUrl: string = null;

export function getArticles(): Promise<Article[]> {
    if(!cachedArticles) {
        console.log('RSS articles not cached; fetching...');
        
        const url = getUrl();
        cachedArticles = feed(url)
    } else {
        console.log('Returning cached RSS articles.');
    }
    return cachedArticles;
}

function getUrl(): string {
    if(!cachedUrl) {
        console.log('RSS URL not cached; fetching...');
        cachedUrl = 'https://www.reddit.com/r/programming/.rss';
    }
    return cachedUrl;
}

(() => {
    const ttl = 3600000; // invalidates every hour
    setInterval(() => {
        invalidateArticlesCache();    
    }, ttl)
})();

function invalidateArticlesCache(): void {
    console.log('Invalidating RSS articles cache...');
    cachedArticles = null;
};

function invalidateUrlCache(): void {
    console.log('Invalidating RSS url cache...');
    cachedUrl = null;
};