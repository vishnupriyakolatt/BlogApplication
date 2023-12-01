import express from "express";
import mongoose from 'mongoose';
import router from './routes/user-router';
 import blogRouter from "./routes/blog-routes";

const app = express();
app.use(express.json())
app.use('/api/user', router);
app.use('/api/blogs', blogRouter);

mongoose.connect("mongodb+srv://vishnupriyakolatt:foq3pHm7KOiI0MFe@cluster0.juzukyq.mongodb.net/BlogApp?retryWrites=true&w=majority")
    .then(() => app.listen(5000, () => console.log("Connected to database and listening on port 5000")))
    .catch((error) => console.error("Connection error:", error));


