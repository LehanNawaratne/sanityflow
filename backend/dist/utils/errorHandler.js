import { HTTP_STATUS } from '../constants/index.js';
const errorHandler = (err, req, res, next) => {
    console.error(err.stack);
    res.status(err.status || HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
        error: err.message || 'Internal Server Error'
    });
};
export default errorHandler;
//# sourceMappingURL=errorHandler.js.map