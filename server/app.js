import { default as cookieParser } from "cookie-parser";
import cors from "cors";
import "dotenv/config.js";
import express from "express";
import { errorHandler } from "./middlewares/errorHandler.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";

const app = express();

app.use(cookieParser()); //allow parse cookies from request object
app.use(express.json()); // for read json data from req body

app.use(
  cors({
    origin: ["http://localhost:5173", process.env.CLIENT_URL],
    credentials: true, // set when working with credentials (cookies,http,authentication)
  })
); //for accepting incoming requests from other domains

//register routes
app.get("/", (req, res) => {
  res.send("Hello There");
});
app.use("/api", userRoutes); // for read json data from req body
app.use("/api", categoryRoutes); // for read json data from req body
app.use("/api", productRoutes); // for read json data from req body

//handle any error of express server
app.use(errorHandler);

export default app;
