import express from 'express';
import dotenv from 'dotenv';
import userRoute from './routes/userRoute.js';
import linkRoute from './routes/linkRoute.js';
import errorHandler from './middlewares/errorMiddleware.js';
import connectDB from './configs/db.js';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

// resolving dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log(__dirname);

dotenv.config();
connectDB();

const app = express();
const port = process.env.PORT || 5001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use('/api/links', linkRoute);
app.use('/api/users', userRoute);
app.use(errorHandler);

// use the client app
app.use(express.static(path.join(__dirname, '../client/dist')));

//render the client for any path
app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, '../client/dist/index.html'))
);

app.listen(port, (req, res) => {
  console.log(`Server is running on port ${port}`);
});
