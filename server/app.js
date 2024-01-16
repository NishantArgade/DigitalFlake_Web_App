import cors from "cors";
import "dotenv/config.js";
import express from "express";

import cookieParser from "cookie-parser";
import { errorHandler } from "./middlewares/errorHandler.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";

const app = express();

app.use(cors()); //for accepting incoming requests from other domains
app.use(express.json()); // for read json data from req body
app.use(cookieParser()); // for read json data from req body

//register routes
app.use("/api", userRoutes); // for read json data from req body
app.use("/api", categoryRoutes); // for read json data from req body
app.use("/api", productRoutes); // for read json data from req body

//handle any error of express server
app.use(errorHandler);

export default app;
