const express = require('express');
const cors = require('cors');
const {v4 : uuidv4} = require('uuid');
const stripe = require('stripe')('sk_test_51LdCk9Eys2RcAZbdQGwelKitjURtLq7VnNh6vVZAECtMWqAUlxNJYxTFJ7ahI6rkHLongmD69CULcXJWJzgU1z5g00glk1W5RO');

const app = express();
app.use(cors());

app.use(express.json());

app.get('/', (req, res)=>{
    res.send('Welcome to store')
});

app.post('/checkout', async(req, res)=>{
    let error;
    let status;
    try {
        const {basket, token} = req.body;
        console.log(req.body);
        const customer = await stripe.customers.create({
            email : token.email,
            source : token.id
        })
        const key = uuidv4();
        const charge = await stripe.charges.create({
            amount : basket.totalprice*100,
            currency : 'EUR',
            customer : customer.id,
            receipt_email : token.email,
            description : 'description here',
            shipping : {
                name : token.card.name,
                address:{
                    line1: token.card.address_line1,
                    line2: token.card.address_line2,
                    city : token.card.address_city,
                    country: token.card.address_country,
                    postal_code: token.card.address_zip
                }
            }
        }, {idempotencyKey : key})
        status='success';
    } catch (error) {
        console.log(error + 'Serveur connecté ?');
        status='error';
    }
    res.json({status});
})

app.listen(8080,()=>{
    console.log('App running on port 8080');
})