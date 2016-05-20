import { getFeeds } from './Feed';

(() => {
    const feedsEl = document.getElementById('feeds');
    
    getFeeds()
    .then(articles => {
        articles.forEach(article => {
            //https://github.com/substack/babel-plugin-jsx-factory
            //second jsx transpilation step after tsc 
            const articleEl = (
                <div class="article">
                    <h3>article.title</h3>
                    article.content
                    <hr />
                </div>
            );            
            
            feedsEl.appendChild(articleEl);
        });
    });
})();