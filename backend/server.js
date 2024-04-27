import path from 'path';
import express from 'express';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
dotenv.config();
import connectDB from './config/db.js';
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import cors from 'cors';


connectDB();

const port = process.env.PORT || 5000;
const app = express();

var corsOptions = {
    origin: process.env.CORS_ORIGIN,
}
app.use(cors(corsOptions));

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// cookie parser middleware
app.use(cookieParser());

// app.get('/', (req, res) => {
//     res.send("API is running ....")
// });

app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/upload', uploadRoutes);

app.get('/api/config/paypal', (req, res) => res.send({
    clientId: process.env.PAYPAL_CLIENT_ID,
}));
app.get('/api/config/razorpay', (req, res) => res.send({
    clientId: process.env.RAZORPAY_KEY_ID,
}));

const _dirname = path.resolve();    // set to current working directory
app.use('/uploads', express.static(path.join(_dirname, 'uploads')));

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(_dirname, '/frontend/build')));

    console.log("redirecting to production build")
    app.get('*', (req, res) =>
        res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
    );
} else {
    app.get('/', (req, res) => {
        res.send('API is running.....');
    });
}

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Server running on port ${port}`));