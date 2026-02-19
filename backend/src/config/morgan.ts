import type { StreamOptions } from "morgan";
import Logger from "../utils/logger.js";
import env from "./env.js";
import morgan from "morgan";

const stream: StreamOptions = {
    write: (message) => Logger.http(message),
};

const skip = () => {
    const nodeEnv = env.NODE_ENV;
    return nodeEnv !== 'development';
}

const morganMiddleware = morgan (
    ":method :url :status :res[content-length[ - response-time ms",

    { stream, skip }
);

export default morganMiddleware;