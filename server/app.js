import { default as cookieParser } from "cookie-parser";
import cors from "cors";
import "dotenv/config.js";
import express from "express";
import { rateLimit } from "express-rate-limit";
import helmet from "helmet";
import { CustomError } from "./Utils/CustomError.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import { reqRateLimiter } from "./middlewares/reqRateLimit.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
const app = express();

app.use(reqRateLimiter(60, 1000));
app.use(helmet()); //provide security to our express app by setting various HTTP response headers
app.use(cookieParser()); //allow parse cookies from request object
app.use(express.json({ limit: "50kb" })); // for read json data from req body

app.use(
  cors({
    origin: [process.env.CLIENT_URL, "http://localhost:5173"],
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
