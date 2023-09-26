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
app.listen(PORT, () => console.log(`Attendance App started on port: ${PORT}`))

// Sign-up API
app.post("/api/addUser/", async (req,res)=>{
    const username = await db.get("select * from user where username = ?", req.body.username);
    const email = await db.get("select * from user where email = ?", req.body.email);
    const phoneNumber = await db.get("select * from user where phoneNumber = ?", req.body.phoneNumber);
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
});

// Get all attendees
app.get("/api/getAttendees/", async (req, res) => {
    try {
        const attendees = await db.all("SELECT * FROM attendee ORDER BY attendeeId DESC");

        if (attendees.length > 0) {
            res.json({
                success: true,
                attendees: attendees,
            });
        } else {
            res.json({
                message: "No attendees found.",
            });
        }
    } catch (error) {
        res.status(500).json({
            error: "Internal Server Error",
        });
    }
});

// Submit register 
app.post("/api/submitRegister/", async (req, res) => {
    const registerName = req.body.registerName;
    const selectedAttendees = req.body.selectedAttendees;
    const storedUsername = req.body.storedUsername;
  
    const existingRegister = await db.get("SELECT * FROM register WHERE registerName = ?", registerName);
  
    if (existingRegister) {
      res.json({
        error: "Register name already exists, please change it."
      });
    }
    else if(selectedAttendees.length===0){
        res.json({
            error: "please select atleast one attendee."
          });
    } else {
  
      const highestRegistrationId = await db.get("SELECT MAX(registerId) AS maxRegisterId FROM register");
      let newRegistrationId = 1;
  
      if (highestRegistrationId && highestRegistrationId.maxRegisterId !== null) {
        newRegistrationId = highestRegistrationId.maxRegisterId + 1;
      }
  
      for (let i = 0; i < selectedAttendees.length; i++) {
        const value = selectedAttendees[i];
        await db.run("INSERT INTO register (registerId, registerName, attendee, adminName) VALUES (?, ?, ?, ?);", [newRegistrationId, registerName, value, storedUsername]);
      }
  
      res.json({
        success: "Register creation successful!"
      });
    }
  });
  
// Get list of registers
app.post("/api/getRegisters/", async (req, res) => {
    try {
      const registers = await db.all("SELECT DISTINCT registerId, registerName FROM register WHERE adminName =? ORDER BY registerId DESC;", req.body.storedUsername);
      if (registers.length > 0) {
        res.json({
          success: true,
          registers: registers,
        });
      } else {
        res.json({
          error: "No registers found.",
        });
      }
    } catch (error) {
      console.error("Error fetching registers:", error);
      res.status(500).json({
        error: "Internal server error",
      });
    }
  });
  

//Delete register
  app.post("/api/deleteRegister/" , async (req, res)=>{
    const register = await db.get("SELECT * FROM register WHERE registerId = ?;", req.body.registerId);
    if(register){
      await db.run("DELETE FROM register WHERE registerId = ? ;", req.body.registerId);
      res.json({
        success: true,
      })
    }else {
      res.json({
        error: "Register does not exist!",
      })
    }
  });

  //View entire register
  app.post("/api/viewRegister/", async (req, res) => {
    const registerId = req.body.registerId;
    
    const attendance = await db.all("SELECT * FROM attendance WHERE registerId = ? ORDER BY attendanceId DESC;", registerId);
       
    if (attendance.length > 0) {
      res.json({
        success: true,
        attendance: attendance,
      });
    } else {
      res.json({  // Use a 404 status code for "Not Found"
        error: "No attendance recorded for this register.",
      });
    }
  });
  
  //Get specifc register
  app.post("/api/viewSpecificRegister/", async (req, res) => {
    const attendeeName = req.body.attendeeName;
    const registerId = req.body.registerId;
    
    const attendance = await db.all("SELECT * FROM attendance WHERE registerId = ? AND username = ? ORDER BY attendanceId DESC;",[registerId, attendeeName]);
       
    if (attendance.length > 0) {
      res.json({
        success: true,
        attendance: attendance,
      });
    } else {
      res.json({  // Use a 404 status code for "Not Found"
        error: "No attendance recorded for this user.",
      });
    }
  });

  //view register name
  app.post("/api/viewRegisterName/", async (req, res) => {
    const registerId = req.body.registerId;
    
    const registerName = await db.get("SELECT registerName FROM register WHERE registerId = ?;", registerId);
    
    if (registerName) {
      res.json({
        success: true,
        registerName: registerName.registerName,
      });
    } else {
      res.json({  // Use a 404 status code for "Not Found"
        error: "No register with that name.",
      });
    }
  });

//Add Attendance
app.post("/api/addAttendance/", async (req, res) => {
    const { registerId, username, checkInTime } = req.body;

    // Check if both username and attendeeId exist
    const usernameRow = await db.get("SELECT * FROM attendee WHERE username=?", username);

    if (!usernameRow) {
      res.json({
        error: "Invalid username. The username does not exist.",
      });
    }else{
      await db.run('INSERT INTO attendance (registerId, username, attendeeId, checkInTime) VALUES (?, ?, ?, ?)',[registerId, username, usernameRow.attendeeId, checkInTime]);
      res.json({
        success: true,
        message: "Attendance added successfully.",
      });
    }
});


  
  