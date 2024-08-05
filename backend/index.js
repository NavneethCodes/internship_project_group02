const express = require("express");
const nodemailer = require("nodemailer");
const cron = require("node-cron");
const cors = require("cors");
const app = express();
const PORT = 4000;
require("./connection");
const userModel = require("./models/userData");
const eventModel = require("./models/eventData");
const recordModel = require("./models/eventRecords");
const adminControl = require('./models/adminControl');

app.use(cors());
app.use(express.json());

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port:465,
  secure: true,
  auth: {
    user: `gleve.event.managements@gmail.com`,
    pass: `ewyg kpyi mbsk pacm`
  }
})

cron.schedule('0 0 * * *', async () => {
  try {
    const currentDate = new Date();
    const result = await eventModel.deleteMany({ eventDate: { $lt: currentDate } });
    console.log(`${result.deletedCount} past events deleted.`);
  } catch (error) {
    console.error('Error deleting past events:', error);
  }
});

// This function is called when an event is to be deleted
const delete_event = async (event_id, res) => {
  try {
    const record = await recordModel.findOne({ event_id: event_id });
    if (record) {
      await recordModel.findByIdAndDelete(record._id);
    }
    await eventModel.findByIdAndDelete(event_id);
    const all_users = await userModel.find();
    let index_of_event = 0;
    for (let i = 0; i < all_users.length; i++) {
      if (all_users[i].registered_events.includes(event_id)) {
        index_of_event = all_users[i].registered_events.indexOf(event_id);
        all_users[i].registered_events.splice(index_of_event, 1);
        await all_users[i].save();
      }
    }
    res.send("Event deleted successfully!");
  } catch (error) {
    res.status(500).json({message: "Error finding the event with this event id"});
  }
}

// This is a function to delete any expired events.
const cleanupExpiredEvents = async () => {
  try {
    const currentDate = new Date();
    const expiredEvents = await eventModel.find({ eventDate : { $lt: currentDate } });
    for (const event of expiredEvents) {
      const record = await recordModel.findOne({event_id : event._id});
      await recordModel.findByIdAndDelete(record._id);
      await eventModel.findByIdAndDelete(event._id);
    }
    console.log("Expired events deleted successfully!");
  } catch (error) {
    console.log("Error deleting expired events:", error);
  }
}

// This would force the database to check for expired events.
app.post('/admin-force-clean', async (req, res) => {
  try {
    await cleanupExpiredEvents();
    res.send("Expired events cleaned");
  } catch (error) {
    res.status(500).send("Error cleaning up expired events.");
  }
});

// This would return all the existing users from the db.
app.get("/users", async (req, res) => {
  try {
    const data = await userModel.find();
    res.send(data);
  } catch (error) {
    console.log(error);
  }
});

// This function is to get all the inforamtion about the person with the given user id
app.get("/user-info/:id", async (req, res) => {
  try{
    const user = await userModel.findById(req.params.id);
    return res.status(200).json(user);
  }catch(error){
    return res.status(400).send({ message: "No such user!"});
  }
});

// This function is to get the user name of the person with the entered user id
app.get('/id/:id', async (req, res) => {
  try{
    const user = await userModel.findById(req.params.id);
    return res.status(201).json({userName : user.userName});
  } catch {
    return res.status(400).send({ message: "No user found!"});
  }
});

// This function is to get all the event names of the array passed
app.get('/event-names', async (req, res) => {
  try {
    const reg_ids = req.body.registered_events;
    console.log(reg_ids)
    let names = [];
    for (let i =0; i < reg_ids.length; i++) {
      console.log("ID:- ",reg_ids[i]);
      let event = await eventModel.findById(reg_ids[i]);
      if (event) {
        names.push(event.eventName);
      } 
      else {
        console.log("Not valid event id");
      }
    }
    return res.status(200).json({names});
  } catch (error) {
    res.status(500).json({message: "Unauthorized!"})
  }
});

// To get the like and comment count.
app.get('/like-comment-count/:user_id', async (req, res) => {
  try {
    const user_id = req.params.user_id;
    const records = await recordModel.find();
    let like_count = 0;
    let comment_count = 0;
    for (let i = 0; i < records.length; i++) {
      if (records[i].likes.includes(user_id)) {
        like_count ++;
      }
      for (let j = 0; j < records[i].comments.length;  j++) {
        if (records[i].comments[j].user_id.toString() === user_id.toString()) {
          comment_count ++;
        }
      }
    }
    res.status(200).json({
      likes     : like_count,
      comments  : comment_count,
      message   : "Got the likes and comments count successfully"
    })
  } catch (error) {
    res.status(500).json({
      message   : "Failed to get the count"
    })
  }
});

// This function is to send email to all registered members about the newly arrived event
app.get('/send-email-to-all/:event_id', async(req, res) => {
  try {
    const event = await eventModel.findById(req.params.event_id);
    const htmlTemplate = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>New Event Notification</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600&display=swap');

    body {
      font-family: 'Open Sans', Arial, sans-serif;
      background-color: #f7f7f7;
      margin: 0;
      padding: 0;
    }

    .container {
      width: 80%;
      max-width: 800px;
      margin: 40px auto;
      background-color: #ffffff;
      padding: 20px;
      border-radius: 10px;
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
      animation: fadeIn 1s ease-in-out;
    }

    .header {
      text-align: center;
      border-bottom: 1px solid #eeeeee;
      padding-bottom: 20px;
      margin-bottom: 20px;
    }

    .header h1 {
      color: #333333;
      font-size: 28px;
      margin-bottom: 10px;
    }

    .header p {
      color: #777777;
      font-size: 16px;
    }

    .content {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      animation: slideIn 1s ease-in-out;
    }

    .event-img-container {
      width: 100%;
      margin-right:30px;
      position: relative;
      margin-bottom: 20px;
      overflow: hidden;
      border-radius: 10px;
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    }

    .event-img-container img {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.5s ease;
    }

    .event-img-container img:hover {
      transform: scale(1.05);
    }

    .content-left {
      width: 100%;
    }

    .content-left h2 {
      color: #333333;
      font-size: 24px;
      margin: 0 0 10px;
    }

    .content-left p {
      color: #555555;
      font-size: 16px;
      margin: 5px 0;
    }

    .footer {
      text-align: center;
      padding: 20px 10px;
      background-color: #f7f7f7;
      border-radius: 0 0 10px 10px;
      border-top: 1px solid #eeeeee;
    }

    .view-more {
      display: inline-block;
      margin-top: 20px;
      padding: 12px 30px;
      background-color: #ff7f50;
      color: #ffffff;
      text-decoration: none;
      border-radius: 25px;
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
      transition: background-color 0.3s ease, transform 0.3s ease;
    }

    .view-more:hover {
      background-color: #ff5733;
      transform: translateY(-2px);
    }

    @keyframes fadeIn {
      from {
        opacity: 0;
        transform: translateY(-20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    @keyframes slideIn {
      from {
        opacity: 0;
        transform: translateX(-20px);
      }
      to {
        opacity: 1;
        transform: translateX(0);
      }
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
        <h1>Hey Glever, another event is up in the horizon!</h1>
        <p>Excited for the event? Here are the details!</p>
    </div>
    <div class="content">
      <div class="event-img-container">
        <img src="${event.eventImg}" alt="Event Image">
      </div>
      <div class="content-left">
        <h2>${event.eventName}</h2>
        <p><strong>Description:</strong> ${event.eventDescription}</p>
        <p><strong>Location:</strong> ${event.eventLocation}</p>
        <p><strong>Date:</strong> ${event.eventDate}</p>
        <p><strong>Time:</strong> ${event.eventStartTime} - ${event.eventEndTime}</p>
        <p><strong>Category:</strong> ${event.eventCategory}</p>
        <p><strong>Organizer:</strong> ${event.eventOrganizer}</p>
      </div>
    </div>
    <div class="footer">
      <a href="http://localhost:5173/events" class="view-more">View More</a>
      <p>Thank you for being a part of our community!</p>
    </div>
  </div>
</body>
</html>

  `;
    const userEmails = await userModel.find({}, 'userEmail');
    let mails = userEmails.map(mail => mail.userEmail);
    // mails = ['harisankar.mbcet@gmail.com','navneetharun0402@gmail.com','aishuafra@gmail.com']
    // res.status(200).json(mails);
    if (mails.length === 0) {
      console.log(`No user founds.`);
      res.status(400).json({message: "No users in mail, try again later!!"});
    }
    const mailOption = {
      from    : 'Gleve <gleve.event.managements@gmail.com>',
      subject : `New event came up! Hurry, join the fun!`,
      text    : `Hey Glever, another event is up in the horizon!\n\nExcited for the event?\nHere are the details!`,
      html    : htmlTemplate
    };
    for (let mail of mails) {
      try{
        await transporter.sendMail({...mailOption, to: mail});
        console.log(`Mail send to ${mail}`);
      }catch (error) {
        console.log(`Error sending email to ${mail}`);
      }
    }
    res.status(200).send('Email sent successfully!');
  } catch (error) {
    res.status(500).json({message: "Cannot send mail now."})
  }
});

// This is to send an email if the user forgets his/her password
app.get('/forgot-password/:email_id', async (req, res) => {
  const email_id = req.params.email_id;
  try {
    const user = await userModel.findOne({ userEmail : email_id });
    if (user) {
      const htmlTemplate = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Forgot Password</title>
            <style>
                @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap');

                body {
                    font-family: 'Poppins', Arial, sans-serif;
                    background-color: #f4f4f4;
                    margin: 0;
                    padding: 0;
                }

                .email-container {
                    max-width: 600px;
                    margin: 0 auto;
                    border: 1px solid #ddd;
                    background-color: #fff;
                }

                .header {
                    background-color: black;
                    color: white;
                    text-align: center;
                    padding: 40px;
                }

                .header h1 {
                    margin: 0;
                    font-size: 24px;
                }

                .body {
                    padding: 40px;
                    text-align: left;
                    font-size: 16px;
                    line-height: 1.6;
                }

                .body p {
                    margin: 0 0 20px;
                }

                .button-container {
                    text-align: center;
                    padding: 20px;
                }

                .button {
                    background-color: black;
                    padding: 10px 20px;
                    border-radius: 5px;
                    text-decoration: none;
                    color: #ffffff;
                    font-weight: bold;
                    display: inline-block;
                }

                .footer {
                    background-color: black;
                    padding: 20px;
                    text-align: center;
                    color: white;
                    font-size: 14px;
                }

                @media screen and (max-width: 600px) {
                    .email-container {
                        width: 100% !important;
                        padding: 10px !important;
                    }

                    .header, .body, .footer {
                        padding: 20px !important;
                    }
                }
                @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }

        .email-container {
            animation: fadeIn 1s ease-in-out;
        }

            </style>
        </head>
        <body>
            <div class="email-container">
                <div class="header">
                    <h1>Team Gleve.</h1>
                </div>
                <div class="body">
                    <p>Hi ${user.userEmail},</p>
                    <p>You requested Team Gleve to reveal your password , here it is ..</p>
                    <p>Your password is: <strong>${user.userPassword}</strong></p>
                    <p>Please remember this password to sign in to your account.</p>
                    <p>Sincerely,<br>Team Gleve.</p>
                </div>
                <div class="button-container">
                    <a href="https://localhost:4000/login" class="button">Login Here</a>
                </div>
                <div class="footer">
                    Copyright &copy; 2024 | Gleve.
                </div>
            </div>
        </body>
        </html>
      `;
      const mailOption = {
        from: 'Gleve <gleve.event.management@gmail.com>',
        to: email_id,
        subject: 'Forgot Password? No worries! we are here',
        text: `Hey Glever, we got your back`,
        html: htmlTemplate
      };
      await transporter.sendMail(mailOption);
      res.status(200).json({ message: "Email sent successfully." });
    } else {
      res.status(404).json({ message: "User not found." });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Cannot send mail now." });
  }
});

// Function to find difference between current date and the event date
const diffDate = (event_date) => {
  const current_date = new Date();
  const ms_diff = event_date.getTime() - current_date.getTime();
  const sec_diff = ms_diff / 1000;
  const min_diff = sec_diff / 60;
  const hour_diff = min_diff / 60;
  const days_diff = hour_diff / 24;
  return days_diff;
}

const registered_users = async (event_id) => {
  const users = await userModel.find();
  try {
    if (await eventModel.findById(event_id)) {
      let users_registered = [];
      for (let i = 0; i < users.length; i++) {
        if (users[i].registered_events.includes(event_id)) {
          users_registered.push(users[i]);
        }
        if (users_registered.length > 0) {
          return { users: users_registered, message: "Users registered returned." };
        }
        return { users: null, message: "Empty, no users registered for this event!"};
      }
    } else {
      return { users: null, message: "Invalid input received!"};
    }
  } catch (error) {
    
  }
}

// This is to send email to all users who registered for the event prior day.
app.get('/prior-remainder/:event_id', async (req, res) => {
  const event = await eventModel.findById(req.params.event_id);
  const difference = Math.floor(diffDate(event.eventDate));
  diffs = [0, 2, 9]
  if (difference in diffs) {
      console.log(`The event happens in ${difference + 1} ${difference == 0 ? 'day' : 'days'}`);
  }
});

// This is to get all the user_id who has registered for this event.
app.get('/register-who/:event_id', async (req, res) => {
  const event_id = req.params.event_id;
  const users = await userModel.find();
  try {
    if (await eventModel.findById(event_id)){
      let users_registered = [];
      for (let i = 0; i < users.length; i++) {
        if (users[i].registered_events.includes(event_id)) {
          users_registered.push(users[i]._id);
        }
      }
      return res.status(200).json({
        users_registered: users_registered, 
        message         : "Successfully extracted all users who registered for the event"
      })
    } else {
      res.status(400).json({message: "Event not recognized, check `_id`"});
    }
  } catch (error) {
    res.status(500).json({message: "Authorization rejected!"})
  }
});

// This would return all the existing events from the db.
app.get("/events", async (req, res) => {
    try {
      const data = await eventModel.aggregate([
        {
          $lookup: {
            from: 'event_records',
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
  
// This would add a new user to the db, if the user has the credentials valid
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
    const admin = await adminControl.findOne();
    if (admin) {
      if (!admin.active_users.includes(savedUser._id)) {
        admin.active_users.push(savedUser._id);
        await admin.save();
      } 
    } else {
      const newAdminControl = new adminControl({
        active_users: [savedUser._id]
      });
      await newAdminControl.save();
    }
    return res.status(200).json({savedUser, message:"User Created Successfully!"})
  } catch (error) {
      console.log(error);
      res.status(500).send("Error during user creation");
  }
});

// This would be used when a user logs in, checks if that person is a valid user or not
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
      const admin = await adminControl.findOne();
      if (admin) {
        if (!admin.active_users.includes(user._id)) {
          admin.active_users.push(user._id);
          await admin.save();
        }
      } else {
        const newAdminControl = new adminControl({
          active_users: [user._id]
        })
        await newAdminControl.save();
      }
      res.status(200).json({message: "Logged in successfully!", user})  
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Error during login");
  }
});

// This would be used when a user requests a logout
app.put('/logout/:id', async (req, res) => {
  try{
    let admin = await adminControl.findOne();
    if (admin) {
      console.log("inside");
      if (admin.active_users.includes(req.params.id)) {
        let index = admin.active_users.indexOf(req.params.id);
        admin.active_users.splice(index, 1);
        await admin.save();
      }
    }
  } catch (error) {
    res.status(500).send("Error signing out!");
  }
})

// This would be used when a new event is being created
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

// This function is to delete an event from the events collection having the same event id as passed.
app.delete(`/event-delete/:event_id`, async (req, res) => {
  try {
    const event_id = req.params.event_id;
    delete_event(event_id, res);
  } catch(error) {
    res.send("Error finding the event with this event id");
  }
});

// This function is to update the details of the event with the given event_id
app.put(`/update-event/:event_id`, async (req, res) => {
  try{
    let event = await eventModel.findById(req.params.event_id);
    console.log(event);
    console.log("Changes\n", req.body);
    if(!event) {
      return res.status(404).json({message: "Event not found!"});
    }
    let updated_fields = {};
    if (req.body.eventName && (req.body.eventName !== event.eventName)) {
      updated_fields.eventName = req.body.eventName;
      console.log("Inside");
    }
    if (req.body.eventDescription && req.body.eventDescription !== event.eventDescription) {
      updated_fields.eventDescription = req.body.eventDescription;
    }
    if (req.body.eventLocation && req.body.eventLocation !== event.eventLocation) {
      updated_fields.eventLocation = req.body.eventLocation;
    }
    if (req.body.eventDate && req.body.eventDate !== event.eventDate) {
      updated_fields.eventDate = req.body.eventDate;
    }
    if (req.body.eventStartTime && req.body.eventStartTime !== event.eventStartTime) {
      updated_fields.eventStartTime = req.body.eventStartTime;
    }
    if (req.body.eventEndTime && req.body.eventEndTime !== event.eventEndTime) {
      updated_fields.eventEndTime = req.body.eventEndTime;
    }
    if (req.body.eventCategory && req.body.eventCategory !== event.eventCategory) {
      updated_fields.eventCategory = req.body.eventCategory;
    }
    if (req.body.eventOrganizer && req.body.eventOrganizer !== event.eventOrganizer) {
      updated_fields.eventOrganizer = req.body.eventOrganizer;
    }
    if (req.body.eventImg && req.body.eventImg !== event.eventImg) {
      updated_fields.eventImg = req.body.eventImg;
    }
    console.log(updated_fields);
    if (Object.keys(updated_fields).length === 0) {
      return res.status(400).json({message: "No changes detected!"});
    }
    Object.assign(event, updated_fields);
    await event.save();
    return res.status(200).json({message: "Successfully edited the event details!"});
  } catch (error) {
    res.status(500).json({message: "Error in updating the event!"});
  }
});

// This would be used to delete an existing user
app.delete("/userdeletion/:id", async (req, res) => {
  try {
    const user_id = req.params.id;
    // console.log("Deleting user with ID:", user_id);
    await userModel.findByIdAndDelete(user_id);
    // console.log("User deleted from userModel");
    const records = await recordModel.find();
    // console.log("Records fetched:", records);
    for (const record of records) {
      // console.log("Processing record with ID:", record._id);
      const likeIndex = record.likes.indexOf(user_id);
      if (likeIndex > -1) {
        record.likes.splice(likeIndex, 1);
        console.log("Removed user from likes at index:", likeIndex);
      }
      for (let i = 0; i < record.comments.length; i++) {
        // console.log(`Checking comment with ID: ${record.comments[i]._id} by user: ${record.comments[i].user_id}`);
        if (record.comments[i].user_id.toString() === user_id.toString()) {
          record.comments.splice(i, 1);
          // console.log("Removed comment at position:", i);
          // console.log("Updated comments array:", record.comments);
          i--;
        }
      }
      await record.save();
      // console.log("Record saved:", record._id);
    }
    res.send("User deleted and references cleaned up!");
  } catch (error) {
    console.log("Error occurred:", error);
    res.status(500).send("An error occurred while deleting the user.");
  }
});

// This function is used to update the details of a user having the same user_id as provided
app.put('/user-info-update/:id', async (req, res) => {
  try {
    let user = await userModel.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }
    console.log('Current User Data:', user);
    console.log('Received Update Data:', req.body);
    let updatedFields = {};
    if (req.body.userName && req.body.userName !== user.userName) {
      updatedFields.userName = req.body.userName;
    }
    if (req.body.userEmail && req.body.userEmail !== user.userEmail) {
      updatedFields.userEmail = req.body.userEmail;
    }
    if (req.body.userContact && req.body.userContact !== user.userContact) {
      updatedFields.userContact = req.body.userContact;
    }
    if (req.body.userPassword && req.body.newPassword && req.body.userPassword !== req.body.newPassword) {
      updatedFields.userPassword = req.body.newPassword;
    }
    if (Object.keys(updatedFields).length === 0) {
      return res.status(400).json({ message: "No changes detected!" });
    }
    Object.assign(user, updatedFields);
    await user.save();
    return res.status(200).json({ user, message: "Successfully updated the profile!" });
  } catch (error) {
      console.error("Error updating user profile:", error);
      return res.status(500).json({ message: "An error occurred while updating the profile." });
  }
});
  
// This would be used to update the user's status
app.put("/user-status-update/:id", async (req, res) => {
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

// This function is used to like, unlike(revert like), comment and uncomment
app.put("/action/:action", async (req, res) => {
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

// Returns all the categories of the entered events
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

// This function is for the users to register and unregister for events
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
    return res.status(200).json({user, message:"Operation done successfully!"});
  } catch (error) {
    console.log("An error occured!\n", error);
  }
  
});

app.listen(PORT, async () => {
  console.log(`Server running at http://localhost:${PORT}/`);
  await cleanupExpiredEvents();
});

