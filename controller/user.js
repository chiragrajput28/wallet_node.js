import validator from 'validator';
import jwt from 'jsonwebtoken';

import { emailSender } from '../utils/signUp.js';

import { createUser, loginCheckDB } from '../transferFunctionality/user.js';


// Created user into the database
export const signup = async function (req, res, next) {
    // console.log(req.body.email);
    const serviceUser = await createUser(
        req.body.email,
        req.body.password,
        req.body.name,
    );
    //console.log(serviceUser);
    try {
        if (serviceUser) {
        emailSender(res.body.email, res.body.name);
        }
    } catch (err) {
        console.log('problem in email server');
    }
    res.status(201).json({
        id: serviceUser._id,
        email: serviceUser.email,
        user: serviceUser.user,
    });
    next();
};



export const login = async function (req, res, next) {
    const DBloginCheck = await loginCheckDB(req.body.email, req.body.password);
    if (DBloginCheck) {
        const token = jwt.sign(
        {
            userId: DBloginCheck.id,
            email: DBloginCheck.email,
        },
        'authtoken',
        { expiresIn: '1h' }
        );
        res.status(200).json({ token: token, userId: DBloginCheck.id });
    }
    next();
};
