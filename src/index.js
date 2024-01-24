// Main JS file
import express from 'express';
import path from 'path';
import {fileURLToPath} from 'url';
import { deleteItem, getItemByID, getItems, postItem, putItem } from './items.mjs';

const hostname = '127.0.0.1';
const port = 3000;
const app = express();


// Staattinen sivusto palvelimen juureen (public-kansion sisältö näkyy osoitteessa http://127.0.0.1:3000/sivu.html)
app.use(express.static('public'));
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


// Staattinen sivusto "ali-url-osoitteessa": http://127.0.0.1:3000/sivusto
// Tarjoiltava kansio määritellään relatiivisella polulla
app.use('/sivusto', express.static(path.join(__dirname, '../public')));


// GET http://127.0.0.1:3000/items
app.get('/items', getItems);

// GET http://127.0.0.1:3000/items/<ID>
app.get('/items/:id', getItemByID);

// POST http://127.0.0.1:3000/items/ (itemin lisääys)
app.post('/items', postItem);

// DELETE http://127.0.0.1.3000/items
app.delete('/items:id', deleteItem);

//PUT
app.put('/items/:id', putItem);




// // Itemin lisäys
// // POST http://127.0.0.1:3000/items/
// app.post('/items', (req, res) => {
//   // TODO (vapaaehtonen, jatketaan tästä ens kerralla): lisää postattu item items-taulukkoon
//   // Esimerkki: Oletetaan, että pyynnössä on JSON-muodossa oleva objekti
//   const newItem = req.body;

//   if (newItem && newItem.name) {
//     // Luodaan uniikki id uudelle itemille
//     const newId = items.length + 1;
//     const itemWithId = { id: newId, name: newItem.name };

//     // Lisätään uusi item items-taulukkoon
//     items.push(itemWithId);

//     res.json({ message: 'Item created', item: itemWithId });
//   } else {
//     res.status(400).json({ message: 'Invalid item data' });
//   }
// });


// GET http://127.0.0.1:3000
// ei toimi tällä hetkellä, koska public-server tarjoilee index.html:n ensin
app.get('/', (req, res) => {
  res.send('Welcome to my REST api!');
});


app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
