const users = [
    {
      id: 1,
      username: "johndoe",
      password: "password1",
      email: "johndoe@example.com"
    },
    {
      id: 2,
      username: "janedoe",
      password: "password2",
      email: "janedoe@example.com"
    },
    {
      id: 3,
      username: "bobsmith",
      password: "password3",
      email: "bobsmith@example.com"
    }
  ];

  const getUsers = (req, res) => {
    res.json(users);
  };

  const getUserById = (req, res) => {
    const userId = parseInt(req.params.id);
    const user = users.find(user => user.id === userId);
    if (!user) {
      return res.status(404).send("User not found");
    }
    res.json(user);
  };






  const postUser = (req, res) => {
    console.log('postUser request body', req.body);
    const { username, password, email } = req.body;
    if (!username || !password || !email) {
      return res.status(400).json({ error: 'username, password, or email missing' });
    }
    const newUser = {
      id: users.length + 1,
      username,
      password,
      email
    };
    users.push(newUser);
    res.status(201).json({ message: 'user created', user: newUser });
  };

  const putUser = (req, res) => {
    const userId = parseInt(req.params.id);
    const { username, password, email } = req.body;
    const userIndex = users.findIndex(user => user.id === userId);
    if (userIndex === -1) {
      return res.status(404).json({ error: "User not found" });
    }
    if (!username && !password && !email) {
      return res.status(400).json({ error: "No fields provided for update" });
    }
    if (username) {
      users[userIndex].username = username;
    }
    if (password) {
      users[userIndex].password = password;
    }
    if (email) {
      users[userIndex].email = email;
    }
    res.json({ message: 'User updated successfully', user: users[userIndex] });
  };






  // Dummy login, returns user object if username & password match
const postLogin = (req, res) => {
  const userCreds = req.body;
  if (!userCreds.username || !userCreds.password) {
    return res.sendStatus(400);
  }
  const userFound = users.find(user => user.username == userCreds.username);
  // user not found
  if (!userFound) {
    return res.status(403).json({error: 'username/password invalid'});
  }
  // check if posted password matches to user found password
  if (userFound.password === userCreds.password) {
    res.json({message: 'logged in successfully', user: userFound});
  } else {
    return res.status(403).json({error: 'username/password invalid'});
  }
};


  export {getUsers, getUserById, postUser, putUser, postLogin};
