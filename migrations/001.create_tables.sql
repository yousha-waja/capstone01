-- Create the user table
CREATE TABLE user (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    firstName TEXT NOT NULL,
    surname TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    phoneNumber INTEGER UNIQUE,
    username TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    userType TEXT NOT NULL CHECK (userType IN ('admin', 'attendee'))
);

-- Create the attendee table linked to the user table
CREATE TABLE attendee (
    attendeeId INTEGER PRIMARY KEY AUTOINCREMENT,
    userId INTEGER NOT NULL UNIQUE,
    username TEXT NOT NULL UNIQUE,
    FOREIGN KEY (userId) REFERENCES user (id)
);

-- Create the register table
-- Allows admin to create a register an assign attendees to it.
CREATE TABLE register (
    registerId INTEGER NOT NULL,
    registerName VARCHAR(255) NOT NULL,
    attendee INTEGER NOT NULL,
    adminName INTEGER NOT NULL,
    FOREIGN KEY (adminName) REFERENCES admin (username)
    FOREIGN KEY (attendee) REFERENCES attendee (username)
);



-- Create the admin table linked to the user table
CREATE TABLE admin (
    adminId INTEGER PRIMARY KEY AUTOINCREMENT,
    userId INTEGER NOT NULL UNIQUE,
    username TEXT NOT NULL UNIQUE,
    FOREIGN KEY (userId) REFERENCES user (id)
);

-- Create the attendance table
CREATE TABLE attendance (
    attendanceId INTEGER PRIMARY KEY AUTOINCREMENT,
    registerId INTEGER NOT NULL,
    username TEXT NOT NULL,
    attendeeId INTEGER NOT NULL,
    checkInTime TIMESTAMP NOT NULL,
    FOREIGN KEY (registerId) REFERENCES register (registerId),
    FOREIGN KEY (attendeeId) REFERENCES attendee (attendeeId),
    FOREIGN KEY (username) REFERENCES attendee (username)
);
