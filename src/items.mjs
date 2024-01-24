// mock data for simple API
const items = [
    {id: 1, name: 'Yksi aurinko (Item 1'},
    {id: 2, name: 'Kaksi ihmistä (Item 2)'},
    {id: 3, name: 'Kolme koiraa (Item 3)'},
    {id: 4, name: 'Neljä rengasta (Item 4)'},
    {id: 5, name: 'Viisi tuolia (Item 5)'},
  ];

const getItems = (req, res) => {
    res.json(items);
  };

const getItemByID = (req, res) => {
    // TODO: palauta vain se objekti, jonka id vastaa pyydettyä
    const itemId = parseInt(req.params.id);
    const requestedItem = items.find(item => item.id === itemId);

    if (requestedItem) {
      res.json(requestedItem);
    }
    else {
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
    // TODO (vapaaehtonen, jatketaan tästä ens kerralla): lisää postattu item items-taulukkoon
    res.json({message: 'item created'});
  };

const deleteItem = (req, res) => {
    //TODO: implemoi delete
    // tip: array.findIndex
    res.json({message: 'delete placeholder'});
};

const putItem = (req, res) => {
    //TODO: implemoi modify item
    res.json({message: 'put placeholder'});
};


export {getItems, getItemByID, postItem, deleteItem, putItem};
