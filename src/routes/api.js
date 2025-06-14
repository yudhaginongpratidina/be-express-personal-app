// dependencies
import express from "express";

// init route
const api = express.Router();

// controllers
import WellcomeController from "../controllers/wellcome.controller.js";
import DeveloperController from "../controllers/developer.controller.js";

// wellcome routes
api.get('/', WellcomeController.index);

// developer routes
api.post('/developer/register', DeveloperController.register);
api.post('/developer/login', DeveloperController.login);

// export
export default api;