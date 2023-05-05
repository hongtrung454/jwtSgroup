const express = require('express');
const app = express();
const jsonwebtoken = require('jsonwebtoken');
const mysql2 = require('mysql2');
const port = 3000;
var authRouter = require('./auth');

var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

const { json } = require('body-parser');
const { urlencoded } = require('express');

// const dbs = [
//     {
//     username: 'Trung',
//     age : 24,
//     email :'aloalo@gmail.com',
//     id : 1,
//     password: '123',
//     balance : 5000
//     },
//     {
//     username: 'alo',
//     age : 25,
//     email :'aloaloaaaaaaa@gmail.com',
//     id : 2,
//     password: '123456',
//     balance : 50000000
//     }
// ]
// const SECRET = 'Trung-Nguyen';
// app.get('/', (req, res) => {
//     res.send('alo World!')
//   })
// app.use(express.json());
// app.post('/login', (req, res, next) =>
// {
//     const username = req.body.username;
//     const password = req.body.password;
//     console.log("ko");
//     const user = dbs.find(function(u){
//         return u.username === username
       
//         // case 1 : user not exist
      
//     }) 
//      if (!user) {
//         return res.status(400).json({
//             message: 'User not found',
//         });
//     }
//     if (user.password === password) {
//         // sign a jwt
//         const jwt = jsonwebtoken.sign({
//             username : user.username,
//             email : user.email.replace,
//             age: user.age,

//         }, SECRET, {
//             algorithm: 'HS256',
//             expiresIn: '3d',
//         });
//         //return jswt to user
//         return res.status(200).json({
//             date: jwt,
//             message: 'Login successful',

//         });
        
//     }
//     return res.status(401).json({
//         message : 'Invalid credentials'
//     })
// });

// app.get('/balance', (req, res, next) => {
//     // get username
//     const username = req.query.username;
//     // get token
//     const authorizationHeader = req.headers.authorization;
//     // authoriztionHeader = 'Bearer <TOKEN>'
//     // => token : authoriztionHeader.substring(7);
//     const userToken = authorizationHeader.substring(7);
//     //verify
//     try {
//         const isTokenValid = jsonwebtoken.verify(userToken, SECRET);
//         // authorization success
//         if (isTokenValid.username == username) {
//             const user = dbs.find(u => u.username === username);
//             return res.status(200).json({
//                 balance : user.balance,
//             });
//         }
//         return res.status(401).json({
//             message: 'unauthorized',
//         });
//     } catch (error) {
//         return res.status(401).json({
//             message : error.message,
//         });
//     }
// })  

//app.post('/auth/register', async (req, res, next) => {} );
app.use('/auth', authRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

// const crypto = require('crypto');
// const plainPassword = 'trung111';
// function hasWithSalt(input) {
//     //generate random salt
//     const salt = crypto.randomBytes(16).toString('hex');
//     // hash with salt w've just generated
//     const hashedPassword = crypto
//     .pbkdf2Sync(input, salt, 1000, 64, 'sha512')
//     .toString('hex');
//     return hashedPassword;
// }
// const iterations = 10;
// for (let i = 1; i < iterations; i++) 
// {
//     hasWithSalt("");
// }
// for (let i = 1; i< 100; ++i) {
//     const hashed = hasWithSalt(plainPassword);
//    // console.log( {plainPassword, hashed});
// }

// function reverseString(string) {
//     let splitString = string.split('');
//     splitString = splitString.reverse();
//     return splitString.join('');
// }
// function encrypt (input ) {
//     const inputWithPadding = input + SECRET;
//     const reversedStirng = reverseString(inputWithPadding);
//     return reversedStirng;
// }
// const plainText = 'trung';
// const ciphertext = encrypt(plainText);
// // console.log({plainText, ciphertext});

// function decrypt (ciphertext) {
//     //reverse string
//     const aareverseString = reverseString(ciphertext);
//     const plainText = aareverseString
//     .substring(aareverseString.length - SECRET.length);
//     return plainText;
// }
// const decryptText = decrypt(ciphertext);
// console.log(decryptText, ciphertext);