import type { StreamOptions } from "morgan";
import Logger from "../utils/logger.js";
import morgan from "morgan";

const stream: StreamOptions = {
    write: (message) => Logger.http(message.trim()),
};

const morganMiddleware = morgan(
    ":method :url :status :res[content-length] - :response-time ms",
    { stream }
);

export default morganMiddleware;