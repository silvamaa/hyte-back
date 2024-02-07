import express from 'express';
import {getUserById, getUsers, postUser, postLogin, putUser} from '../controllers/user-controller.mjs';

const userRouter = express.Router();


//user endpoints
userRouter.route('/')
// list users
.get(getUsers)
// user registration
.post(postUser);

//user:id endpoints
userRouter.route('/:id')
// get info of a user
.get(getUserById)
// update user
.put(putUser);

// user login
userRouter.post('/login', postLogin);


export default userRouter;
