import app from "./application/app.js";
import logger from "./application/logger.js";
import 'dotenv/config';

app.listen(process.env.EXPRESS_PORT, () => {
    logger.info(`Server running at http://${process.env.EXPRESS_HOST}:${process.env.EXPRESS_PORT}`);
});