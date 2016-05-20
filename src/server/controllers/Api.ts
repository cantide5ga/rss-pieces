import * as express from 'express';
import { getArticles } from './Rss'

(() => {
    const app = express();
    
    app.get('/', (request, response) => {
        getArticles()
        .then(articles => {
            response.header("Access-Control-Allow-Origin", "*");
            response.status(200).send(articles);
        })
    });

    app.post('/', (request, response) => {
        //invalidateUrlCache();
        
        response.header("Access-Control-Allow-Origin", "*");
        response.status(204).send(null);
    })

    app.listen(3000);
    console.log(`${new Date()} server started`);
})();