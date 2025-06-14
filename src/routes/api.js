// dependencies
import express from "express";

// init route
const api = express.Router();

// controllers
import WellcomeController from "../controllers/wellcome.controller.js";

// wellcome routes
api.get('/', WellcomeController.index);

// export
export default api;