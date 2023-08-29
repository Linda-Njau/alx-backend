import redis from 'redis';
import express from 'express';
import { promisify } from 'util';

const listProducts = [
    {"itemId": 1, "itemName": 'suitecase 250', "price": 50, "initialAvaiableQuantity":  4},
    {"itemId": 2, "itemName": 'suitecase 450', "price": 100, "initialAvaiableQuantity":  10},
    {"itemId": 3, "itemName": 'suitecase 650', "price": 350, "initialAvaiableQuantity":  2},
    {"itemId": 4, "itemName": 'suitecase 1050', "price": 550, "initialAvaiableQuantity":  5},
];

function getItemByitemId(itemId) {
    return listProducts.filter((item) => item.itemId === itemId)[0];
}

const client = redis.createClient();
const getAsync = promisify(client.get).bind(client);

client.on('error', (error) => {
    console.log(`Redis client not connected to the server: ${error.message}`);
});

client.on('connect', () => {
    console.log('redis client connected to the server');
});

function reservedStockById(itemId, stock) {
    client.set(`item.${itemId}`, stock);
}

async function getCurrentReservedStockById(itemId) {
    const stock = await getAsync(`item.${itemId}`);
    return stock;
}

const app = express();
const port = 1245;

app.listen(port, () => {
    console.log(`app listening at http://localhost:${port}`);
});
app.get('/list_products', (req, res) => {
    res.json(listProducts);
});
app.get('/list_products/:itemId', async (req, res) => {
    const itemId = Number(req.params.itemId);
    const item = getItemByitemId(itemId);
    
    if (!item) {
        res.json(notFound);
        return;
    }

    const currentStock = await getCurrentReservedStockById(itemId);
    if (!currentStock) {
        await reservedStockById(itemId, item.initialAvaiableQuantity);
        item.currentQuantity = item.initialAvaiableQuantity;
    } else item.currentQuantity = currentStock;
    res.json(item)
});

app.get('/reserve_product/:itemId', async (req, res) => {
    const itemId = Number(req.params.itemId);
    const item = getItemByitemId(itemId);
    const noStock = { status: 'Not enough stock availbale', itemId };
    const reservationConfirmed = { status: 'Reservation confirmed', itemId };

    if(!item) {
        res.json(notFound);
        return;
    }

    let currentStock = await getCurrentReservedStockById(item.stockId);
    if (currentStock == null) currentStock = item.initialAvaiableQuantity;
    if (currentStock <= 0) {
        res.json(noStock);
        return;
    }
    reservedStockById(itemId, Number(currentStock) - 1);
    res.json(reservationConfirmed);

});
