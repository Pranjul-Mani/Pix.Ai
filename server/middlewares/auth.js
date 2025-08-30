
import jwt from 'jsonwebtoken';

const userAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    // console.log('Incoming Authorization Header:', authHeader);

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      console.log('Missing or invalid Authorization header');
      return res.status(401).json({ success: false, message: 'Not Authorized. Login Again' });
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // console.log('Decoded JWT:', decoded);

    if (!decoded?.id) {
      return res.status(401).json({ success: false, message: 'Invalid token' });
    }

    req.user = { id: decoded.id };
    next();
  } catch (error) {
    console.error('JWT verification failed:', error.message);
    return res.status(401).json({ success: false, message: 'Not Authorized. Login Again' });
  }
};

export default userAuth;
