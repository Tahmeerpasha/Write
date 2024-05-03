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
// routes declaration
app.use("/api/v1/users", userRouter)
app.use("/api/v1/tags", tagRouter);
export default app;