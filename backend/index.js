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

app.post('/usernew', async (req, res)=>{
    try{
        var data = req.body;
        const datasave = new userModel(data);
        const saveddata = await datasave.save();
    } catch (error){
        console.log(error);
    }
})

app.post('/login', async (req, res) => {
    const { userEmail, userPassword } = req.body;

    try {
        const user = await userModel.findOne({ userEmail });

        if (!user) {
            console.log("Email not found");
            return res.status(400).send("Email not found!");
        }

        if (user.userPassword !== userPassword) {
            console.log("Incorrect password");
            return res.status(400).send("Incorrect password!");
        } else {
            console.log("Logged in successfully");
            return res.json({
                message     : "Login Successful!",
                userDetails : {
                    userName    : user.userName,
                    userEmail   : user.userEmail,
                    userContact : user.userContact,
                    userStatus  : user.userStatus
                }
                
            })
        }
    } catch (error) {
        console.log(error);
        res.status(500).send('Error during login');
    }
});

app.post('/eventnew', async (req, res)=>{
    try{
        var data = req.body;
        const datasave = new userModel(data);
        const saveddata = await datasave.save();
    } catch(error){
        console.log(error);
    }
})

app.delete('/userdeletion/:id', async (req, res)=>{
    try{
        await userModel.findByIdAndDelete(req.params.id);
        res.send("User deleted!");
    }catch(error){
        console.log(error);
    }
})

app.put('/userupdate/:id', async (req, res)=>{
    try{
        await userModel.findByIdAndUpdate(req.params.id, req.body);
        res.send("User updated!");
    }catch(error){
        console.log(error); 
    }
})

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
});
