import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(cors(
    {
        origin: process.env.CORS_ORIGIN_URL,
        credentials: true
    }
))

app.use(express.json({ limit: process.env.LIMIT || "16kb" }));

app.use(express.urlencoded({ extended: true, limit: process.env.LIMIT || "16kb" }));

app.use(express.static("public"));

app.use(cookieParser());

// routes import 
import userRouter from './routes/user.routes.js'
import tagRouter from './routes/tag.routes.js'
import categoryRouter from './routes/category.routes.js'
import commentRouter from './routes/comment.routes.js'
import blogRouter from './routes/blog.routes.js'
// routes declaration
app.use("/api/v1/users", userRouter)
app.use("/api/v1/tags", tagRouter);
app.use("/api/v1/categories", categoryRouter);
app.use("/api/v1/comments", commentRouter);
app.use("/api/v1/blogs", blogRouter);

export default app;