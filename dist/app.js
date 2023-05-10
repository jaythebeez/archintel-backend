import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import multer from "multer";
import dotenv from 'dotenv';
import errorHandler from './middleware/errorHandler.middleware.js';
import indexRouter from './routes/index.routes.js';
dotenv.config();
if (process.env.NODE_ENV !== 'test') {
    // running in test environment
    try {
        const mongodbUri = process.env.MONGODB_URI;
        if (mongodbUri)
            await mongoose.connect(mongodbUri);
        console.log("app is connected to mongodb table");
    }
    catch (e) {
        console.log(e);
    }
}
// initialize express app
const app = express();
app.use(function (req, res, next) {
    res.header('Content-Type', 'application/json;charset=UTF-8');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});
app.set("trust proxy", 1);
//apply express middleware
app.use(cors({ origin: true, credentials: true }));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(multer().none());
app.use(morgan('dev'));
// add routes
app.use(indexRouter);
// add error middleware handler
app.use(errorHandler);
export default app;
//# sourceMappingURL=app.js.map