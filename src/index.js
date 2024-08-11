const express = require('express');
const cookieParser = require('cookie-parser');

const ServerConfig = require('./config/serverconfig');
const connectDB = require('./config/dbConfig');
const userRouter = require('./routes/userRoute');
const cartRouter = require('./routes/cartRoute');
const authRouter = require('./routes/authRoute');
const { isLoggedIn } = require('./validation/authValidator');
const uploader = require('./middlewares/multerMiddleware');
const cloudinary = require('./config/cloudinaryConfig');
const fs = require('fs/promises');


const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({extended: true}));




app.use('/users', userRouter); // connects the router to the server
app.use('/carts', cartRouter);
app.use('/auth', authRouter);

app.get('/ping', isLoggedIn, (req, res) => {
    // controller
    console.log(req.body);
    console.log(req.cookies);
    return res.json({message: "pong"});
});

app.post('/photo', uploader.single('incomingFile'), async (req, res) => {
    console.log(req.file);
    const result = await cloudinary.uploader.upload(req.file.path);
    console.log("Result from cloudinary", result);
    await fs.unlink(req.file.path);
    return res.json({message: 'Ok'});
})

app.listen(ServerConfig.PORT, async () => {
    await connectDB();
    console.log(`Server started at port ${ServerConfig.PORT}...!!`);
    
});
