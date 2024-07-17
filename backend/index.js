const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 4000;
require('./connection');
const userModel = require('./models/userData');
const eventModel = require('./models/eventData');

app.use(cors());
app.use(express.json());

app.get('/users', async (req, res) => {
    // console.log('inside');
    try {
        const data = await userModel.find();
        res.send(data);
    } catch (error) {
        console.log(error);
    }
});

app.get('/events', async (req, res)=>{
    try{
        const data = await eventModel.find();
        res.send(data);
    } catch(error) {
        console.log(error);
    }
})

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
});
