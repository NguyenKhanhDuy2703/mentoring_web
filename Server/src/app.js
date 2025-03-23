const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const port  = 4000;
const routes = require("./routes/index")
const cookieParser = require('cookie-parser');
const {Server} = require("socket.io")
const http = require("http")
const serviceSocket  = require("../src/services/socketQuestion")
const corsOptions = {
  origin: ['http://localhost:5173' , "http://172.20.176.1:5173/"], // Đảm bảo URL frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true, // Quan trọng: Cho phép gửi cookie
  allowedHeaders: ["Content-Type", "Authorization"]
  };
const app = express();
app.use(morgan('dev'));
app.use(express.json({limit:'10mb'}));
app.use(express.urlencoded({limit:"10mb", extended: true }));
app.use(cors(corsOptions))
app.use(cookieParser());
// config wedsoket 
// create http server 
const server = http.createServer(app)
const io = new Server(server,{
  cors: {
    origin: corsOptions
  }
})
app.locals.io = io // găn thanh local để sử dụng trong các file khác
routes(app)
serviceSocket(io);

server.listen(port,()=>{  
    console.log(`listening sucessful port ${port}`)
   
})