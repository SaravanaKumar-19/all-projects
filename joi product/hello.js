const express = require('express');
const app = express();
const port=3000;

app.use(express.json());

let products = [];
let orders = [];

const Joi = require('joi');

const productSchema = Joi.object({
    name: Joi.string().min(3).required(),
    price: Joi.number().greater(0).required(),
    category: Joi.string().valid('TV', 'Laptop', 'Books').required(),
    inStock: Joi.boolean().required(),
    description: Joi.string().min(10).max(200).optional()
});


const orderSchema = Joi.object({
    orderId: Joi.string().pattern(/^ORD-\d{4}$/).required(),
    products: Joi.array().items(productSchema).required(),
    totalAmount: Joi.number().greater(0).required(),
    orderDate: Joi.date().max('now').required(),
    shippingAddress: Joi.object({
        street: Joi.string().required(),
        city: Joi.string().required(),
        zipcode: Joi.string().length(6).pattern(/^\d{6}$/).required(),
        country: Joi.string().required()
    }).required()
});

app.post('/addProduct', (req, res) => {
    const { error, value } = productSchema.validate(req.body);

    if (error) {
        return res.status(400).send(error.message);
    }
    let NewProducts = {...value}

    products.push(NewProducts)
    res.status(200).json({NewProducts});
    
    
});

app.post('/placeOrder', (req, res) => {
    const { error, value } = orderSchema.validate(req.body);

    if (error) {
        return res.status(400).send(error.message);
    }
    let neworder={...value}

    orders.push(neworder);
    res.status(200).json({neworder});
});
app.get('/products', function (req, res){
    res.json(products);
});

app.get('/orders', function (req, res){
    res.json(orders);
});

app.listen(port, () => {
    console.log("Server is running");
});