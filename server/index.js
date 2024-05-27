import express from 'express';
import dotenv from 'dotenv';
import userRoute from './routes/userRoute.js';
import linkRoute from './routes/linkRoute.js';
import errorHandler from './middlewares/errorMiddleware.js';
import connectDB from './configs/db.js';
import cors from 'cors';

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

app.listen(port, (req, res) => {
  console.log(`Server is running on port ${port}`);
});
