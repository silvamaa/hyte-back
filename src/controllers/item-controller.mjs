import items from '../models/item-model.mjs';

const getItems = (req, res) => {
  res.json(items);
};

const getItemByID = (req, res) => {
  // TODO: palauta vain se objekti, jonka id vastaa pyydettyä
  const itemId = parseInt(req.params.id);
  const requestedItem = items.find((item) => item.id === itemId);

  if (requestedItem) {
    res.json(requestedItem);
  } else {
    res.status(404).json({message: 'Item nowhere to be found, Nuh Uh! >:('});
  }

  // OPETTAJAN ESIMERKKI
  // console.log('requested item id', req.params.id);
  // items.find(item => {
  //   return item.id == req.params.id;
  // });
  // console.log('found item', itemFound);
  // const resJson = itemFound ? itemFound : {error: 'not found'};
  // if (itemFound) {
  //   res.json(itemFound);
  // } else {
  //   res.status(404).json({error: 'not found'});
  // }
};

const postItem = (req, res) => {
  // lisää postattu item items-taulukkoon
  console.log('postItem request body', req.body);
  // error if name property is missing
  if (!req.body.name) {
    return res.status(400).json({error: 'item name missing'});
  }
  // new id: add 1 to last id number in the items array
  const newId = items[items.length - 1].id + 1;
  const newItem = {id: newId, name: req.body.name};
  items.push(newItem);
  res.status(201).json({message: 'item created'});
};

const deleteItem = (req, res) => {
  const index = items.findIndex((item) => item.id == req.params.id);
  if (index === -1) {
    // example how to send only the status code (still valid http response)
    return res.sendStatus(404);
  }
  const deletedItems = items.splice(index, 1);
  console.log('deleteItem:', deletedItems);
  res.json({deleted_item: deletedItems[0]});
  // or successful response without any content
  // res.sendStatus(204);
};

const putItem = (req, res) => {
  // TODO: implement modify item
  const index = items.findIndex((item) => item.id == req.params.id);
  // not found
  if (index === -1) {
    return res.sendStatus(404);
  }
  // bad request
  if (!req.body.name) {
    return res.status(400).json({error: 'item name missing'});
  }
  items[index].name = req.body.name;
  res.json({updated_item: items[index]});
};

export {getItems, getItemByID, postItem, deleteItem, putItem};
