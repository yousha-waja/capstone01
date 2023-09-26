-- INSERT INTO user (firstName, surname, email, phoneNumber, username, password, userType)
-- VALUES
--     ('John', 'Doe', 'john.doe1@example.com', 235437, 'john_doe1', 'password123', 'attendee'),
--     ('Jane', 'Smith', 'jane.smith@example.com', 453573, 'jane_smith', 'securepwd', 'attendee'),
--     ('Mike', 'Johnson', 'mike.johnson@example.com', 5553424, 'mike_j', 'pass123', 'attendee'),
--     ('Sarah', 'Williams', 'sarah.w@example.com', 52363333, 'sarah_w', 'mypassword', 'attendee'),
--     ('David', 'Lee', 'david.lee@example.com', 5386868, 'david_lee', 'davidpass', 'attendee'),
--     ('Emily', 'Brown', 'emily.b@example.com', 82999664, 'emily_b', 'emilypwd', 'attendee'),
--     ('Michael', 'Davis', 'michael.d@example.com', 4563215698, 'michael_d', 'miked123', 'attendee'),
--     ('Linda', 'Clark', 'linda.c@example.com', 8965632565, 'linda_c', 'lindapass', 'attendee'),
--     ('Robert', 'White', 'robert.w@example.com', 544666899, 'robert_w', 'robertpwd', 'attendee'),
--     ('Sophia', 'Anderson', 'sophia.a@example.com', 556688544, 'sophia_a', 'sophiapass', 'attendee'),
--     ('William', 'Martinez', 'william.m@example.com', 56698855, 'william_m', 'williampwd', 'attendee'),
--     ('Olivia', 'Garcia', 'olivia.g@example.com', 889123654, 'olivia_g', 'oliviapass', 'attendee'),
--     ('James', 'Hernandez', 'james.h@example.com', 45632156985, 'james_h', 'jamespass', 'attendee'),
--     ('Ava', 'Lopez', 'ava.l@example.com', 8523699785, 'ava_l', 'avapwd', 'attendee'),
--     ('Ethan', 'Adams', 'ethan.a@example.com', 789654125, 'ethan_a', 'ethanpass', 'attendee');

-- INSERT INTO attendee (userId, username)
-- SELECT id AS userId, username
-- FROM user
-- WHERE userType = 'attendee';

-- Insert data into the register table
-- INSERT INTO register (registerId, registerName, attendee)
-- VALUES
--     (1, 'Register 1', 'john_doe1'),
--     (2, 'Register 2', 'jane_smith'),
--     (3, 'Register 3', 'mike_j'),
--     (4, 'Register 4', 'sarah_w'),
--     (5, 'Register 5', 'david_lee'),
--     (6, 'Register 6', 'emily_b'),
--     (7, 'Register 7', 'michael_d'),
--     (8, 'Register 8', 'linda_c'),
--     (9, 'Register 9', 'robert_w'),
--     (10, 'Register 10', 'sophia_a'),
--     (11, 'Register 11', 'john_doe1'),
--     (9, 'Register 12', 'jane_smith'),
--     (8, 'Register 13', 'mike_j'),
--     (1, 'Register 14', 'sarah_w'),
--     (2, 'Register 15', 'david_lee'),
--     (2, 'Register 16', 'emily_b'),
--     (3, 'Register 17', 'michael_d'),
--     (3, 'Register 18', 'linda_c'),
--     (3, 'Register 19', 'robert_w'),
--     (3, 'Register 20', 'sophia_a'),
--     (3, 'Register 21', 'john_doe1'),
--     (3, 'Register 22', 'jane_smith'),
--     (3, 'Register 23', 'mike_j'),
--     (3, 'Register 24', 'sarah_w'),
--     (3, 'Register 25', 'david_lee'),
--     (1, 'Register 26', 'emily_b'),
--     (1, 'Register 27', 'michael_d'),
--     (1, 'Register 28', 'linda_c'),
--     (1, 'Register 29', 'robert_w'),
--     (1, 'Register 30', 'sophia_a'),
--     (11, 'Register 31', 'john_doe1'),
--     (9, 'Register 32', 'jane_smith'),
--     (9, 'Register 33', 'mike_j'),
--     (8, 'Register 34', 'sarah_w'),
--     (8, 'Register 35', 'david_lee'),
--     (7, 'Register 36', 'emily_b');

-- Insert data into the attendance table
INSERT INTO attendance (registerId, username, attendeeId, checkInTime)
VALUES
    (3, 'john_doe1', 1, '2023-09-23 08:45:00'),
    (4, 'jane_smith', 2, '2023-09-23 09:00:00'),
    (3, 'mike_j', 3, '2023-09-23 09:15:00'),
    (4, 'sarah_w', 4, '2023-09-23 08:40:00'),
    (4, 'david_lee', 5, '2023-09-23 09:15:00'),
    (4, 'emily_b', 6, '2023-09-23 09:15:00'),
    (4, 'michael_d', 7, '2023-09-23 08:40:00'),
    (4, 'linda_c', 8, '2023-09-23 09:15:00'),
    (4, 'robert_w', 9, '2023-09-23 09:15:00'),
    (4, 'sophia_a', 10, '2023-09-23 09:15:00');

