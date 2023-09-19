import express from 'express';
import cors from 'cors';
import sqlite3 from 'sqlite3';
import * as sqlite from 'sqlite';

//database initialization
const  db = await sqlite.open({
    filename:  './attendance.db',
    driver:  sqlite3.Database
});
console.log('You are now connected to the database!');
await db.migrate(); 

//express initialization
const app = express();
app.use(express.static('public'));
app.use(express.json());
app.use(cors());
const PORT = process.env.PORT || 3011;
app.listen(PORT, () => console.log(`Taxi App started on port: ${PORT}`))

// Sign-up API
app.post("/api/addUser/", async (req,res)=>{
    const username = await db.get("select * from user where username = ?", req.body.username);
    const email = await db.get("select * from user where email = ?", req.body.email);
    const phoneNumber = await db.get("select * from user where password = ?", req.body.phoneNumber);
    if (email){
        res.json({
            error : "Email address already exist! Change your email."
        })
    }
    else if(phoneNumber){
        res.json({
            error : "Phone number already exist! Change your phone number."
        })
    }
    else if(username){
        res.json({
            error : "Username already exist! Change your username."
        })
    }
    else {
        await db.run("insert into user (firstName,surname,email,phoneNumber,username,password,userType) values (?, ?, ?,?, ?, ?, ?);", [req.body.firstName, req.body.surname, req.body.email,req.body.phoneNumber, req.body.username, req.body.password, req.body.userType]);
        if(req.body.userType=="admin"){
            const userId = await db.get("select id from user where username=?", req.body.username);
            await db.run("insert into admin (userId, username) values (?, ?);", [userId.id, req.body.username]);
        }else{
            const userId = await db.get("select id from user where username=?", req.body.username);
            console.log(userId);
            await db.run("insert into attendee (userId, username) values (?, ?);", [userId.id, req.body.username]);
        }
        res.json({
            success : "Registration successful!"
        })
    }
});

//Login
app.post("/api/login/", async (req,res)=>{
    const username = await db.get("select * from user where username = ?", req.body.username);
    const password = await db.get("select * from user where password = ?", req.body.password);
    if (username && password){
        res.json({
            success : "Login successful!"
        })
    }else if(!username){
        res.json({
            error : "User does not exist!"
        })
    }else if(!password){
        res.json({
            error : "Incorrect password!"
        })
    }
})