import express from 'express';
import bcrypt from 'bcryptjs';

import { createJWTToken, maxAge } from '@libs/auth';

import UserSchema from '@models/user';

const userRoutes = express.Router();

userRoutes.route('/current').get((req, res) => {
  UserSchema.findById(req.decodedToken['id'], (err, user) => {
    if (err || !user) { return res.status(401).json({ message: `Can't find user` }); }

    const { id, username } = user;
    res.json({ id: id, username: username });
  });
});

export default userRoutes;
