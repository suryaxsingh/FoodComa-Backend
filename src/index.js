const express = require('express');

const ServerConfig = require('./config/serverconfig');
const connectDB = require('./config/dbConfig');
//const User = require('./schema/userSchema');

const app = express();

app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({extended: true}));

app.post('/ping', (req, res) => {
    console.log(req.body);
    return res.json({message: "pong"});
})

app.listen(ServerConfig.PORT, async () => {
    await connectDB();
    console.log(`Server started at port ${ServerConfig.PORT}...!!`);

    //const newUser = await User.create({
    //    email: 'a@b.com',
    //    password: '123456',
    //    firstName: 'jonathan',
    //    lastName: 'Majors',
    //    mobileNumber: '1234598765'
    // });

    //console.log("Created new user");
    //console.log(newUser);
});
