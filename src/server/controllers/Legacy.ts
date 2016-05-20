import * as express from 'express';
import { getArticles } from './Rss'

//renders view on backend for older browsers w/ limited or no javascript support; makes it work on the 3DS
(() => {
    const app = express();
    app.set('views', `${__dirname}/server/views`)
    app.set('view engine', 'jade');
    app.use(express.static(`${__dirname}/favicon.ico`));
    app.use('/css', express.static(`${__dirname}/css`));
    
    app.get('/legacy', (request, response) => {
        getArticles()
        .then(articles => {
            response.render('index',
                { 
                    title: 'RSS Pieces', 
                    articles: articles 
                }
            )
        });
    });
    
    app.listen(3100);
})();