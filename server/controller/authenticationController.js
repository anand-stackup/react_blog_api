const fs = require("fs");
const { v4: uuidv4 } = require("uuid");
const userDataFile = "user.json";
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const secretKey = "1234";

// Function to read user data from JSON file
function readUserData() {
  try {
    const data = fs.readFileSync(userDataFile, "utf8");
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}

// Function to write blog data to JSON file
function writeUserData(users) {
  const data = JSON.stringify(users, null, 2);
  fs.writeFileSync(userDataFile, data);
}

// Signup new user data
exports.signup = async (req, res) => {
  const users = readUserData();
  const newUser = req.body;
  console.log(newUser);

  // check if user already exist
  const existingUser = users.find((user) => user.email === newUser.email);
  if (existingUser) {
    res.json("user already exist");
  } else {
    // hashing password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(newUser.password, saltRounds);

    newUser.password = hashedPassword;

    newUser.id = uuidv4();
    users.push(newUser);
    writeUserData(users);

    res
      .status(201)
      .json({ message: "User created successfully", data: newUser });
  }
};

// Login existing user
exports.login = async (req, res) => {
  const users = readUserData();
  const newUser = req.body;

  // check if user exist
  const check = users.find((user) => user.email === newUser.email);
  if (!check) {
    res.json("user not found");
  } else {
    const isPasswordMatch = await bcrypt.compare(
      newUser.password,
      check.password
    );

    if (isPasswordMatch) {
      // Generate JWT
      const token = jwt.sign(
        { userId: check.id, username: check.email },
        secretKey,
        { expiresIn: "1h" }
      );

      // console.log("new token", token);

      res.status(201).json({ token });
    } else {
      res.json("wrong password");
    }
  }
};
