import  express from 'express';
import http from 'http';  
import { serve, setup } from "swagger-ui-express";
import bodyParser from 'body-parser';
import  cookieParser from 'cookie-parser';
import  compression from 'compression';
import cors from 'cors';
import routes from '../src/routes';
import {dbConnect} from '../src/DBConnect/DBConfig';
//import {bootstrapAdmin} from './controller/admin.controller';
dbConnect();
//bootstrapAdmin();

const app=express();

app.use(cors({
    credentials:true,
}));

app.use(express.static('public'))
app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(
    "/swagger",
    serve,
    setup(undefined, {
      swaggerOptions: {
        url: "/swagger/swagger.json",
      },
    })
  );
  
app.use(bodyParser.urlencoded({extended:true}));
app.use('/api',routes)

const server=http.createServer(app);
server.listen(8090,()=>{
    console.log('server running on http://localhost:8090/')
})