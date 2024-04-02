import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import indexRouter from './routes/indexRouter'
import { errorHandler } from './middlewares/errorHandler';
import path = require('path');

dotenv.config();

const app = express();

const PORT = process.env.PORT

app.use(morgan('tiny'))

app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

app.use(bodyParser.urlencoded({ extended: false }))

app.use('/api', indexRouter)
app.use(errorHandler)

app.listen(PORT, () => {
    console.log(`The application is listening on port ${PORT}!`);
})