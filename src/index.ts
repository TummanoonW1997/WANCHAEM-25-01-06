import express, { Request } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { routes } from './routers/r_app';
import { DB } from './db';

const app = express();

//สั่งให้ express เปิดสิทธิ์ CORS
app.use(cors<Request>());

//สั่งให้ข้อมูล incoming request เป็น format json ตลอด
app.use(express.json());

//urlencode payload
app.use(express.urlencoded({ extended: true }));

//allow getting client's IP address
app.set('trust proxy', true);

//read .env file
dotenv.config();
const ENV = process.env.NODE_ENV as string;
const API = process.env.API as string;
const PORT = Number(process.env.PORT);
const NAME = process.env.NAME as string;

async function onStart(){
    try {
        console.log(`Server running on path ${API} at port ${PORT} - ENV: ${ENV} - Project: ${NAME}`);
        await DB.connectDB();
    } catch (error) {
        console.log(error);
    }
}

app.listen(PORT, onStart);

app.use(API, routes);