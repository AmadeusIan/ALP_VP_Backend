
import jwt from 'jsonwebtoken';
import { Response, NextFunction } from 'express';
import { UserRequest } from '../models/user-request-model';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

// Standalone function to verify token and return payload
const verifyTokenPayload = (token: string): { id: number; email: string; username: string } | null => {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as any;
    return {
      id: decoded.id,
      email: decoded.email,
      username: decoded.username
    };
  } catch (error) {
    return null;
  }
};

// Express middleware version
export const verifyToken = (req: UserRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Access token required' });
  }

  const token = authHeader.substring(7);
  const payload = verifyTokenPayload(token);

  if (!payload) {
    return res.status(403).json({ message: 'Invalid or expired token' });
  }

  req.user = payload;
  next();
};

// Export the standalone function for use in auth middleware
export { verifyTokenPayload };

export const generateToken = (payload: { id: number; email: string; username: string }) => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '24h' });
};
