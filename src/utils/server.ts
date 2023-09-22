import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import { errorHandler, notFoundHandler } from '../middlewares/errorHandlers';
import rateLimitErrorHandler from '../middlewares/rateLimiterError';
import accountRoutes from '../routes/accountRoute'
import productRoutes from '../routes/productRoutes'
import cartRoutes from '../routes/cartRoutes'
function createServer() {
    const app = express();

    app.use(bodyParser.urlencoded({ extended: true }));

    // use middlewares
    app.use(cors());
    app.use(morgan('tiny'));
    app.use(bodyParser.json());

    //Home page
    app.get('/', (req, res) => {
        res.send('Welcome to Mock-Premier-League-Api”!');
    });


    // use routes
    app.use('/account', accountRoutes);
    app.use('/product', productRoutes);
    app.use('/cart', productRoutes);


    // handle 404 errors
    app.use(notFoundHandler);

    // handle errors
    app.use(errorHandler);

    // Add the rate limit error handler middleware
    app.use(rateLimitErrorHandler);


    return app;
}

export default createServer;