// dependencies
import express from "express";

// middlewares
import VerifyTokenMiddleware from "../middlewares/verify-token.middleware.js";

// controllers
import WellcomeController from "../controllers/wellcome.controller.js";
import DeveloperController from "../controllers/developer.controller.js";
import UserController from "../controllers/user.controller.js";
import PortfolioController from "../controllers/portfolio.controller.js";
import BlogController from "../controllers/blog.controller.js";

// init route
const api = express.Router();

// wellcome routes
api.get('/', WellcomeController.index);

// user routes
api.post('/user/register', UserController.register);
api.post('/user/login', UserController.login);
api.get('/user/profile', VerifyTokenMiddleware, UserController.profile);
api.patch('/user/profile', VerifyTokenMiddleware, UserController.update_data);
api.delete('/user/deactivated', VerifyTokenMiddleware, UserController.deactivated);

// user portfolio
api.get('/user/portfolio', VerifyTokenMiddleware, PortfolioController.get_all_portfolio_by_user_id);
api.get('/user/portfolio/:id', VerifyTokenMiddleware, PortfolioController.get_portfolio_by_id);
api.post('/user/portfolio', VerifyTokenMiddleware, PortfolioController.create_portfolio);
api.patch('/user/portfolio/:id', VerifyTokenMiddleware, PortfolioController.update_portfolio_by_id);
api.delete('/user/portfolio/:id', VerifyTokenMiddleware, PortfolioController.delete_portfolio_by_id);

// blog routes
api.get('/blogs', BlogController.get_blogs);
api.get('/blogs/my-blogs', VerifyTokenMiddleware, BlogController.get_blogs_by_author_id);
api.get('/blogs/:slug', BlogController.get_blog_by_slug);
api.post('/blogs', VerifyTokenMiddleware, BlogController.create_blog);
api.get('/blogs/:id/edit', VerifyTokenMiddleware, BlogController.get_blog_by_id);
api.patch('/blogs/:id/update', VerifyTokenMiddleware, BlogController.update_blog_by_id);
api.delete('/blogs/:id/delete', VerifyTokenMiddleware, BlogController.delete_blog_by_id);

// developer routes
api.post('/developer/register', DeveloperController.register);
api.post('/developer/login', DeveloperController.login);
api.get('/developer/applications', VerifyTokenMiddleware, DeveloperController.get_applications);
api.post('/developer/applications', VerifyTokenMiddleware, DeveloperController.create_application);
api.patch('/developer/applications/:application_id', VerifyTokenMiddleware, DeveloperController.update_application);
api.delete('/developer/applications/:application_id', VerifyTokenMiddleware, DeveloperController.delete_application);

// export
export default api;