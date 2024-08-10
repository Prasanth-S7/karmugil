import express from 'express';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../index.js';
export const auth = express.Router();

auth.use((req, res, next) => {
    if (!req.headers.authorization) {
        return res.status(400).json({
            msg: "Please login to access this route"
        });
    }
    const userToken = req.headers.authorization.split(" ")[1];
    jwt.verify(userToken, JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({
                msg: "Invalid token"
            });
        }
        req.userDetails = decoded
        next();
    });
});

