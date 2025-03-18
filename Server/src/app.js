const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const port  = 4000;
const routes = require("./routes/index")
const cookieParser = require('cookie-parser');
const corsOptions = {
  origin: ['http://localhost:5173' , "http://172.20.176.1:5173/"], // Đảm bảo URL frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true, // Quan trọng: Cho phép gửi cookie
  allowedHeaders: ["Content-Type", "Authorization"]
  };
const app = express();
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions))
app.use(cookieParser());


routes(app)


app.listen(port,()=>{  
    console.log(`listening sucessful port ${port}`)
   
})