// dependencies
import winston from "winston";

// init
const logger = winston.createLogger({
    level: "debug",
    format: winston.format.json(),
    transports: [
        new winston.transports.Console({})
    ]
})

// export
export default logger;