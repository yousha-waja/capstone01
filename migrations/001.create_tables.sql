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

-- Create the admin table linked to the user table
CREATE TABLE admin (
    adminId INTEGER PRIMARY KEY AUTOINCREMENT,
    userId INTEGER NOT NULL,
    username TEXT NOT NULL UNIQUE,
    FOREIGN KEY (userId) REFERENCES user (id)
);

-- Create the attendee table linked to the user table
CREATE TABLE attendee (
    attendeeId INTEGER PRIMARY KEY AUTOINCREMENT,
    userId INTEGER NOT NULL,
    username TEXT NOT NULL UNIQUE,
    FOREIGN KEY (userId) REFERENCES user (id)
);

-- Create the registration table linked to admin and attendee
CREATE TABLE register (
    registrationId INTEGER PRIMARY KEY AUTOINCREMENT,
    adminId INTEGER NOT NULL,
    attendeeId INTEGER NOT NULL,
    firstName VARCHAR(255) NOT NULL,
    surname VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phonenumber VARCHAR(20) NOT NULL,
    time TIMESTAMP NOT NULL,
    date DATE NOT NULL,
    FOREIGN KEY (adminId) REFERENCES admin (adminId),
    FOREIGN KEY (attendeeId) REFERENCES attendee (attendeeId)
);

