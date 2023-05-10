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
    try{
        const mongodbUri = process.env.MONGODB_URI
        if (mongodbUri) await mongoose.connect(mongodbUri);
        console.log("app is connected to mongodb table")
    }
    catch(e){
        console.log(e);
    }
}

// initialize express app
const app = express();

// Set up a middleware to add the CORS headers
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'https://quizzer-647f9.web.app');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

//apply express middleware
app.use(cors({ credentials: true, origin: ["http://localhost:3000", "https://quizzer-647f9.web.app", "https://quizzer-647f9.firebaseapp.com"] }));
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