const express = require('express');
const app = express();
const dotenv = require('dotenv');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const jwt = require('express-jwt');
const db = require('./pkg/db/index');
const auth = require('./handlers/authHandler');
const user = require('./handlers/usersHandler');

dotenv.config({path:`${__dirname}/config.env`});

app.use(cors());
app.use(express.urlencoded({extended : true}));
app.use(express.json());
app.use(cookieParser());


app.set('view engine', 'ejs');
app.use(express.static('public'));

db.init();

app.post('/api/v1/register', auth.signup);
app.post('/api/v1/login', auth.login);

app.use(
  jwt.expressjwt({
      algorithms: ['HS256'],
      secret: process.env.JWT_SECRET,
      getToken: (req) => {
        if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
          return req.headers.authorization.split(' ')[1];
        }
        if (req.cookies.jwt) {
          return req.cookies.jwt;
        }
        return null;
      },
    })
    .unless({
      path: ['/api/v1/register', '/api/v1/login'],
    })
);

app.patch('/api/v1/uploadphoto/:id', user.uploadUserPhoto,user.update);
app.get('/api/v1/user', user.getAllUsers);
app.get('/api/v1/user/:id', user.getUserbyId);
app.delete('/api/v1/user/:id', user.deleteUser);


app.listen(process.env.PORT, (err) => {
    if(err) {
        return console.log(err.message, 'Server can not start');
    }
    console.log(`Service started successfully on port ${process.env.PORT}`);
});

