import jwt from 'jsonwebtoken';

export const maxAge = parseInt(process.env.TIMEOUT_AUTH_KEY);

export function verifyJWTToken(token) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, process.env.SECRET_AUTH_KEY, (err, decodedToken) => {
      if (err || !decodedToken) { return reject(err); }
      resolve(decodedToken);
    });
  });
}

export function createJWTToken(data) {
  return jwt.sign(data, process.env.SECRET_AUTH_KEY, {
    expiresIn: maxAge,
    algorithm: 'HS256',
  });
}

export function authMiddleware(req, res, next) {
  const token = req.cookies.token;

  if (token) {
    verifyJWTToken(token).then(decodedToken => {
      req.decodedToken = decodedToken;
      next();
    }).catch(error => {
      return res.status(401).json({
        auth: false,
        message: 'Failed to authenticate token.'
      })
    })
  } else {
    return res.status(401).send({
      auth: false, message: 'No token provided.'
    })
  }
}
