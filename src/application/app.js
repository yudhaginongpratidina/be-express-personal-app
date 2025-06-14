// dependencies
import express from "express";
import cors from "cors";
import 'dotenv/config';

// routes
import api from "../routes/api.js";

// middlewares
import ErrorMiddleware from "../middlewares/error.middleware.js";
import NotFoundMiddleware from "../middlewares/not-found.middleware.js";

// init
const app = express();

// middlewares
app.use(cors());
app.use(express.json());
app.set('trust proxy', true);
app.use(express.urlencoded({ extended: true }));

// routes
app.use('/', api);

// middleware
app.use(ErrorMiddleware);
app.use(NotFoundMiddleware);

// export
export default app;