import jwt from "jsonwebtoken";
import 'dotenv/config';

export const generateToken = async (id, name, email) => {

    const access_token_secret = process.env.JWT_ACCESS_TOKEN_SECRET;
    const refresh_token_secret = process.env.JWT_REFRESH_TOKEN_SECRET;

    const access_token_payload = { id: id, name: name, email: email };
    const refresh_token_payload = { id: id, name: name, email: email };

    const access_token = jwt.sign(access_token_payload, access_token_secret, { expiresIn: "120m" });
    const refresh_token = jwt.sign(refresh_token_payload, refresh_token_secret, { expiresIn: "7d" });

    return { access_token, refresh_token };
};

export const decodeToken = async (token) => {
    const secret = process.env.JWT_ACCESS_TOKEN_SECRET;
    return jwt.verify(token, secret);
};