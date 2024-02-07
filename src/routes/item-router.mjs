import express from "express"
import {deleteItem, getItemByID, getItems, postItem, putItem} from '../controllers/item-controller.mjs';

const itemRouter = express.Router();


//items endpoints
// GET http://127.0.0.1:3000/items
itemRouter.get('/', getItems);
// GET http://127.0.0.1:3000/items/<ID>
itemRouter.get('/:id', getItemByID);
// POST http://127.0.0.1:3000/items/ (Itemin lisäys)
itemRouter.post('/', postItem);
// PUT
itemRouter.put('/:id', putItem);
// DELETE
itemRouter.delete('/:id', deleteItem);


export default itemRouter;