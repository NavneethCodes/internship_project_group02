const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 4000;
require("./connection");
const userModel = require("./models/userData");
const eventModel = require("./models/eventData");
const recordModel = require("./models/eventRecords");

app.use(cors());

app.use(express.json());

//This would return all the existing users from the db.
app.get("/users", async (req, res) => {
  try {
    const data = await userModel.find();
    res.send(data);
  } catch (error) {
    console.log(error);
  }
});

app.get("/user-info/:id", async (req, res) => {
  try{
    const user = await userModel.findById(req.params.id);
    return res.status(200).json(user);
  }catch(error){
    return res.status(400).send({ message: "No such user!"});
  }
});

app.get('/id/:id', async (req, res) => {
  try{
    const user = await userModel.findById(req.params.id);
    return res.status(201).json({userName : user.userName});
  } catch {
    return res.status(400).send({ message: "No user found!"});
  }
})

//This would return all the existing events from the db.
app.get("/events", async (req, res) => {
    try {
      const data = await eventModel.aggregate([
        {
          $lookup: {
            from: 'event-records',
            localField: '_id',
            foreignField: 'event_id',
            as: 'eventRecords'
          }
        },
        {
          $unwind: {
            path: '$eventRecords',
            preserveNullAndEmptyArrays: true
          }
        },
        {
          $addFields: {
            likes: { $ifNull: ["$eventRecords.likes", []] },
            comments: { $ifNull: ["$eventRecords.comments", []] }
          }
        },
        {
          $project: {
            'eventRecords': 0
          }
        }
      ]);
      res.send(data);
    } catch (error) {
      console.log(error);
      res.status(500).send('Error fetching events');
    }
  });
  
//This would add a new user to the db, if the user has the credentials valid
app.post("/usernew", async (req, res) => {
  try {
    const { userEmail, userPassword } = req.body;
    console.log("Email:-", userEmail);
    const userExists = await userModel.findOne({ userEmail });
    if (userExists) {
      // console.log("userExists\n", userExists);
      return res.status(400).send("Email already in use!");
    }
    if (userPassword.length < 6 && userPassword.length > 16) {
      return res
        .status(400)
        .send("Password must have the length between 6 and 16");
    }
    const data = req.body;
    const newUser = new userModel(data);
    const savedUser = await newUser.save();
    return res.status(200).json({savedUser, message:"User Created Successfully!"})
  } catch (error) {
      console.log(error);
      res.status(500).send("Error during user creation");
  }
});

//This would be used when a user logs in, checks if that person is a valid user or not
app.post("/login", async (req, res) => {
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
      res.status(200).json({message: "Logged in successfully!", user})
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Error during login");
  }
});

//This would be used when a user requests a logout
app.post('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      return res.status(500).json({message: 'Error logging out'})
    }
    res.status(200).json({message: 'Logout success!'})
  })
})

//This would be used when a new event is being created
app.post("/eventnew", async (req, res) => {
  try {
    var data = req.body;
    const datasave = new eventModel(data);
    const saved_event = await datasave.save();
    const recordsInit = new recordModel({
      event_id  : saved_event._id,
      likes     : [],
      comments  : []
    });
    await recordsInit.save();

    res.status(201).json({
      message: "Event and event record created successfully!",
      event: saved_event,
      eventRecord: recordsInit,
    });
  } catch (error) {
    console.log(error);
  }
});

//This would be used to delete an existing user
app.delete("/userdeletion/:id", async (req, res) => {
  try {
    await userModel.findByIdAndDelete(req.params.id);
    res.send("User deleted!");
  } catch (error) {
    console.log(error);
  }
});

//This would be used to update the user's status
app.put("/userupdate/:id", async (req, res) => {
    const userId = req.params.id;
    const data = await userModel.findById(userId);
    var userStatus = data.userStatus;
    console.log(data);
    if (userStatus === 'active'){
        data.userStatus = 'suspend';
    } else {
        data.userStatus = 'active';
    }
    console.log(userStatus);
    await data.save();

    res.json(data);
});

app.put("/action/:action", async (req, res) => {
  console.log("inside");
  const { user_id, event_id } = req.body;
  console.log(user_id,"\n", event_id);
  const action = req.params.action;
  try{
    const record = await recordModel.findOne({ event_id });

    if (!record) {
      console.log("Event record not found");
      return res.status(404).send("Event record not found");
    }

    if(action === 'like'){
      if(!record.likes.includes(user_id)){
        record.likes.push(user_id);
      }
    } else if (action === 'unlike') {
      if(record.likes.includes(user_id)){
          const index = record.likes.indexOf(user_id);
          record.likes.splice(index, 1);
      }
    } else if (action === 'comment') {
      const comment = req.body.comment;
      if(comment){
        record.comments.push({
          user_id : user_id, 
          comment : comment
        }) 
      } else {
        return res.status(400).send("Comment text is required!")
      }
    } else if(action === 'uncomment') {
        const comment = req.body.comment;
        if(comment){
          const index_comment = record.comments.findIndex(
            (c) => c.user_id.toString() === user_id && c.comment === comment
          );
          if (index_comment !== -1) {
            record.comments.splice(index_comment, 1);
          } else {
            console.log("Comment not found");
            return res.status(400).send("Comment not found!");
          }
        }
    }else {
      return res.status(400).send("Invalid action!");
    }
    await record.save();
    res.status(201).json(record);
  }catch(error){
    console.log(error);
  }
})

//Returns all the categories of the entered events
app.get('/all-categories', async (req, res) => {
  try {
    const events = await eventModel.find();
    let set_categories = new Set();
    set_categories.add("All")
    for (let i = 0; i < events.length; i++){
      if(events[i].eventCategory)
        set_categories.add(events[i].eventCategory);
    }
    const categories = Array.from(set_categories);
    res.json({
      message: "Categories fetched successfully",
      categories: categories
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "An error occured while fetching categories",
      error: error.message
    });
  }
})

app.put('/:choice/:id/:event', async (req, res) => {
  try{
    const { choice, id, event } = req.params;
    user = await userModel.findById(id);
    if (choice === "0") {
      //logic for add event to registered ...
      if (! user.registered_events.includes(event)) {
        user.registered_events.push(event);
      } else {
        return res.status(400).json({user, message: "Event already in the registered events of this user!"});
      }
    } else if (choice === "1") {
      //logic for removing an event that is registered...
      if(user.registered_events.includes(event)) {
        const index_of_event = user.registered_events.indexOf(event);
        user.registered_events.splice(index_of_event, 1);
      } else {
        return res.status(400).json({user, message: "Event already in the registered events of this user!"})
      }
    }
    await user.save();
    return res.status(400).json({user, message:"Operation done successfully!"});
  } catch (error) {
    console.log("An error occured!\n", error);
  }
  
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});

