import express from 'express';
import bcrypt from 'bcryptjs';

import { createJWTToken, maxAge } from '@libs/auth';

import UserSchema from '@models/user';

const authRoutes = express.Router();

authRoutes.route('/register').post((req, res) => {
  const { username, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 8);

  UserSchema.create({ username: username, password: hashedPassword }, (err, user) => {
    if (err) { return res.status(500).send("Can not create user."); }

    const token = createJWTToken({ id: user.id, username: user.username });
    res.status(201).cookie('token', token, { httpOnly: true, maxAge: maxAge }).json({ auth: true, username: username });
  });
});

authRoutes.route('/login').post((req, res) => {
  const { username, password } = req.body;

  UserSchema.findOne({ username: username }, (err, user) => {
    if (err || !user || !bcrypt.compareSync(password, user.password)) {
      res.status(401).json({ message: 'Validation failed. Wrong username and password' });
    }

    const token = createJWTToken({ id: user.id, username: user.username });

    res.cookie('token', token, { httpOnly: true, maxAge: maxAge }).json({ auth: true, username: username });
  });
});

export default authRoutes;
