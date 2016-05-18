//https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/cordova/cordova.d.ts
interface Feed {
    name: string,
    source: string,
    link: string
}

declare interface Article {
    title: string,
    author: string,
    link: string,
    content: string,
    published: Date,
    feed: Feed
}

interface FeedRead {
    (url: string, cb: (err: Error, articles: Article[]) => void): void
}

declare module "feed-read" {
    const feed: FeedRead;    
    export = feed;
}


