const bodyParser = require('body-parser');
const { application } = require('express');
const express = require('express');
var router = express.Router();
router.use(bodyParser.urlencoded({extended: false}))
router.use(bodyParser.json())
require("dotenv").config();
const mysql = require('mysql2')
const JsonWebToken = require('jsonwebtoken');
const crypto = require('crypto');

const {hashPassword} = require('./hash');


const connection = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
});

router.get('/', (req,res) => {
    
    connection.query("select * from aloalo", (err, result) =>
    {
        if(err)
        {
            console.log(err);
            throw err;
        }
        else {
        res.send(result);
        }
    })

});
router.post('/register', async function(req, res) {
    //get data from request body
    const {
        username, 
        password,
        name, 
        age, 
        email,
        gender,
    } = req.body;
    
connection.query(
    'Select * from aloalo where username = ?',
    username,
    (err, rows) => {
        if (err) {
            return res.status(500).json({
                message : 'Internal server error',
            });
        }
        const user = rows[0];
        if (user) {
            return res.status(400).json({
                message :'Username is already taken',
            });
        }
    }
)
const {
    hashedPassword,
    salt,
} = hashPassword(password);

connection.query (
    'Insert into aloalo(username, name, salt, password, age, email, gender) values(?,?,?,?,?,?,?)',
    [username, name, salt, hashedPassword, age, email, gender], (err, rows) => {
        if (err)
        {
            return res.status(500).json({message: "Internal server error"});
        }
        return res.status(201).json({message : "register succesfully"});
    }
)
})
router.post('/login', async function(req, res, next)  {
    const username = req.headers.username;
    const password = req.headers.password;
    
    connection.query(
        'Select * from aloalo where username = ?',
        username,
        (err, rows) => {
            if (err) {
                return res.status(500).json({
                    message : 'Internal server error',
                });
            }
            const user = rows[0];
            if (user == null) {
                
                return res.status(401).json({
                    message : 'Invalid username or password',
                });
            }
            else if(user) 
            {
                const comparehashedPassword = crypto.pbkdf2Sync(
                    password,
                    user.salt,
                    1000,
                    64,
                    'sha1',
                    ).toString('hex'); 
                    if (comparehashedPassword === user.password)
                    {
                        var token = JsonWebToken.sign({
                            id : user.id,

                        }, 'mk');
                        return res.status(201).json({message : "login succesfully", token: token})                    
                    }
            }
        }
    )
}, (req, res, next) =>{

})

router.put('/update/:token/:id', (req, res, next) => {
    try {
        var token = req.params.token
        var ketqua = JsonWebToken.verify(token, 'mk');
        if (ketqua)
        {
            next();
        }
    } catch(error) {
        return res.json('Need to login')
    }
    
}, (req, res, next) => {
    var id = req.params.id;
    var token = req.params.token
    var ketqua = JsonWebToken.verify(token, 'mk');
    if (ketqua.id == id) {
        const {
            username, 
            name1, 
            age, 
            email,
            gender,
        } = req.body;
        connection.query(
            'Select * from aloalo where username = ?',
            username,
            (err, rows) => {
                if (err) {
                    return res.status(500).json({
                        message : 'Internal server error',
                    });
                }
                const user = rows[0];
                if (user) {
                    return res.status(400).json({
                        message :'Username is already taken',
                    });
                }
            }
        )
    connection.query(`update aloalo set username = ?,name = ?, age = ? ,email = ?, gender = ? where id = ?`, [username, name1, age,email, gender, id], (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).json({message :'Internal server error'});
        }
        if (result.affectedRows === 0) {
            return res.status(400).json({message:"Cant put"});
        }
        res.status(200).json({message: 'Update successfull'})
    })}
    else {
        return res.status(401).json({
            message: 'unauthorized',
            
        });
    }
})

module.exports = router;