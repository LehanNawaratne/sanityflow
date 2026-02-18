import jwt from 'jsonwebtoken';
import { HTTP_STATUS } from '../constants/index.js';
const auth = (req, res, next) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');
        if (!token)
            throw new Error();
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.userId;
        next();
    }
    catch (error) {
        res.status(HTTP_STATUS.UNAUTHORIZED).json({ error: 'Please authenticate' });
    }
};
export default auth;
//# sourceMappingURL=auth.js.map