const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require( 'cookie-parser' );

const { createProxyMiddleware } = require('http-proxy-middleware');
const cors = require('cors');
const expressValidator = require('express-validator');
require('dotenv').config();
// import routes
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const categoryRoutes = require('./routes/category');
const productRoutes = require('./routes/product');
const braintreeRoutes = require('./routes/braintree');
const orderRoutes = require('./routes/order');
const path = require( 'path' );
// app
const app = express();

// db
mongoose
    .connect(process.env.MONGODB_URI || "mongodb+srv://salman:eDC6I6yHY6YUEehu@alphadnd.itop5.mongodb.net/<dbname>?retryWrites=true&w=majority",  {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('DB Connected'));

// middlewares
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressValidator());
app.use( cors() );



// routes middleware
app.use('/api', authRoutes);
app.use('/api', userRoutes);
app.use('/api', categoryRoutes);
app.use('/api', productRoutes);
app.use('/api', braintreeRoutes);
app.use( '/api', orderRoutes );

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
  
    const path = require('path');
    app.get('*', (req,res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
  
  }

// if ( process.env.NODE_ENV === 'production' )
// {
//     app.use( express.static( 'client/build' ) );

//     app.get( '*', ( req, res ) =>
//     {
//         res.sendFile(path.resolve(__dirname+'/client/public/index.html'));
//     })
// }

if(process.env.NODE_ENV=="production"){
  app.use(express.static('client/build'))
  const path = require('path')
  app.get("*",(req,res)=>{
      res.sendFile(path.resolve(__dirname,'client','build','index.html'))
  })
}


const port = process.env.PORT || 8000;


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});