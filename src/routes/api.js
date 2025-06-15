// dependencies
import express from "express";

// middlewares
import VerifyTokenMiddleware from "../middlewares/verify-token.middleware.js";

// controllers
import WellcomeController from "../controllers/wellcome.controller.js";
import DeveloperController from "../controllers/developer.controller.js";

// init route
const api = express.Router();

// wellcome routes
api.get('/', WellcomeController.index);

// developer routes
api.post('/developer/register', DeveloperController.register);
api.post('/developer/login', DeveloperController.login);

// developer routes (protected)
api.get('/developer/applications', VerifyTokenMiddleware, DeveloperController.get_applications);
api.post('/developer/applications', VerifyTokenMiddleware, DeveloperController.create_application);
api.patch('/developer/applications/:application_id', VerifyTokenMiddleware, DeveloperController.update_application);
api.delete('/developer/applications/:application_id', VerifyTokenMiddleware, DeveloperController.delete_application);

// export
export default api;