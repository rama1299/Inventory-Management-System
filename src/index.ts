import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import indexRouter from './routes/indexRouter'
import { connectDB } from './config/database';
import { errorHandler } from './middlewares/errorHandler';

const app = express();

dotenv.config();
const PORT = process.env.PORT

connectDB()

app.use(morgan('tiny'))

app.use(bodyParser.urlencoded({ extended: false }))

app.use('/api', indexRouter)
app.use(errorHandler)

app.listen(3000, () => {
    console.log('The application is listening on port 3000!');
})