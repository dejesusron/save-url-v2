import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';

const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // get token from header
      token = req.headers.authorization.split(' ')[1];

      // verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // get user from token
      req.user = await User.findById(decoded.id).select('-password');

      next();
    } catch (err) {
      console.log(err);
      res.status(401);
      throw new Error('Not authorized');
    }
  } else {
    res.status(401);
    throw new Error('Unauthorized: Token required');
  }
});

// const admin = asyncHandler(async (req, res, next) => {
//   let token;

//   if (
//     req.headers.authorization &&
//     req.headers.authorization.startsWith('Bearer')
//   ) {
//     try {
//       // get token from header
//       token = req.headers.authorization.split(' ')[1];

//       // verify token
//       const decoded = jwt.verify(token, process.env.JWT_SECRET);

//       // get user from token
//       req.user = await User.findById(decoded.id).select('-password');

//       if (req.user.role !== 'admin') {
//         res.status(400);
//         throw new Error('You are not authorized');
//       }

//       next();
//     } catch (err) {
//       console.log(err);
//       res.status(401);
//       throw new Error('Not authorized');
//     }
//   }
// });

export { protect };
