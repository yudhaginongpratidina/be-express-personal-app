import jwt from 'jsonwebtoken';
import 'dotenv/config';

const VerifyTokenMiddleware = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) return res.sendStatus(401);
    jwt.verify(token, process.env.JWT_ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) return res.sendStatus(403);
        req.id = decoded.id;
        req.name = decoded.name;
        req.email = decoded.email;
        next();
    });
};

export default VerifyTokenMiddleware;