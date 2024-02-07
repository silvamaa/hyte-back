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


  //TODO: use userModel (db) intead of mock data
  //TODO: implement route handlers below for users (real data)


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
    const newUser = req.body;
    if (!newUser.username || !newUser.password || !newUser.email) {
      return res.status(400).send('Missing information');
    }

    const userId = users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1;
    const userToAdd = {id: userId, ...newUser};
    users.push(userToAdd);
    res.status(201).json(userToAdd);
};

const putUser = (req, res) => {
    const userId = req.params.userId;
    const updatedUserData = req.body;
    console.log('Updating user with ID', userId, 'to:', updatedUserData);
    res.status(200).json({ message: 'User updated successfully', user: updatedUserData });
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
